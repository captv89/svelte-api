<script>
  export let text;
</script>

<button on:click>
  {text}
</button>

<style>
  button {
    background: #e2e8f0;
    color: #64748b;
    border: unset;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    margin: 0.5rem;
  }
  button:hover {
    background: #cbd5e1;
    color: #475569;
  }
  button:focus {
    background: #94a3b8;
    color: #f1f5f9;
  }
</style>
