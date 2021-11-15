<script>
    export let detail = {
        id : '',
        title : '',
        artist : '',
        price : 0,
    };

</script>

<div>
<h2> Result: </h2>
<br>

<table>
<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Artist</th>
    <th>Price</th>
</tr>
<tr>
    <th>{detail.id}</th>
    <th>{detail.title}</th>
    <th>{detail.artist}</th>
    <th>{detail.price}</th>
</tr>
</table>
</div>