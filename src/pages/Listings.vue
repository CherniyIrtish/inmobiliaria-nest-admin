<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" :currentUser="currentUser" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" :currentUser="currentUser" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="lg:relative lg:flex">
          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
            <div class="lg:mx-auto">
              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <Accordion title="Listing" :formToggle="formToggle" v-on:form-toggle-handle="formToggleHandle($event)">
                  <div>
                    <form>
                      <div class="space-y-4">
                        <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="card-title">Title</label>
                            <input id="card-title" class="form-input w-full" type="text" v-model="form.title" @input="() => (fieldErrors.title = '')" />
                            <p v-if="fieldErrors.title" class="text-xs text-red-500 mt-1">{{ fieldErrors.title }}</p>
                          </div>
                        </div>

                        <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="card-desc">Description</label>
                            <textarea id="card-desc" class="form-input w-full" type="text" rows="10" v-model="form.description" />
                          </div>
                        </div>

                        <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="card-area">Area</label>
                            <input id="card-area" class="form-input w-full" type="number" min="0" v-model.number="form.area" @input="() => (fieldErrors.area = '')" />
                            <p v-if="fieldErrors.area" class="text-xs text-red-500 mt-1">{{ fieldErrors.area }}</p>
                          </div>

                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="card-price">Price</label>
                            <input id="card-price" class="form-input w-full" type="number" min="0" v-model.number="form.price" @input="() => (fieldErrors.price = '')" />
                            <p v-if="fieldErrors.price" class="text-xs text-red-500 mt-1">{{ fieldErrors.price }}</p>
                          </div>

                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="card-bedrooms">Bedrooms<span class="text-red-500">*</span></label>
                            <select id="card-bedrooms" class="form-select w-full" v-model="form.bedrooms">
                              <option :value="1">1</option>
                              <option :value="2">2</option>
                              <option :value="3">3+</option>
                            </select>
                          </div>
                        </div>

                        <div class="text-right">
                          <button
                            type="button"
                            class="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 cursor-pointer ml-3 first:ml-0"
                            @click="closeForm()"
                          >
                            Close
                          </button>

                          <button
                            type="button"
                            class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white px-4 cursor-pointer ml-3 first:ml-0"
                            @click="listApartment()"
                          >
                            {{ form.id ? 'Save Changes' : 'List Apartment' }}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Accordion>
              </div>

              <div class="mb-6 lg:mb-0">
                <header class="mb-6">
                  <!-- Title -->
                  <h2 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">My Listings</h2>
                </header>

                <!-- Table -->
                <div v-if="listings.length" class="overflow-x-auto bg-white dark:bg-gray-800 shadow-xs rounded-xl">
                  <table class="table-fixed w-full dark:text-gray-300">
                    <thead
                      class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60"
                    >
                      <tr>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Title</div>
                        </th>

                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/2">
                          <div class="font-semibold text-left">Description</div>
                        </th>

                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-center">Bedrooms</div>
                        </th>

                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-center">Price</div>
                        </th>

                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-center">Approved</div>
                        </th>

                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-center">Actions</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                      <tr v-for="listing in listings" :key="listing.id">
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div>{{ listing.title }}</div>
                        </td>

                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/2">
                          <div class="block overflow-hidden text-ellipsis whitespace-nowrap" :title="listing.description">
                            {{ listing.description }}
                          </div>
                        </td>

                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-center">{{ listing.bedrooms }}</div>
                        </td>

                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-center">{{ listing.price }} $</div>
                        </td>

                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-center">{{ listing.approved }}</div>
                        </td>

                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px text-center">
                          <div class="space-x-1">
                            <button class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full cursor-pointer" @click="editListing(listing)">
                              <span class="sr-only">Edit</span>
                              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                <path
                                  d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z"
                                />
                              </svg>
                            </button>

                            <button class="text-red-500 hover:text-red-600 rounded-full cursor-pointer" @click="deleteListing(listing.id)">
                              <span class="sr-only">Delete</span>
                              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-if="!listings.length">No Listings Yet</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import Accordion from '../partials/Accordion.vue';
import { getCurrentUser } from '../lib/auth-state';
import { onMounted, reactive, ref } from 'vue';
import { http } from '../lib/http';

const sidebarOpen = ref(false);
const listings = ref([]);
const currentUser = getCurrentUser();
const form = reactive({ id: null, title: '', description: '', area: null, price: null, bedrooms: 1 });
const fieldErrors = reactive({ title: '', area: '', price: '' });
const formToggle = ref(false);

onMounted(async () => await getListings());

async function getListings() {
  try {
    listings.value = await http.get('/listings');
  } catch (err) {
    console.error(err);
  }
}

function resetForm() {
  form.id = null;
  form.title = '';
  form.description = '';
  form.area = null;
  form.price = null;
  form.bedrooms = 1;
}

async function listApartment() {
  if (!validate()) return;

  try {
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      area: Number(form.area),
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
    };

    if (!form.id) {
      await http.post('/listings', payload);
    } else {
      await http.patch(`/listings/${form.id}`, payload);
    }

    resetForm();
  } catch (e) {
    console.error(e);
  } finally {
    await getListings();
    formToggle.value = false;
  }
}

function editListing(listing: any) {
  formToggle.value = true;

  form.id = listing.id;
  form.title = listing.title;
  form.description = listing.description;
  form.area = listing.area;
  form.price = listing.price;
  form.bedrooms = listing.bedrooms;
}

async function deleteListing(id: number) {
  try {
    await http.delete(`/listings/${id}`);
  } catch (e) {
    console.error(e);
  } finally {
    await getListings();
  }
}

function validate() {
  fieldErrors.title = form.title.trim() ? '' : 'Title is required';
  fieldErrors.area = form.area != null && Number(form.area) >= 0 ? '' : 'Area must be 0 or more';
  fieldErrors.price = form.price != null && Number(form.price) >= 0 ? '' : 'Price must be 0 or more';

  return !Object.values(fieldErrors).some(Boolean);
}

function closeForm() {
  resetForm();
  formToggle.value = false;
}

function formToggleHandle(toggle: boolean) {
  if (toggle) resetForm();

  formToggle.value = !toggle;
}
</script>
