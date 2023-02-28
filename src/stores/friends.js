import { defineStore } from "pinia";

import { friendService } from "@/api/friend.service";

const updateFriend = (friends, updatedFriend) => {
  const index = friends.findIndex((e) => e.id === updatedFriend.id);
  return [
    ...friends.slice(0, index),
    updatedFriend,
    ...friends.slice(index + 1, friends.length),
  ];
};

export const useFriendStore = defineStore("friends", {
  state: () => ({
    friends: [],
  }),
  getters: {
    favFriendsCount: (state) => state.friends.filter((f) => f.fav).length,
    friendsCount: (state) => state.friends.length,
    friendById: (state) => (id) => state.friends.find((f) => f.id === id),
  },
  actions: {
    async fetchFriends() {
      this.friends = (await friendService.getAll()).data;
    },
    async like(friend) {
      const updatedFriend = (await friendService.patchFavorite(friend.id, true))
        .data;
      this.friends = updateFriend(this.friends, updatedFriend);
    },
    async unlike(friend) {
      const updatedFriend = (
        await friendService.patchFavorite(friend.id, false)
      ).data;
      this.friends = updateFriend(this.friends, updatedFriend);
    },
    async addFriend(friend) {
      const newFriend = (await friendService.create(friend)).data;
      this.friends = [...this.friends, newFriend];
    },
    async updateFriend(friend) {
      const updatedFriend = (await friendService.update(friend)).data;
      this.friends = updateFriend(this.friends, updatedFriend);
    },
  },
});
