<template>
  <v-simple-table>
    <tr>
      <th v-for="(header, i) in headers" :key="i" :class="header.class">
        {{ header.text }}
      </th>
    </tr>
    <tr v-for="(order, id) in orders" :key="id">
      <td class="text-center medium">
        {{ order.type }}
      </td>
      <td class="text-center medium">
        {{ order.title }}
      </td>
      <td class="text-end medium">$ {{ decimal(order.amount) }}</td>
      <td class="text-end medium">฿ {{ decimal(order.price) }}</td>
      <td class="text-end medium">฿ {{ decimal(order.total) }}</td>
      <td class="text-center medium">
        {{ order.status }}
      </td>
      <td class="text-end medium">
        {{ dateFormat(order.date) }}
      </td>
      <td class="text-center medium">
        <router-link :to="{ name: 'orders-id', params: { id: id } }">
          see detail
        </router-link>
      </td>
    </tr>
  </v-simple-table>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'Type', class: 'text-center medium' },
        { text: 'Title', class: 'text-center medium' },
        { text: 'Amount', class: 'text-center medium' },
        { text: 'Price', class: 'text-center medium' },
        { text: 'Total', class: 'text-center medium' },
        { text: 'Status', class: 'text-center medium' },
        { text: 'Date', class: 'text-center medium' },
        { text: '', class: 'text-center medium' }
      ]
    };
  },

  methods: {
    decimal(v) {
      return Number.parseFloat(v).toFixed(2);
    },
    dateFormat(v) {
      return dayjs(v).format('DD/MM/YYYY HH:mm');
    }
  }
};
</script>
