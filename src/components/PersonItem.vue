<script setup>
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

const like = () => (props.friend.fav = !props.friend.fav);
</script>

<template>
  <v-list-item>
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

    <v-divider v-if="!last"></v-divider>
  </v-list-item>
</template>
