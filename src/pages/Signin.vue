<template>
  <main class="bg-white dark:bg-gray-900">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                      <stop stop-color="#B7ACFF" stop-opacity="0" offset="0%" />
                      <stop stop-color="#B7ACFF" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                      <stop stop-color="#7BC8FF" stop-opacity="0" offset="0%" />
                      <stop stop-color="#7BC8FF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#8470FF" width="32" height="32" rx="16" />
                  <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#755FF8" />
                  <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                  <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                </svg>
              </router-link>
            </div>
          </div>

          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 v-if="signinMode === 'form'" class="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Welcome back!</h1>

            <!-- Form -->
            <form v-if="signinMode === 'form'" @submit.prevent="onSubmit">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Email Address</label>
                  <input id="email" v-model="email" @input="errorMessage = ''" class="form-input w-full" type="email" required :class="{ 'border-red-500': errorMessage }" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    @input="errorMessage = ''"
                    class="form-input w-full"
                    type="password"
                    autocomplete="on"
                    required
                    :class="{ 'border-red-500': errorMessage }"
                  />
                </div>
              </div>

              <p v-if="errorMessage" class="text-red-600 text-sm mt-2">{{ errorMessage }}</p>

              <div class="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap ml-3 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>

            <!-- TOTP Setup -->
            <div v-if="signinMode === 'mfaEnrollRequired'" class="space-y-4">
              <div class="flex justify-center">
                <img :src="qrUrl" alt="2FA QR" class="w-56 h-56 border rounded" />
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Scan the QR code with your authenticator app (e.g., Google Authenticator) and enter the 6-digit code below</p>

              <form @submit.prevent="verifyCode" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="totp">Authentication code</label>
                  <input
                    id="totp"
                    v-model="code"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="6"
                    placeholder="______"
                    class="form-input w-full tracking-widest text-center"
                    required
                  />
                </div>

                <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>

                <div class="flex items-center justify-end">
                  <button
                    type="submit"
                    :disabled="verifying"
                    class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap ml-3 cursor-pointer disabled:opacity-60"
                  >
                    {{ verifying ? 'Verifying…' : 'Confirm' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- mfa -->

            <div v-if="signinMode === 'mfaRequired'" class="space-y-4">
              <form @submit.prevent="verifyCode" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="totp">Authentication code</label>
                  <input
                    id="totp"
                    v-model="code"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="6"
                    placeholder="______"
                    class="form-input w-full tracking-widest text-center"
                    required
                  />
                </div>

                <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>

                <div class="flex items-center justify-end">
                  <button
                    type="submit"
                    :disabled="verifying"
                    class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap ml-3 cursor-pointer disabled:opacity-60"
                  >
                    {{ verifying ? 'Verifying…' : 'Confirm' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="text-sm">
                Don’t you have an account? <router-link class="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-200" to="/signup">Sign Up</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="../images/auth-image.jpg" width="760" height="1024" alt="Authentication" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { initAuth } from '../lib/auth-state';
import { http, setAccessToken } from '../lib/http';

defineOptions({ name: 'Signin' });

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const qrUrl = ref('');
const code = ref('');
const verifying = ref(false);
const signinMode = ref('form'); // form, mfaEnrollRequired, mfaRequired

onMounted(async () => {
  try {
    const user = await http.get('/me');

    if (!user.id || !user.email) {
      throw new Error('401 unauthorized');
    }

    if (user.admin) {
      router.push({ name: 'users', state: { user } });
    } else {
      router.push({ name: 'listings', state: { user } });
    }
  } catch (e) {}
});

async function onSubmit() {
  errorMessage.value = '';

  try {
    const signinRes: any = await http.post('/signin', { email: email.value, password: password.value });

    if (signinRes.user && signinRes.accessToken) {
      setAccessToken(signinRes.accessToken);
      await initAuth(true);

      router.push(route.query.redirect || (signinRes.user?.admin ? { name: 'users' } : { name: 'listings' }));
      return;
    }

    if (signinRes.mfaEnrollRequired) {
      signinMode.value = 'mfaEnrollRequired';
      const { preauthToken } = signinRes;

      setAccessToken(preauthToken);

      const twoFARes = await http.post('2fa/setup', {});
      const { qrDataUrl } = twoFARes;

      qrUrl.value = qrDataUrl;

      return;
    }

    if (signinRes.mfaRequired) {
      const { preauthToken } = signinRes;

      signinMode.value = 'mfaRequired';

      setAccessToken(preauthToken);
    }
  } catch (err) {
    errorMessage.value = err.message;
  }
}

async function verifyCode() {
  try {
    const verifyRes: any = await http.post('/2fa/verify', { code: code.value });

    if (verifyRes.user && verifyRes.accessToken) {
      setAccessToken(verifyRes.accessToken);
      await initAuth(true);

      router.push(route.query.redirect || (verifyRes.user?.admin ? { name: 'users' } : { name: 'listings' }));
      return;
    }
  } catch (err) {
    errorMessage.value = err.message;
  }
}
</script>
