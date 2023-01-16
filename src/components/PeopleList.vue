<template>
  <v-container fluid>
    <v-row no-gutters class="flex-nowrap">
      <v-card class="d-flex justify-start mx-4" style="width: 100%">
        <v-list header style="width: 100%">
          <v-list-item v-for="(friend, index) of friends" :key="friend.id">
            <v-list-item-title class="d-flex justify-start">
              {{ friend.firstName }}
              {{ friend.lastName }}
              <v-spacer />

              <div class="d-flex justify-end">
                <v-btn density="comfortable" variant="plain" icon>
                  <v-icon class="edit"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  density="comfortable"
                  variant="plain"
                  icon
                  @click.stop="like(friend)"
                >
                  <v-icon class="fav" :color="friend.fav ? 'red' : 'grey'">
                    mdi-heart
                  </v-icon>
                </v-btn>
              </div>
            </v-list-item-title>

            <!-- eslint-disable-next-line vue/valid-v-for -->
            <v-divider v-if="index !== friends.length - 1"></v-divider>
          </v-list-item>
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
