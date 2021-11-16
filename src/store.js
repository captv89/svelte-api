"use strict";

import { writable } from "svelte/store";

export const album = writable({
  id: "TESTSONG1234",
  title: "Maha Ganapathim",
  artist: "Kavalam",
  year: "2022",
});
