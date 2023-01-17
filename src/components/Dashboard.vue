<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";

import axios from "axios";

const friends = ref([]);
const favCount = computed(() => friends.value.filter((f) => f.fav).length);

onMounted(async () => {
  const resp = await axios.get("http://localhost:3000/friends");
  friends.value = resp.data;
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
              <v-col class="text-h2">{{ friends.length }}</v-col>

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
              <v-col class="text-h2">{{ favCount }}</v-col>

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
