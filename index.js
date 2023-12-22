fetch("https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie")
    .then((response) => response.json())
    .then((data) => {
        const moviesContainer = document.getElementById('moviesContainer');
        const buttonsContainer = document.getElementById('languageButtons');

        const redirectToClickedMovie = (movieId) => {
            // Redirect to clicked_movie.html with the movie ID as a parameter
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
                    redirectToClickedMovie(movie.id); // Redirect when image is clicked
                });
                movieContainer.appendChild(img);

                const button = document.createElement('button');
                button.classList.add('movie-button');
                button.textContent = movie.title;
                button.addEventListener('click', () => {
                    redirectToClickedMovie(movie.id); // Redirect when button is clicked
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
    }
    
    );

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
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }


    function submitRegisterForm(event) {
        event.preventDefault(); // Prevent form submission
    
        const username = document.querySelector('input[name="uname"]').value;
        const password = document.querySelector('input[name="psw"]').value;
    
        // Store user information in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    
        // Close the modal or handle further actions
        document.getElementById('id01').style.display = 'none';
        // Add logic to redirect or perform any other action after registration
    }
    
    // In your index.js or other relevant scripts where you need the user info
    document.addEventListener('DOMContentLoaded', () => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
    
        // Check if user is registered
        if (storedUsername && storedPassword) {
            // Use the stored information as needed (e.g., pre-fill forms, show logged-in state)
            console.log(`Logged in as ${storedUsername}`);
        } else {
            // Handle not being registered or show a registration prompt
            console.log('Not registered');
        }
    });
    
    // Example usage in redirect function
    function redirectToClickedMovie(movieId) {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
    
        // Check if user is registered before redirecting
        if (storedUsername && storedPassword) {
            // Redirect to clicked_movie.html with the movie ID as a parameter
            window.location.href = `clicked_movie.html?movieId=${movieId}`;
        } else {
            // Handle not being registered or prompt for registration
            console.log('Please register to view this movie.');
            // You might open the registration modal here or handle differently
        }
    }

