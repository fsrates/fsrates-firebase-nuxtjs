<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-flex>
        <v-card>
          <v-card-title> Order </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle> Order page </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-spacer></v-spacer>
            <OrdersList :orders="orders || []" />
            <v-spacer></v-spacer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import OrdersList from '../components/OrdersList.vue';

export default {
  name: 'OrdersPage',

  components: {
    OrdersList
  },

  middleware: 'auth',

  async asyncData({ $axios, store, error }) {
    const uid = store.state.authUser.uid;
    const token = store.state.authUser.idToken;
    const config = {
      method: 'GET',
      url: `https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?orderBy="userId"&equalTo="${uid}"`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    let response;
    try {
      response = await $axios.$get(config);
    } catch (e) {
      console.error(e);
      alert(e);
    }
    return {
      orders: response.data
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
