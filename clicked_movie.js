const getUrlParams = () => {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
};

const movieId = getUrlParams().movieId; // Get movieId from URL

fetch(`https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
        const movieImageContainer = document.getElementById('movieImage');
        const movieInfoContainer = document.getElementById('movieInfo');
        if (movie) {
            const img = document.createElement('img');
            img.src = movie.image;
            img.style.width = '100%';
            img.style.height = 'auto';
            movieImageContainer.appendChild(img);

            const title = document.querySelector('.movie-title');
            title.textContent = movie.title;

            const language = document.querySelector('.movie-language');
            language.textContent = `Language: ${movie.language}`;

            // New elements for director and year placed above description
            const director = document.createElement('p');
            director.textContent = `Director: ${movie.director}`;
            director.classList.add('movie-director');
            movieInfoContainer.appendChild(director);

            const year = document.createElement('p');
            year.textContent = `Year: ${movie.year}`;
            year.classList.add('movie-year');
            movieInfoContainer.appendChild(year);

            // Remove previous description element if exists
            const existingDescription = document.querySelector('.movie-description');
            if (existingDescription) {
                existingDescription.remove();
            }

            const description = document.createElement('p');
            description.textContent = `Description: ${movie.description}`;
            description.classList.add('movie-description');
            movieInfoContainer.appendChild(description);
        } else {
            movieInfoContainer.innerHTML = 'Movie not found';
        }
    })
    .catch((error) => {
        console.error('Error fetching movie details:', error);
    });

function goBack() {
    window.history.back();
}

function navigateToRandomMovie() {
    fetch('https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie')
        .then(response => response.json())
        .then(movies => {
            // Get a random movie ID
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovieId = movies[randomIndex].id;

            // Redirect to the random movie page
            window.location.href = `clicked_movie.html?movieId=${randomMovieId}`;
        })
}

function addToFavorites() {
    const movieId = getUrlParams().movieId;

    // Fetch the movie details using the movieId
    fetch(`https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie/${movieId}`)
        .then((response) => response.json())
        .then((movie) => {
            // Get favorites from localStorage or initialize as an empty array
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            // Check if the movie already exists in favorites using its ID
            const isAlreadyFavorite = favorites.some((favMovie) => favMovie.id === movieId);

            // If the movie isn't already in favorites, add it
            if (!isAlreadyFavorite) {
                favorites.push(movie);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                // Update the favorites displayed on your_movies.html
                displayFavorites();
            } else {
                alert('This movie is already in your favorites!');
            }
        })
        .catch((error) => {
            console.error('Error adding to favorites:', error);
        });
}
