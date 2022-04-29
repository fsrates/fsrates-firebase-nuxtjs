<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-flex py-8 px-6>
        <v-card>
          <v-card-title> Login </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle> Login with email </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-spacer></v-spacer>
            <p>
              <v-text-field
                v-model="email"
                label="Email"
                autocomplete
                clearable
              ></v-text-field>
            </p>
            <p>
              <v-text-field
                v-model="password"
                label="Password"
                autocomplete
                clearable
              ></v-text-field>
            </p>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click.prevent="emailSignIn()">
              Submit
            </v-btn>
            <v-btn color="warning" @click="resetData()"> Reset </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../plugins/firebase-client';

export default {
  data() {
    return {
      email: '',
      password: '',
      authUser: {}
    };
  },

  mounted() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken(true);
        const { uid, email, displayName, emailVerified, photoURL } = user;
        this.$store.commit('SET_AUTH_USER', {
          authUser: { uid, email, displayName, emailVerified, photoURL },
          idToken
        });
      }
    });
  },

  methods: {
    async emailSignIn() {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const authData = response.user;
        this.authUser = authData;
        this.resetData();
        alert('You are signed in, User ID:' + authData.uid);
        this.$router.push('/orders');
      } catch (e) {
        console.log(e);
        alert(e);
      }
    },
    resetData() {
      this.email = '';
      this.password = '';
    },
    getUser() {
      if (!auth.currentUser) {
        this.authUser = Object.assign({}, {});
        return;
      }
      const {
        uid,
        email,
        displayName,
        emailVerified,
        photoURL
      } = auth.currentUser;
      this.authUser = Object.assign(
        {},
        { uid, email, displayName, emailVerified, photoURL }
      );
    }
  }
};
</script>
