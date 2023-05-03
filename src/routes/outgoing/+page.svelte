<script lang="ts">
  import ShippingCompanySelector from '$lib/shippingCompanySelector/ShippingCompanySelector.svelte'

  let db_example = [
    {
      order: '123456',
      customer: 'Company A',
      product: 'Product name 1',
      pallets: 1,
      carrier: 'AAA',
      shipped: false,
      finished: true,
    },
    {
      order: '789012',
      customer: 'Company B',
      product: 'Product name 2',
      pallets: 2,
      carrier: 'AAA',
      shipped: true,
      finished: true,
    },
    {
      order: '345678',
      customer: 'Company C',
      product: 'Product name 3',
      pallets: 3,
      carrier: 'AAA',
      shipped: false,
      finished: true,
    },
    {
      order: '901234',
      customer: 'Company D',
      product: 'Product name 4',
      pallets: '',
      carrier: 'ABF',
      shipped: false,
      finished: false,
    }
  ]

  // Define a function to toggle the shipped status
  function toggleShipped(index) {
    db_example[index].shipped = !db_example[index].shipped
  }
</script>

<div>
  <h1>Outgoing order log</h1>

<!-- Create a table element with daisyUI classes -->
<table class="table w-full">
  <!-- Create a table header with the object keys -->
  <thead>
    <tr>
      <th>Order</th>
      <th>Customer</th>
      <th>Product</th>
      <th>pallets</th>
      <th>Carrier</th>
      <th>Shipped</th>
    </tr>
  </thead>
  <!-- Create a table body with the object values -->
  <tbody>
    {#each db_example as item, index}
      <tr>
        <!-- Create a table cell element for each value -->
        {#if item.finished}
          <td><a class="link link-primary no-underline" href="/takePhotos/{item.order}">{item.order}</a></td>
        {:else}
          <td>{item.order}</td>
        {/if}
        <td>{item.customer}</td>
        <td>{item.product}</td>
        <td>{item.pallets}</td>
        <!-- Create a custom component element for the carrier value -->
        <td> 
          <ShippingCompanySelector zIndex={index + 1}/> 
        </td>
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
</div>
