<script lang="ts">
  export let zIndex = 0
  
  import { shippingCompanies } from '$lib/shippingCompanySelector/companies'

  import IoIosArrowDown from 'svelte-icons/io/IoIosArrowDown.svelte'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@rgossiaux/svelte-headlessui'

  let selectedCompany = shippingCompanies[0]
  const listBoxButtonClass =
    'relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
  const listBoxOptionsClass =
    'absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
  const listBoxOptionClass =
    'cursor-default select-none relative py-2 pl-4 pr-5 text-amber-900 hover:bg-amber-100'
  const listBoxArrowIconClass =
    'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'
</script>

<Listbox class="w-60" value={selectedCompany} style="z-index: {zIndex};" on:change={(e) => (selectedCompany = e.detail)}>
  <ListboxButton class={listBoxButtonClass}
    ><div class="flex gap-2 items-center">
      <div class="w-16 flex justify-center">
        <img
          class="h-5 w-auto object-cover object-left"
          src={selectedCompany.image} alt={selectedCompany.company}
        />
      </div>
      <span class="truncate flex-1">{selectedCompany.company} </span>
      <span class="border-black flex flex-0 h-5 w-5"><IoIosArrowDown /></span>
    </div>
  </ListboxButton>
  <ListboxOptions class={listBoxOptionsClass} style="z-index: {zIndex};">
    {#each shippingCompanies as shippingCompany (shippingCompany.id)}
      <ListboxOption class={listBoxOptionClass} value={shippingCompany} style="z-index: {zIndex};">
        <div class="flex gap-2">
          <div class="flex items-end">
            <div class="w-16 flex justify-center">
              <img
                class="h-5 w-auto object-cover object-left"
                src={shippingCompany.image}
                alt={shippingCompany.company}
              />
            </div>
          </div>
          <span class="truncate flex-1 place-self-start">{shippingCompany.company} </span>
        </div>
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
