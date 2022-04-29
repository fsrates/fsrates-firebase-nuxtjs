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
import { getOrder } from '../../../utils/utils';

export default {
  name: 'OrdersIdPage',

  middleware: 'auth',

  async asyncData({ app, store, params, error }) {
    const uid = store.state.authUser.uid;
    const db = ref(database, `/orders/${params.id}`);
    const queryRef = query(db, [orderByChild('/userId') & equalTo(uid)]);
    let snap;
    try {
      snap = await get(queryRef);
    } catch (e) {
      console.error(e);
    }
    return {
      orders: snap.val()
    };
  }
};
</script>
