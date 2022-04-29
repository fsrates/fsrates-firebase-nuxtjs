import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  child,
  onValue
} from '@firebase/database';
import { auth, database } from '../plugins/firebase-client';
import { getOrder, getOrders } from '../utils/utils';

export const state = () => ({
  authUser: null,
  orders: []
});

export const mutations = {
  SET_AUTH_USER(state, { authUser, idToken }) {
    const { uid, email, displayName, emailVerified, photoURL } = authUser;
    state.authUser = {
      uid,
      email,
      displayName,
      emailVerified,
      photoURL,
      idToken
    };
  },
  SET_ORDERS(state, { orders }) {
    state.orders = orders;
  },
  RESET_STORE(state) {
    Object.assign(state, this.state);
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    if (!ctx.res && !ctx.res.locals && !ctx.res.locals.user) {
      return;
    }
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      await dispatch('onAuthStateChanged');
    }
    if (auth && auth.currentUser) {
      await dispatch('onOrders');
      await dispatch('onUsersListener');
    }
  },
  onAuthStateChanged({ commit }) {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        commit('RESET_STORE');
        return false;
      }
      if (user) {
        const idToken = await user.getIdToken(true);
        const { uid, email, displayName, emailVerified, photoURL } = user;
        commit('SET_AUTH_USER', {
          authUser: { uid, email, displayName, emailVerified, photoURL },
          idToken
        });
      }
    });
  },
  async onOrders({ commit, state }) {
    if (state.authUser.uid === null || state.authUser.uid === undefined) {
      commit('SET_ORDERS');
      return;
    }
    const uid = auth.currentUser.uid;
    const db = ref(database, '/orders');
    const queryRef = query(db, orderByChild('userId') && equalTo(uid));
    try {
      const ordersSnap = [];
      const snaps = await get(queryRef);
      snaps.forEach((snap) => {
        const order = getOrder(
          snap.key,
          snap.val().type,
          snap.val().title,
          snap.val().amount,
          snap.val().price,
          snap.val().total,
          snap.val().status,
          snap.val().date,
          snap.val().userId
        );
        ordersSnap.push(order);
      });
      const orders = getOrders(ordersSnap);
      commit('SET_ORDERS', { orders });
      return orders;
    } catch (e) {
      console.log(e);
      commit('SET_ORDERS');
    }
  },
  onUsersListener({ commit }) {
    if (!auth.currentUser) {
      return;
    }
    const uid = auth.currentUser.uid;
    const db = ref(database);
    const usersRef = child(db, '/users/' + uid);
    return new Promise((resolve) => {
      onValue(usersRef, (userSnap) => {
        if (userSnap.exists()) {
          commit('SET_USER', { id: uid, user: userSnap.val() });
          resolve(userSnap.val());
        }
        if (!userSnap) {
          resolve();
        }
      });
    });
  }
};

export const getters = {
  isLoggedIn(state) {
    try {
      return state.authUser !== null && state.authUser !== undefined;
    } catch {
      return false;
    }
  },
  allOrders(state) {
    return state.orders;
  }
};
