import { describe, it, expect, vi } from "vitest";

import { mount, flushPromises } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

import PeopleList from "../PeopleList.vue";
import PersonItem from "@/components/PersonItem.vue";
import { useFriendStore } from "@/stores/friends";

describe("PersonList", async () => {
  vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
  }));

  it("has a mounted hook", async () => {
    expect.assertions(1);

    const pinia = createTestingPinia();
    setActivePinia(pinia);

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

    mount(PeopleList, {
      global: {
        plugins: [pinia],
      },
    });
    await flushPromises();

    expect(store.fetchFriends).toHaveBeenCalled(1);
  });

  it("should render two PersonItem(s)", async () => {
    expect.assertions(1);

    const pinia = createTestingPinia();
    setActivePinia(pinia);

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

    const wrapper = mount(PeopleList, {
      global: {
        plugins: [pinia],
      },
    });
    await flushPromises();

    expect(wrapper.findAllComponents(PersonItem)).toHaveLength(2);
  });

  it("renders Add Friend correctly", async () => {
    expect.assertions(2);

    const pinia = createTestingPinia();
    setActivePinia(pinia);

    const wrapper = mount(PeopleList, {
      global: {
        plugins: [pinia],
      },
    });
    await flushPromises();

    expect(wrapper.find("v-btn").attributes("to")).toBeDefined();
    expect(wrapper.find("v-btn").text()).toBe("Add Friend");
  });
});
