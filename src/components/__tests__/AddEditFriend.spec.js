import { describe, it, expect, vi } from "vitest";

import { mount, flushPromises } from "@vue/test-utils";

import { createVuetify } from "vuetify";

import AddEditPerson from "../AddEditPerson.vue";
import { friendService } from "@/api/friend.service";

vi.mock("../../api/friend.service");

describe("AddEditFriend", () => {
  const vuetify = createVuetify();

  vi.mock("vue-router", () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }));

  describe("Add or Edit", () => {
    it("first/last name are required", async () => {
      expect.assertions(2);

      const wrapper = mount(AddEditPerson, {
        global: {
          plugins: [vuetify],
        },
      });
      await flushPromises();

      const firstName = wrapper.find("#firstName");
      expect(firstName.attributes().required).toBe("");

      const lastName = wrapper.find("#lastName");
      expect(lastName.attributes().required).toBe("");
    });
  });

  it("should be valid after all required fields are input", async () => {
    expect.assertions(1);

    const wrapper = mount(AddEditPerson, {
      global: {
        plugins: [vuetify],
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();

    const firstName = wrapper.find("#firstName");
    const lastName = wrapper.find("#lastName");
    firstName.trigger("input");
    lastName.trigger("input");
    await flushPromises();
    await wrapper.vm.$nextTick();

    // TODO
    // expect(wrapper.find("#submit").isDisabled()).toBe(true);

    firstName.element.value = "Jane";
    firstName.trigger("input");

    lastName.element.value = "Smith";
    lastName.trigger("input");

    await wrapper.vm.$nextTick();

    // TODO
    // expect(wrapper.vm.canSubmit()).toBe(true);
    expect(wrapper.find("#submit").isDisabled()).toBe(false);
  });

  describe("Add Friend", () => {
    it("should invoke the service to create a new friend", async () => {
      expect.assertions(1);

      friendService.create = vi.fn();

      const wrapper = mount(AddEditPerson, {
        global: {
          plugins: [vuetify],
        },
      });
      await flushPromises();

      const firstName = wrapper.find("#firstName");
      firstName.element.value = "Jane";
      firstName.trigger("input");

      const lastName = wrapper.find("#lastName");
      lastName.element.value = "Smith";
      lastName.trigger("input");

      await wrapper.vm.$nextTick();

      wrapper.find("#submit").trigger("click");
      expect(friendService.create).toBeCalledWith({
        firstName: "Jane",
        lastName: "Smith",
        gender: "male",
        fav: false,
      });
    });
  });
});
