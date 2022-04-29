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
            <v-simple-table>
              <tbody>
                <tr v-for="order in orders" :key="order.id">
                  <td>See Order detail</td>
                  <td v-if="order.userId === `${authUser.uid}`">
                    {{ order.amount }}
                  </td>
                  <td v-if="order.userId === `${authUser.uid}`">
                    <nuxt-link
                      :to="{ name: 'orders-id', params: { id: order.id } }"
                    >
                      {{ order.status }}
                    </nuxt-link>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            {{ orders }}
            <v-spacer></v-spacer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../plugins/firebase-client';
import { getOrder, getOrders } from '../utils/utils';

export default {
  name: 'OrdersPage',

  middleware: 'auth',

  async asyncData({ app, store, error }) {
    const uid = store.state.authUser.uid;
    const db = ref(database, '/orders');
    const qs = query(db, orderByChild('/userId') && equalTo(uid));
    let orders;
    try {
      const ordersSnap = [];
      const snap = await get(qs);
      snap.forEach((chilSnap) => {
        const order = getOrder(
          chilSnap.key,
          chilSnap.val().type,
          chilSnap.val().title,
          chilSnap.val().amount,
          chilSnap.val().price,
          chilSnap.val().total,
          chilSnap.val().status,
          chilSnap.val().date,
          chilSnap.val().userId
        );
        ordersSnap.push(order);
      });
      orders = getOrders(ordersSnap);
    } catch (e) {
      console.error(e);
      alert(e);
    }
    return {
      orders
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
