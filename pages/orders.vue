<template>
  <v-row justify="center" pt-8>
    <v-col cols="12" lg="10">
      <v-card>
        <v-card-title> Order </v-card-title>
        <v-card-subtitle> Order page </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-spacer></v-spacer>
          <v-simple-table>
            <tr>
              <th v-for="(header, i) in headers" :key="i" :class="header.class">
                {{ header.text }}
              </th>
            </tr>
            <tr v-for="order in orders" :key="order.id">
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
                <NuxtLink :to="{ name: 'orders-id', params: { id: order.id } }">
                  see detail
                </NuxtLink>
              </td>
            </tr>
          </v-simple-table>
          <v-spacer></v-spacer>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'OrdersPage',

  middleware: 'auth',

  async asyncData({ app, store, error }) {
    const uid = store.state.authUser.uid;
    const db = app.$fire.database
      .ref('orders')
      .orderByChild('userId')
      .equalTo(uid);
    let response;
    try {
      response = await db.get();
    } catch (e) {
      console.error(e);
      alert(e);
    }
    return {
      orders: {
        id: response.key,
        ...response.val()
      }
    };
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

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
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
