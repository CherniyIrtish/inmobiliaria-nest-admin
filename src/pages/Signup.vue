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
                <svg class="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                  <path
                    d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 class="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Create your Account</h1>
            <!-- Form -->
            <form @submit.prevent="onSubmit">
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
                  Sign Up
                </button>
              </div>
            </form>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
              <div class="text-sm">
                Have an account? <router-link class="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-300" to="/signin">Sign In</router-link>
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

<script>
import { http } from '../lib/http';

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  async mounted() {
    try {
      await http.get('/me');
      this.$router.push('/');
    } catch (e) {}
  },
  methods: {
    async onSubmit() {
      this.errorMessage = '';

      try {
        const res = await http.post('/signup', {
          email: this.email,
          password: this.password,
        });

        this.$router.push('/signin');
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
  },
};
</script>
