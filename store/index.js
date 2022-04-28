import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  onValue
} from '@firebase/database';
import { auth, database } from '../plugins/firebase-client';

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
      commit('RESET_STORE', null);
      return;
    }
    const uid = auth.currentUser.uid;
  }
};
