"use strict";

import { writable } from "svelte/store";

export const album = writable({
  id: "6",
  title: "Maha Ganapathim",
  artist: "Kavalam",
  price: 101,
});
