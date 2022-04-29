<template #ordersPage>
  <v-row id="orders-page" justify="center">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-flex py-8 px-6>
        <v-card>
          <v-card-title> Order </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle> Order form page </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-spacer></v-spacer>
            <v-list>
              <v-list-item
                v-for="order in orders"
                :key="order.id"
                nuxt
                :to="{ name: 'orders-id', params: { id: order.id } }"
                router
                exact
              >
                <v-list-item-content>
                  <v-list-item-title> See Order detail </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ order.userId }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-text id="orders-id-page">
            <nuxt-child></nuxt-child>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../plugins/firebase-client';
import { getOrder } from '../../utils/utils';

export default {
  name: 'OrdersPage',

  data() {
    return {
      orders: [],
      order: {}
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  },

  methods: {
    async readOrder() {
      if (!auth.currentUser) {
        return;
      }
      const db = ref(database, '/orders');
      let snap;
      try {
        snap = await get(db);
      } catch (e) {
        alert(e);
      }
      const orders = [];
      for (let i in snap) {
        const order = getOrder(
          snap[i].key,
          snap[i].val().type,
          snap[i].val().title,
          snap[i].val().amount,
          snap[i].val().price,
          snap[i].val().total,
          snap[i].val().status,
          snap[i].val().date,
          snap[i].val().userId
        );
        orders.push(order);
      }
      return orders;
    }
  },

  created() {
    const v = this;
    v.orders = v.readOrder();
  }
};
</script>
