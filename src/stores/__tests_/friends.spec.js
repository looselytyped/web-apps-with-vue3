import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises } from "@vue/test-utils";

import { setActivePinia, createPinia } from "pinia";

import { useFriendStore } from "../friends";
import { friendService } from "../../api/friend.service";

vi.mock("../../api/friend.service");

describe("Friend Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    friendService.getAll.mockReset();
    friendService.patchFavorite.mockReset();
    friendService.create.mockReset();
  });

  it("has an initial state of no friends", () => {
    expect.assertions(1);
    const store = useFriendStore();

    expect(store.friends).toStrictEqual([]);
  });

  it("should fetch all friends", async () => {
    expect.assertions(2);
    const store = useFriendStore();
    const mockFn = friendService.getAll.mockResolvedValue({
      data: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false,
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          gender: "female",
          fav: true,
        },
      ],
    });

    store.fetchFriends();
    await flushPromises();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(store.friends).toHaveLength(2);
  });

  it("should like a friend", async () => {
    // expect.assertions(2);
    const store = useFriendStore();
    store.$patch({
      friends: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false,
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          gender: "female",
          fav: true,
        },
      ],
    });

    const mockFn = friendService.patchFavorite.mockResolvedValue({
      data: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        fav: true,
      },
    });

    store.like({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false,
    });
    await flushPromises();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(store.friends).toHaveLength(2);
    expect(store.friends[0]).toStrictEqual({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: true,
    });
  });

  it("should unlike a friend", async () => {
    expect.assertions(3);
    const store = useFriendStore();
    store.$patch({
      friends: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false,
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          gender: "female",
          fav: true,
        },
      ],
    });

    const mockFn = friendService.patchFavorite.mockResolvedValue({
      data: {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        gender: "female",
        fav: false,
      },
    });

    store.unlike({
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "female",
      fav: true,
    });
    await flushPromises();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(store.friends).toHaveLength(2);
    expect(store.friends[1]).toStrictEqual({
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "female",
      fav: false,
    });
  });

  it("should add a friend", async () => {
    expect.assertions(3);
    const store = useFriendStore();
    const mockFn = friendService.create.mockResolvedValue({
      data: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        fav: false,
      },
    });

    store.addFriend({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false,
    });
    await flushPromises();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(store.friends).toHaveLength(1);
    expect(store.friends[0]).toStrictEqual({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false,
    });
  });

  it("should update a friend", async () => {
    expect.assertions(3);
    const store = useFriendStore();
    store.$patch({
      friends: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false,
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          gender: "female",
          fav: true,
        },
      ],
    });
    const mockFn = friendService.update.mockResolvedValue({
      data: {
        id: 2,
        firstName: "Jane",
        lastName: "Other",
        gender: "female",
        fav: false,
      },
    });

    store.updateFriend({
      id: 2,
      firstName: "Jane",
      lastName: "Other",
      gender: "female",
      fav: false,
    });
    await flushPromises();

    expect(mockFn).toHaveBeenCalledOnce();
    expect(store.friends).toHaveLength(2);
    expect(store.friends[1]).toStrictEqual({
      id: 2,
      firstName: "Jane",
      lastName: "Other",
      gender: "female",
      fav: false,
    });
  });

  it("should return getters correctly", async () => {
    expect.assertions(3);
    const store = useFriendStore();
    store.$patch({
      friends: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          gender: "male",
          fav: false,
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          gender: "female",
          fav: true,
        },
      ],
    });

    expect(store.favFriendsCount).toBe(1);
    expect(store.friendsCount).toBe(2);
    expect(store.friendById(2)).toStrictEqual({
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "female",
      fav: true,
    });
  });
});
