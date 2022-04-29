<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-flex>
        <v-card>
          <v-card-title> New Order </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle> Order form page </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-spacer></v-spacer>
            <p>
              <v-select
                v-model="order.type"
                label="Select Type"
                :hint="`${order.type.text}, ${order.type.value}`"
                :items="typeItems"
                item-text="text"
                item-value="value"
                persistent-hint
                return-object
                single-line
                @change="getPrice(), getTotal()"
              ></v-select>
            </p>
            <p>
              <v-select
                v-model="order.title"
                label="Select Type"
                :hint="`${order.title.text}, ${order.title.value}`"
                :items="titleItems"
                item-text="text"
                item-value="value"
                persistent-hint
                return-object
                single-line
                @change="getPrice(), getTotal()"
              ></v-select>
            </p>
            <p>
              <v-text-field
                v-model="order.amount"
                label="Amount"
                clearable
                @change="getPrice(), getTotal()"
              ></v-text-field>
            </p>
            <p>
              <v-text-field
                v-model="order.price"
                label="Price"
                autocomplete
              ></v-text-field>
            </p>
            <p>
              <v-text-field
                v-model="order.total"
                label="Total"
                autocomplete
              ></v-text-field>
            </p>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="createOrder()"> Submit </v-btn>
            <v-btn color="warning" @click="resetData()"> Reset </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { ref, push, update } from '@firebase/database';
import { auth, database } from '../plugins/firebase-client';
export default {
  name: 'NeworderPage',

  middleware: 'auth',

  data() {
    return {
      typeItems: [
        { text: 'Sell', value: 'sell' },
        { text: 'Buy', value: 'buy' }
      ],
      titleItems: [
        { text: 'Paypal', value: 'paypals' },
        { text: 'Web Money', value: 'webmonies' },
        { text: 'Perfect Money', value: 'perfectmonies' },
        { text: 'Neteller', value: 'netellers' },
        { text: 'Skrill', value: 'skrills' }
      ],
      order: {
        type: { text: 'Select type', value: '' },
        title: { text: 'Select Product', value: '' },
        amount: 0,
        price: 0,
        total: 0
      }
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  },

  methods: {
    getPrice() {
      const type = this.order.type;
      const title = this.order.title;
      const amount = this.order.amount;
      if (type.value === 'sell' && title.value === 'paypals') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 27.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 27.25);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 27.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 27.75);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 28.0);
        }
      } else if (type.value === 'sell' && title.value === 'webmonies') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 26.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 26.25);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 26.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 26.75);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 27.0);
        }
      } else if (type.value === 'sell' && title.value === 'perfectmonies') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 27.25);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 27.5);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 27.75);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 28.0);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 28.25);
        }
      } else if (type.value === 'sell' && title.value === 'netellers') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 27.75);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 28.0);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 28.25);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 28.5);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 28.75);
        }
      } else if (type.value === 'sell' && title.value === 'skrills') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 28.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 28.25);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 28.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 28.75);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 29.0);
        }
      } else if (type.value === 'buy' && title.value === 'paypals') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 35.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 34.75);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 34.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 34.25);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 34.0);
        }
      } else if (type.value === 'buy' && title.value === 'webmonies') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 34.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 33.75);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 33.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 33.25);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 33.0);
        }
      } else if (type.value === 'buy' && title.value === 'perfectmonies') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 35.25);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 35.0);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 34.75);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 34.5);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 34.25);
        }
      } else if (type.value === 'buy' && title.value === 'netellers') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 35.75);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 35.5);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 35.25);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 35.0);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 34.75);
        }
      } else if (type.value === 'buy' && title.value === 'skrills') {
        if (amount >= 100 && amount <= 500) {
          return (this.order.price = 36.0);
        } else if (amount >= 501 && amount <= 1000) {
          return (this.order.price = 35.75);
        } else if (amount >= 1001 && amount <= 1500) {
          return (this.order.price = 35.5);
        } else if (amount >= 1501 && amount <= 2000) {
          return (this.order.price = 35.25);
        } else if (amount >= 2001 && amount <= 10000) {
          return (this.order.price = 35.0);
        }
      }
    },
    getTotal() {
      return (this.order.total = this.order.amount * this.order.price);
    },
    async createOrder() {
      if (!auth.currentUser) {
        return;
      }
      // If authUser not null.
      const uid = auth.currentUser.uid;
      const db = ref(database);
      const ordersRef = ref(database, '/orders');
      try {
        const orderId = push(ordersRef).key;
        const order = {
          type: this.order.type.value,
          title: this.order.title.value,
          amount: this.order.amount,
          price: this.order.price,
          total: this.order.total,
          status: 'Pending',
          date: Date.now(),
          userId: uid
        };
        const updates = {};
        updates['/orders/' + orderId] = order;
        updates['/user-orders/' + uid + '/pending'] = { orderId };
        await update(db, updates);
        alert('Success to create new order id: ' + orderId);
        this.resetData();
        this.$router.push(`/orders/${orderId}`);
      } catch (e) {
        alert(e);
      }
    },
    resetData() {
      this.order.type = { text: 'Select type', value: '' };
      this.order.title = { text: 'Select Product', value: '' };
      this.order.amount = 0;
      this.order.price = 0;
      this.order.total = 0;
    }
  }
};
</script>
