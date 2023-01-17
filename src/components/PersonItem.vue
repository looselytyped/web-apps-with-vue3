<script setup>
import { computed } from "vue";

const props = defineProps({
  friend: {
    type: Object,
    required: true,
  },
  last: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["friend-liked"]);
const like = () => emit("friend-liked", props.friend);
const fullName = computed(() => {
  return `${props.friend.firstName} ${props.friend.lastName}`;
});
</script>

<template>
  <v-list-item>
    <v-list-item-title class="d-flex justify-start">
      {{ fullName }}
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

    <v-divider v-if="!last"></v-divider>
  </v-list-item>
</template>
