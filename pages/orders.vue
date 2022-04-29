<template>
  <v-row justify="center" pt-8>
    <v-col cols="12" lg="10">
      <v-card>
        <v-card-title> Order </v-card-title>
        <v-card-subtitle> Order page </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-spacer></v-spacer>
          <OrdersList :orders="orders || []" />
          <v-spacer></v-spacer>
        </v-card-text>
      </v-card>
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
      response,
      orders: response.val()
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
