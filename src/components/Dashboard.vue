<script setup>
import { onMounted } from "vue";

import { useFriendStore } from "../stores/friends";

const store = useFriendStore();

onMounted(async () => {
  await store.fetchFriends();
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-card-item title="Contacts"></v-card-item>
          <v-card-text class="py-3">
            <v-row>
              <v-col class="text-h2">{{ store.friendsCount }}</v-col>

              <v-col class="text-right">
                <v-icon color="error" icon="mdi-contacts" size="60"></v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card>
          <v-card-item title="Favs"></v-card-item>
          <v-card-text class="py-3">
            <v-row>
              <v-col class="text-h2">{{ store.favFriendsCount }}</v-col>

              <v-col class="text-right">
                <v-icon color="error" icon="mdi-heart" size="60"></v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
