<!-- links to all the paths -->

<div>

    <h1 class="text-4xl text-white my-9">Organizational Page</h1>
    <p>Here stuff gets organized. Put the items to the Categories</p>
    <p>Hast du den Artikel das letzte Jahr gebraucht? Nein -&gt; wahrscheinlich weg</p>
    <p>Kannst du den Artikel wiederbekommen? Ja -&gt; Wenn es nicht nützlich ist, weg</p>
    <p>Ist der Artikel wert Jahre einfach rumzuliegen und Platz zu verbrauchen? Nein -&gt; weg </p>
</div>


<script>
    function getTest() {
        fetch('/api/cloud')
            .then(response => response.text())
            .then(data => {
                test = data;
            });
    }

    let test = "Hallo";
</script>


<p>{test}</p>

<button on:click={getTest}>Test</button>
