document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        console.log(`Logged in as ${storedUsername}`);
    } else {
        console.log('Not registered');
    }

    fetchMovies();

    // Add event listener to close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('id01');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

function fetchMovies() {
    fetch("https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie")
        .then((response) => response.json())
        .then((data) => {
            const moviesContainer = document.getElementById('moviesContainer');
            const buttonsContainer = document.getElementById('languageButtons');

            const redirectToClickedMovie = (movieId) => {
                window.location.href = `clicked_movie.html?movieId=${movieId}`;
            };

            const displayMovies = (lang) => {
                moviesContainer.innerHTML = '';
                const moviesByLanguage = data.filter((movie) => movie.language === lang);

                moviesByLanguage.forEach((movie) => {
                    const movieContainer = document.createElement('div');
                    movieContainer.classList.add('movie-item');

                    const img = document.createElement('img');
                    img.src = movie.image;
                    img.style.width = '200px';
                    img.style.height = '200px';
                    img.addEventListener('click', () => {
                        redirectToClickedMovie(movie.id);
                    });
                    movieContainer.appendChild(img);

                    const button = document.createElement('button');
                    button.classList.add('movie-button');
                    button.textContent = movie.title;
                    button.addEventListener('click', () => {
                        redirectToClickedMovie(movie.id);
                    });
                    movieContainer.appendChild(button);

                    moviesContainer.appendChild(movieContainer);
                });
            };

            const languages = [...new Set(data.map((movie) => movie.language))];
            languages.forEach((lang) => {
                const button = document.createElement('button');
                button.textContent = lang;

                button.addEventListener('click', () => {
                    displayMovies(lang);
                });

                buttonsContainer.appendChild(button);
            });
        });
}

function navigateToRandomMovie() {
    fetch('https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie')
        .then(response => response.json())
        .then(movies => {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovieId = movies[randomIndex].id;

            window.location.href = `clicked_movie.html?movieId=${randomMovieId}`;
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function submitRegisterForm(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    document.getElementById('id01').style.display = 'none';
}
