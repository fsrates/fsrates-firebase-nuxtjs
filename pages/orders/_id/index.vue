<template>
  <v-row justify="center" pt-8>
    <v-col cols="12" lg="10">
      <v-card>
        <v-card-title> Order Detail </v-card-title>
        <v-card-subtitle> Order Detal </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-spacer></v-spacer>
          <v-simple-table>
            <tr>
              <th class="text-end">วันที่:</th>
              <td class="text-start">
                {{ dateFormat(order.date) }}
              </td>
            </tr>
            <tr>
              <th class="text-end">รายละเอียด:</th>
              <td class="text-start">
                {{ toThai(order.type) }} - {{ converTitle(order.title) }}
              </td>
            </tr>
            <tr>
              <th class="text-end">จำนวน (ดอลลาร์):</th>
              <td class="text-start">$ {{ decimal(order.amount) }}</td>
            </tr>
            <tr>
              <th class="text-end">ราคาต่อหน่วย (บาท):</th>
              <td class="text-start">
                {{ decimal(order.price) }}
              </td>
            </tr>
            <tr>
              <th class="text-end">ยอดสุทธิ (บาท):</th>
              <td class="text-start">
                {{ decimal(order.total) }}
              </td>
            </tr>
            <tr>
              <th class="text-end">สถานะ:</th>
              <td class="text-start">
                {{ convertStatus(order.status) }}
              </td>
            </tr>
          </v-simple-table>
          <v-spacer></v-spacer>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'OrdersIdPage',

  filters: {
    dateFormat(val) {
      return dayjs(val).format('DD/MM/YYYY HH:mm');
    },
    decimal(val) {
      return Number.parseFloat(val).toFixed(2);
    },
    toThai(v) {
      const str = String(v);
      if (str === 'sell') {
        return 'รายการแจ้งขาย';
      } else if (str === 'buy') {
        return 'รายการแจ้งซื้อ';
      }
    },
    convertStatus(v) {
      const str = String(v);
      if (str === 'Pending') {
        return 'รับคำสั่งแล้ว';
      } else if (str === 'Processing') {
        return 'กำลังกำเนินการ';
      } else if (str === 'Success') {
        return 'เรียบร้อยแล้ว';
      } else if (str === 'Request') {
        return 'รอตรวจสอบ';
      } else if (str === 'Canceled') {
        return 'ยกเลิกแล้ว';
      } else if (str === 'Returned') {
        return 'ตีกลับแล้ว';
      }
    },
    converTitle(v) {
      const str = String(v);
      if (str === 'paypals') {
        return 'PAYPAL';
      } else if (str === 'webmonies') {
        return 'WEB MONEY';
      } else if (str === 'perfectmonies') {
        return 'PERFECT MONEY';
      } else if (str === 'netellers') {
        return 'NETELLER';
      } else if (str === 'skrills') {
        return 'SKRILL';
      }
    }
  },

  middleware: 'auth',

  async asyncData({ app, params, error }) {
    const db = app.$fire.database.ref('orders').child(params.id);
    let snap;
    try {
      snap = await db.get();
    } catch (e) {
      console.error(e);
    }
    return {
      order: snap.val()
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
