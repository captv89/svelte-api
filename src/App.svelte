<script>
  import Result from './Result.svelte'
  import CustomButton from "./CustomButton.svelte";
  import { album } from "./store.js";

  let disabled = false;
  let promise = Promise.resolve([]);
  let ar_prom = [];

  // POST Function
  async function doPost() {
    const res = await fetch("http://localhost:8080/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: $album.id,
        title: $album.title,
        artist: $album.artist,
        price: $album.price,
      }),
    });
    const data = await res.json();
    if (res.ok) {
			return Array.isArray(data) ? data : [data];
		} else {
			throw new Error(data);
		}
    // $result = JSON.stringify(data);
    // console.log($result.length);
    // return data;
  }

  //   GET Function
  async function doGet() {
    const res = await fetch("http://localhost:8080/albums", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
			return Array.isArray(data) ? data : [data];
		} else {
			throw new Error(data);
		}
  }

  // GET ID Function

  async function doGetId() {
    const res = await fetch("http://localhost:8080/albums/" + $album.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
			return Array.isArray(data) ? data  : [data];
		} else {
			throw new Error(data);
		}
  }

  function handleClick(id) {
    disabled = true;
    if (id === "get") {
      console.log("GET");
      promise = doGet();
      ar_prom = promise;
    } else if (id === "post") {
      console.log("POST");
      promise = doPost();
      console.log(promise);
    } else if (id === "getId") {
      console.log("GET ID");
      promise = doGetId();
      promise.then(value => {
        console.log("Value:", value);
        ar_prom = [].concat(value)
      });
    }
  }
</script>

<form>
  <label for="id">ID Number</label>
  <input type="text" id="id" name="id" bind:value={$album.id} />
  <br />
  <label for="title">Album Title</label>
  <input type="text" id="title" name="title" bind:value={$album.title} />
  <br />
  <label for="artist">Artist Name</label>
  <input type="text" id="artist" name="artist" bind:value={$album.artist} />
  <br />
  <label for="price">Album Price</label>
  <input type="number" id="price" name="price" bind:value={$album.price} />
  <br />
</form>

<div>
  <CustomButton on:click={() => handleClick("get")} text="Get All Albums" />

  <CustomButton on:click={() => handleClick("post")} text="Save This Album" />

  <CustomButton on:click={() => handleClick("getId")} text="View This Album" />
</div>

<!-- From Net -->
<div>
  {#await promise}
    <p>Loading...</p>
  {:then records}
    {#each records as record, i}
      <Result detail(id)={record.id} detail(title)={record.title} artist={record.artist} price={record.price} />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
