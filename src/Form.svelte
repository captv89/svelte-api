<script>
  import { album } from "./store.js";
</script>

<form>
  <label for="id">ID Number</label>
  <input
    type="text"
    id="id"
    name="id"
    bind:value={$album.id}
    placeholder="Enter the uniqe ID of Song"
  />
  <br />
  <label for="title">Album Title</label>
  <input
    type="text"
    id="title"
    name="title"
    bind:value={$album.title}
    placeholder="Enter the song/album title"
  />
  <br />
  <label for="artist">Artist Name</label>
  <input
    type="text"
    id="artist"
    name="artist"
    bind:value={$album.artist}
    placeholder="Enter the artist name"
  />
  <br />
  <label for="year">Release Year</label>
  <input
    type="text"
    id="year"
    name="year"
    bind:value={$album.year}
    placeholder="Enter the year of release"
  />
  <br />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    display: block;
    margin: 0 2%;
  }
  input {
    display: block;
    margin: 0.5rem 0.5rem;
    border-radius: 8px;
  }
</style>
