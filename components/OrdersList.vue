<template>
  <v-simple-table>
    <tr v-for="order in orders" :key="order">
      <td>
        {{ order.type }}
      </td>
      <td>
        {{ order.title }}
      </td>
      <td>
        {{ order.amount }}
      </td>
      <td>
        {{ order.price }}
      </td>
      <td>
        {{ order.total }}
      </td>
      <td>
        {{ order.status }}
      </td>
      <td>
        {{ order.date }}
      </td>
      <td>
        {{ order.userId }}
      </td>
    </tr>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  }
};
</script>
