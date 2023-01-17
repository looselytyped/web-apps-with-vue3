<template>
  <v-container fluid>
    <v-row no-gutters class="flex-nowrap">
      <v-card class="d-flex justify-start mx-4" style="width: 100%">
        <v-list header style="width: 100%">
          <PersonItem
            v-for="(friend, index) of friends"
            :key="friend.id"
            :friend="friend"
            :last="index === friends.length - 1"
            @friend-liked="like($event)"
          />
        </v-list>
      </v-card>
      <div class="d-flex justify-end mb-6">
        <v-btn color="success" dark large>Add Friend</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import axios from "axios";

import PersonItem from "@/components/PersonItem.vue";

const friends = ref([]);

const like = async (f) => {
  f.fav = !f.fav;
  await axios.patch(`http://localhost:3000/friends/${f.id}`, {
    fav: f.fav,
  });
};

onMounted(async () => {
  const resp = await axios.get("http://localhost:3000/friends");
  friends.value = resp.data;
});
</script>

<style scoped></style>
