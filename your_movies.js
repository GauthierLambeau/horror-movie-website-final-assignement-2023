function displayFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    favoritesContainer.innerHTML = '';

    fetch("https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(movie => {
                const movieContainer = document.createElement('div');
                movieContainer.classList.add('movieContainer');

                const movieContent = `
                    <h3>${movie.title}</h3>
                    <p>Language: ${movie.language}</p>
                    <p>Director: ${movie.director}</p>
                    <p>Year: ${movie.year}</p>
                    <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                `;

                movieContainer.innerHTML = movieContent;
                favoritesContainer.appendChild(movieContainer);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Call displayFavorites when the page loads
displayFavorites();


