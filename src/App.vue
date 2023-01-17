<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <div class="pa-3 text-center bg-teal text-white">
        <div class="text-h4 pa-4">Friends HQ</div>
        <p>Together, we are stronger</p>
      </div>

      <v-spacer></v-spacer>

      <v-list density="compact">
        <template v-for="(item, i) of items" :key="i">
          <v-divider dark v-if="item.divider" class="my-3"></v-divider>
          <v-list-item v-else :value="item" :to="{ name: item.routeName }">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right :color="headerFooterColor" class="text-white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app :color="headerFooterColor" class="text-white" :inset="true">
      <span>Looselytyped &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const headerFooterColor = "light-green lighten-2";
const items = [
  { icon: "mdi-view-dashboard", text: "Dashboard", routeName: "dashboard" },
  { icon: "mdi-contacts", text: "Contacts", routeName: "people" },
  { divider: true },
  { icon: "mdi-clock", text: "Stay tuned!" },
];

let drawer = ref(null);
</script>
