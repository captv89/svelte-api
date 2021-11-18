"use strict";

import { writable } from "svelte/store";

export const album = writable({
  id: '',
  title: '',
  artist: '',
  year: '',
});
