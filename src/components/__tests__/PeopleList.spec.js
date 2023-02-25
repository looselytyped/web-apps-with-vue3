import { beforeEach, describe, it, expect, vi } from "vitest";

import { mount, shallowMount, flushPromises } from "@vue/test-utils";

import PeopleList from "../PeopleList.vue";
import PersonItem from "@/components/PersonItem.vue";
import { friendService } from "../../api/friend.service";

vi.mock("../../api/friend.service");

describe("PersonList", async () => {
  vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
  }));

  beforeEach(() => {
    friendService.getAll.mockReset();
  });

  it("has a mounted hook", async () => {
    expect.assertions(2);

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

    const wrapper = mount(PeopleList);
    await flushPromises();

    expect(mockFn).toHaveBeenCalled(1);
    expect(wrapper.vm.friends).toHaveLength(2);
  });

  it("should render two PersonItem(s)", async () => {
    expect.assertions(1);

    friendService.getAll.mockResolvedValue({
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

    const wrapper = await shallowMount(PeopleList);
    await flushPromises();

    expect(wrapper.findAllComponents(PersonItem)).toHaveLength(2);
  });

  it("renders Add Friend correctly", async () => {
    // expect.assertions(2);

    friendService.getAll.mockResolvedValue({ data: [] });

    const wrapper = await mount(PeopleList);
    await flushPromises();

    expect(wrapper.find("v-btn").attributes("to")).toBeDefined();
    expect(wrapper.find("v-btn").text()).toBe("Add Friend");
  });
});
