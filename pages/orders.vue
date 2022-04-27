<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-spacer></v-spacer>
      <v-card>
        <v-card-title> Orders History </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle> Order's records. </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-spacer></v-spacer>
          <v-data-table
            :headers="headers"
            :items="orders"
            item-per-page="5"
          ></v-data-table>
          <v-spacer></v-spacer>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createOrder()"> Submit </v-btn>
          <v-btn color="warning" @click="resetData()"> Reset </v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer></v-spacer>
    </v-col>
  </v-row>
</template>

<script>
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { auth, database } from "../plugins/firebase-client";
export default {
  name: "NeworderPage",

  filters: {
    decimal(val) {
      return Number.parseFloat(val).toFixed(2);
    },
  },

  async asyncData({ app, error }) {
    if (!auth.currentUser) {
      return;
    }
    const uid = auth.currentUser.uid;
    const db = ref(database, "/orders");
    const queryRef = query(db, orderByChild("userId") && equalTo(uid));
    const orders = [];
    try {
      const snap = await get(queryRef);
      for (let i in snap) {
        const id = snap[i].key;
        const {
          type,
          title,
          amount,
          price,
          total,
          status,
          date,
          userId,
        } = snap[i].val;
        const order = Object.assign(
          {},
          {
            id,
            type,
            title,
            amount,
            price,
            total,
            status,
            date,
            userId,
          }
        );
        orders.push(order);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      orders,
    };
  },

  data() {
    return {
      headers: [
        {
          text: "Date",
          value: "date",
        },
        { text: "Type", value: "type" },
        { text: "Title", value: "title" },
        { text: "Amount", value: "amount" },
        { text: "Price", value: "price" },
        { text: "Total", value: "total" },
        { text: "Status", value: "status" },
      ],
    };
  },

  computed: {},

  methods: {},
};
</script>
