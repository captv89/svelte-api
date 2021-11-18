<script>
  import CustomButton from "./CustomButton.svelte";
  import { album } from "./store.js";
  import Form from "./Form.svelte";

  let promise = Promise.resolve([]);
  let toggleSave = false;
  let toggleView = false;
  let id = "";

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
        year: $album.year,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      return Array.isArray(data) ? data : [data];
    } else {
      throw new Error(data);
    }
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
  async function doGetId(id) {
    console.log(id);
    const res = await fetch("http://localhost:8080/albums/" + id, {
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

  function handleClick(id, pra) {
    if (id === "get") {
      console.log("GET");
      promise = doGet();
    } else if (id === "post") {
      console.log("POST");
      promise = doPost();
    } else if (id === "getId") {
      console.log("GET ID", pra);
      promise = doGetId(pra);
    }
  }
</script>

<!-- HTML PART -->
<h1>Svelte & Golang</h1>

<div>
  <CustomButton on:click={() => handleClick("get")} text="Get All Albums" />
</div>

<label>
  <input type="checkbox" id="checkbox" bind:checked={toggleSave} />
  Add New Album/Song to Database
</label>
{#if toggleSave}
  <div id="save-form">
    <Form />
    <CustomButton on:click={() => handleClick("post")} text="Save This Album" />
  </div>
{/if}

<label>
  <input type="checkbox" id="checkbox" bind:checked={toggleView} />
  Search for Album
</label>
{#if toggleView}
  <div id="search-form">
    <label>
      <input type="text" placeholder="Album / Song ID" bind:value={id} />
    </label>
    <CustomButton
      on:click={() => handleClick("getId", id)}
      text="Lookup this Album"
    />
  </div>
{/if}

<div>
  {#if promise}
    {#await promise}
      <p>Loading...</p>
    {:then records}
      <div id="table">
        <h2>Result:</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
          {#each records as record, i}
            <tr>
              <td>{record.id}</td>
              <td>{record.title}</td>
              <td>{record.artist}</td>
              <td>{record.year}</td>
            </tr>
          {/each}
        </table>
      </div>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</div>

<!-- Styling -->
<style>
  div {
    display: flex;
    flex-direction: column;
  }
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #table {
    margin: 1.5rem 1.5rem;
  }

  #search-form input {
    display: block;
    width: 50%;
    margin: 0.5rem 0.5rem;
    border-radius: 8px;
  }

  td,
  th {
    border: 1.2px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
    border-color: #f2f2f2;
  }

  td:hover {
    cursor: text;
    border-color: #f2f2f2;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  h1 {
    text-align: center;
    margin: 1.5rem 1.5rem;
  }
</style>
