import { describe, expect, it, vi } from "vitest";
import { friendService } from "../friend.service";
import axios from "axios";

vi.mock("axios");

describe("Users Service", () => {
  it("should perform a HTTP GET to return all friends on getAll", async () => {
    expect.assertions(1);

    axios.get = vi.fn();

    await friendService.getAll();
    expect(axios.get).toBeCalledWith("http://localhost:3000/friends");
  });

  it("should perform a HTTP GET to return a friend on get", async () => {
    expect.assertions(1);
    axios.get = vi.fn();

    await friendService.get(1);

    expect(axios.get).toBeCalledWith("http://localhost:3000/friends/1");
  });

  it("should perform a HTTP PUT on update", async () => {
    expect.assertions(1);
    axios.put = vi.fn();

    await friendService.update({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false,
    });

    expect(axios.put).toBeCalledWith("http://localhost:3000/friends/1", {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: false,
    });
  });

  it("should perform a HTTP PATCH on patchFavorite", async () => {
    expect.assertions(1);
    axios.patch = vi.fn();

    await friendService.patchFavorite(1, true);

    expect(axios.patch).toBeCalledWith("http://localhost:3000/friends/1", {
      fav: true,
    });
  });

  it("should perform a HTTP POST on create", async () => {
    expect.assertions(1);
    axios.post = vi.fn();

    await friendService.create({
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: true,
    });

    expect(axios.post).toBeCalledWith("http://localhost:3000/friends", {
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      fav: true,
    });
  });
});
