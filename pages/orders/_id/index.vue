<template>
  <div id="orders-id-page" v-if="isLoggedIn && authUser">
    This is Order Page
    <p v-if="order && order.userId === `${authUser.uid}`">
      {{ order }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { ref, get } from 'firebase/database';
import { database } from '../../../plugins/firebase-client';

export default {
  name: 'OrdersIdPage',

  middleware: 'auth',

  async asyncData({ app, params, error }) {
    const db = ref(database, `/orders/${params.id}`);
    let snap;
    try {
      snap = await get(db);
    } catch (e) {
      console.error(e);
    }
    return {
      orders: snap.val()
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
