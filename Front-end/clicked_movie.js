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

            const director = document.querySelector('.movie-director');
            director.textContent = `Director: ${movie.director}`;

            const year = document.querySelector('.movie-year');
            year.textContent = `Year: ${movie.year}`;

            const description = document.querySelector('.movie-description');
            description.textContent = `Description: ${movie.description}`;
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
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovieId = movies[randomIndex].id;
            window.location.href = `clicked_movie.html?movieId=${randomMovieId}`;
        })
}

function addToFavorites() {
    const movieId = getUrlParams().movieId;

    fetch(`https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie/${movieId}`)
        .then((response) => response.json())
        .then((movie) => {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isAlreadyFavorite = favorites.some((favMovie) => favMovie.id === movieId);

            if (!isAlreadyFavorite) {
                favorites.push(movie);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                showFavoriteMessage();
            } else {
                alert('This movie is already in your favorites!');
            }
        })
        .catch((error) => {
            console.error('Error adding to favorites:', error);
        });
}

function showFavoriteMessage() {
    const message = document.getElementById('favoriteMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000); // Show message for 3 seconds
}
