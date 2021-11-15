<script>
  import CustomButton from "./CustomButton.svelte";
  import { album } from "./store.js";

  let disabled = false;
  let promise = Promise.resolve([]);

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
      return Array.isArray(data) ? data : [data];
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
      promise.then((value) => {
        console.log("Value:", value);
        ar_prom = [].concat(value);
      });
    }
  }
</script>

<!-- HTML PART -->

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

<div>
  {#await promise}
    <p>Loading...</p>
  {:then records}
    <div>
      <h2>Result:</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Price</th>
        </tr>
        {#each records as record, i}
          <tr>
            <td>{record.id}</td>
            <td>{record.title}</td>
            <td>{record.artist}</td>
            <td>{record.price}</td>
          </tr>
        {/each}
      </table>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

<!-- Styling -->
<style>
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    display: block;
    margin-bottom: 0.5rem;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
</style>
