import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import PersonItem from "../PersonItem.vue";

describe("PersonItem", () => {
  it("should display a Person", () => {
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true,
        },
        last: true,
      },
    });

    expect(wrapper.text()).toContain("Raju Gandhi");
  });

  it("should display a divider if its NOT the last friend", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true,
        },
        last: false,
      },
    });

    expect(wrapper.find("v-divider").exists()).toBe(true);
  });

  it("should NOT display a divider if it IS the last friend", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true,
        },
        last: true,
      },
    });

    expect(wrapper.find("v-divider").exists()).toBe(false);
  });

  it("should highlight the favorite icon if the friend is a fav", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true,
        },
        last: false,
      },
    });

    expect(wrapper.find("v-icon.fav").attributes("color")).toBe("red");
  });

  it("should grey out the favorite icon if the friend is NOT a fav", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false,
        },
        last: false,
      },
    });

    expect(wrapper.find("v-icon.fav").attributes("color")).toBe("grey");
  });

  it("should compute the fullname correctly", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false,
        },
        last: false,
      },
    });
    const vm = wrapper.vm;
    expect(vm.fullName).toBe("Raju Gandhi");
  });

  it("should emit liked event when friend is liked", () => {
    expect.assertions(1);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false,
        },
        last: false,
      },
    });

    wrapper.vm.like = vi.fn();

    wrapper.find("v-icon.fav").trigger("click");
    expect(wrapper.vm.like).toHaveBeenCalledTimes(1);
  });

  it("should emit 'friend-liked' when 'like' handler is invoked", () => {
    expect.assertions(2);
    const wrapper = mount(PersonItem, {
      props: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: false,
        },
        last: false,
      },
    });

    wrapper.vm.like();
    const emitted = wrapper.emitted();
    const e = emitted["friend-liked"];
    expect(e).toBeTruthy();
    expect(e.length).toBe(1);
  });

  it("should render correctly", () => {
    expect.assertions(1);

    const wrapper = mount(PersonItem, {
      propsData: {
        friend: {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true,
        },
        last: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    // you can even inline the output like so
    // expect(wrapper.element).toMatchInlineSnapshot();
  });
});