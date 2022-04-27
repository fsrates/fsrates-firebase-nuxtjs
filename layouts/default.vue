<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main light class="light">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      Copyright
      <span
        >&copy; {{ new Date().getFullYear() }} FS Exchanger Allrights
        Reserved.</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "order",
          to: "/neworder",
        },
        {
          icon: "mdi-account-plus",
          title: "Register",
          to: "/register",
        },
        {
          icon: "mdi-account-arrow-right",
          title: "Login",
          to: "/login",
        },
        {
          icon: 'mdi-plus',
          title: `Order's history`,
          to: '/orders'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "FS Exchanger",
    };
  },

  head() {
    return {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href:
            "https://code.getmdl.io/1.1.3/material.blue_grey-orange.min.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Lobster&effect=shadow-multiple",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto",
        },
      ],
      script: [{ src: "https://code.getmdl.io/1.1.3/material.min.js" }],
    };
  },
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto";
@import "https://fonts.googleapis.com/css?family=Lobster&effect=shadow-multiple";
*,
html,
body {
  box-sizing: border-box;
  font-size: medium;
  font-family: "Roboto", sans-serif;
}

a {
  text-decoration: none;
}

.xxlarge {
  font-size: xx-large;
}

.xlarge {
  font-size: x-large;
}

.large {
  font-size: large;
}

.larger {
  font-size: larger;
}

.medium {
  font-size: medium;
}

.small {
  font-size: small;
}

.smaller {
  font-size: smaller;
}

.lobster {
  font-family: "Lobster", sans-serif;
  word-spacing: 1.5px;
  font-weight: border;
}

.light {
  background-color: ghostwhite;
  color: #555;
}

.bg-white {
  background-color: white;
}
</style>
