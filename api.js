function fetchCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => {
            if (!response.ok) throw new Error('Error en la petición');
            console.log(response.json());
            return response.json();
        })
        .then(data => {
            displayCharacters(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('characters').innerHTML = 
                `<p>¡Error al cargar los datos! ${error}</p>`;
        });
}

function displayCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = characters
        .slice(0, 6)
        .map(character => `
            <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                <img src="${character.image}" alt="${character.name}" width="100">
                <h3>${character.name}</h3>
                <p>Especie: ${character.species}</p>
                <p>Estado: ${character.status}</p>
            </div>
        `).join('');
}

fetchCharacters()