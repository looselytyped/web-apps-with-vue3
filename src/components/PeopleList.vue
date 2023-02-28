<template>
  <v-container fluid>
    <v-row no-gutters class="flex-nowrap">
      <v-card class="d-flex justify-start mx-4" style="width: 100%">
        <v-list header style="width: 100%">
          <PersonItem
            v-for="(friend, index) of store.friends"
            :key="friend.id"
            :friend="friend"
            :last="index === store.friends.length - 1"
            @friend-liked="like($event)"
            @friend-edited="edit"
          />
        </v-list>
      </v-card>
      <div class="d-flex justify-end mb-6">
        <v-btn color="success" dark large :to="{ name: 'addEditPerson' }">
          Add Friend
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useFriendStore } from "../stores/friends";

import PersonItem from "@/components/PersonItem.vue";

const store = useFriendStore();
const router = useRouter();

const edit = (friend) => {
  router.push({
    name: "editFriend",
    params: { friendId: friend.id },
  });
};

const like = async (f) => {
  f.fav ? await store.unlike(f) : await store.like(f);
};

onMounted(async () => {
  await store.fetchFriends();
});
</script>

<style scoped></style>
