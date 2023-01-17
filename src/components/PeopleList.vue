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

import PersonItem from "@/components/PersonItem.vue";

const friendsMockData = [
  {
    id: 1,
    firstName: "Michelle",
    lastName: "Mulroy",
    gender: "female",
    fav: true,
  },
  {
    id: 2,
    firstName: "Venkat",
    lastName: "Subramanian",
    gender: "male",
    fav: true,
  },
  {
    id: 3,
    firstName: "Matt",
    lastName: "Forsythe",
    gender: "none",
    fav: false,
  },
  {
    id: 4,
    firstName: "Nate",
    lastName: "Schutta",
    gender: "male",
    fav: false,
  },
];

const friends = ref(friendsMockData);

const like = (f) => {
  f.fav = !f.fav;
};
</script>

<style scoped></style>
