<script lang="ts">
  import ShippingCompanySelector from '$lib/shippingCompanySelector/ShippingCompanySelector.svelte'

  let db_example = [
    {
      order: 'SO1234',
      customer: 'Company A',
      location: 'Rialto, CA',
      pallets: 1,
      carrier: 'AAA',
      shipped: false,
      weight: 400,
      finished: true,
    },
    {
      order: 'SO7890',
      customer: 'Company A',
      location: 'Visalia, CA',
      pallets: 2,
      carrier: 'AAA',
      shipped: true,
      weight: 400,
      finished: true,
    },
    {
      order: 'SO3456',
      customer: 'Company B',
      location: 'Grand Prarie, TX',
      pallets: 3,
      carrier: 'FEDEX FREIGHT',
      shipped: false,
      weight: 400,
      finished: true,
    },
    {
      order: 'SO9012',
      customer: 'Company C',
      location: 'Austin, TX',
      pallets: '',
      carrier: 'ABF',
      shipped: false,
      weight: 400,
      finished: false,
    },
  ]

  // Define a function to toggle the shipped status
  function toggleShipped(index) {
    db_example[index].shipped = !db_example[index].shipped
  }
</script>

<div>
  <div class="prose mb-3">
    <h1>Outgoing Orders</h1>
  </div>

  <!-- Create a table element with daisyUI classes -->
  <table class="table w-full">
    <!-- Create a table header with the object keys -->
    <thead>
      <tr>
        <th>Order</th>
        <th>Customer</th>
        <th>Location</th>
        <th>Carrier</th>
        <th>Pallets</th>
        <th>Picked Up?</th>
      </tr>
    </thead>
    <!-- Create a table body with the object values -->
    <tbody>
      {#each db_example as item, index}
        <tr>
          <!-- Create a table cell element for each value -->
          {#if item.finished}
            <td
              ><a class="link link-primary no-underline" href="/takePhotos/{item.order}"
                >{item.order}</a
              ></td
            >
          {:else}
            <td>{item.order}</td>
          {/if}
          <td>{item.customer}</td>
          <td>{item.location}</td>
          <!-- Create a custom component element for the carrier value -->
          <td>
            <ShippingCompanySelector zIndex={index + 1} />
          </td>
          <!-- Number of pallets -->
          <td>{item.pallets}</td>
          <!-- Create a checkbox element for the shipped value -->
          <td>
            <input
              type="checkbox"
              class="checkbox checkbox-accent"
              checked={item.shipped}
              on:click={() => toggleShipped(index)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="prose">
    <!-- <p>TOTAL FEDEX LTL WEIGHT: {total_weight_fedex_freight} LBS = {fedex_calculated_time} MINUTES “FREE TIME”</p> -->
  </div>
</div>
