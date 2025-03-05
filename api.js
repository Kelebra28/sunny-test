function fetchCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => {
            if (!response.ok) throw new Error('Error en la petición');
            return response.json();
        })
        .then(data => {
            console.log(data.results)
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('characters').innerHTML = 
                `<p>¡Error al cargar los datos! ${error}</p>`;
        });
}


fetchCharacters()