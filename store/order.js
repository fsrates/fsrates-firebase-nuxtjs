export default {
  state: () => ({
    neworder: null
  }),

  mutations: {
    addNewOrder(state, { order }) {},

    setPrice(state, order) {
      state.neworder.price.push(order.price);
    }
  },

  actions: {
    findPrice({ commit }, { order }) {
      let price = 0;
      if (order.type === "Sell" && order.title === "paypals") {
        if (order.amount >= 100 && order.amount <= 500) {
          price = 27.0;
        } else if (order.amount >= 501 && order.amount <= 1000) {
          price = 27.25;
        }
      } else if (order.type === "Sell" && order.title === "paypals") {
      }
      return (order.price = price);
    }
  },

  getters: {
    neworder(state) {
      return state.neworder;
    }
  }
};
