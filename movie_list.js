fetch("https://65702deb09586eff6640d8c4.mockapi.io/api/v1/movie")
    .then((response) => response.json())
    .then((data) => {
        const moviesContainer = document.getElementById('moviesContainer');
        const languageDropdown = document.getElementById('languageDropdown');
        const yearDropdown = document.getElementById('yearDropdown');

        const redirectToClickedMovie = (movieId) => {
            window.location.href = `clicked_movie.html?movieId=${movieId}`;
        };

        const displayMovies = (lang, yearPeriod) => {
            moviesContainer.innerHTML = '';
            if (yearPeriod === 'All') {
                data.forEach((movie) => {
                    if (movie.language === lang) {
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

                        const title = document.createElement('p');
                        title.textContent = movie.title;
                        title.style.color = '#fff';
                        movieContainer.appendChild(title);

                        moviesContainer.appendChild(movieContainer);
                    }
                });
            } else {
                const [startYear, endYear] = yearPeriod.split(' - ');
                const moviesFiltered = data.filter((movie) => movie.language === lang && movie.year >= parseInt(startYear) && movie.year <= parseInt(endYear));

                moviesFiltered.forEach((movie) => {
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

                    const title = document.createElement('p');
                    title.textContent = movie.title;
                    title.style.color = '#fff';
                    movieContainer.appendChild(title);

                    moviesContainer.appendChild(movieContainer);
                });
            }
        };

        const languages = [...new Set(data.map((movie) => movie.language))];
        const allYears = data.map((movie) => movie.year);
        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        const yearPeriods = ['All']; // Added 'All' option for displaying all movies

        for (let i = minYear; i <= maxYear; i += 5) {
            yearPeriods.push(`${i} - ${i + 4}`);
        }

        const createOptions = (dropdown, options) => {
            options.forEach((option) => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                dropdown.appendChild(optionElement);
            });
        };

        createOptions(languageDropdown, languages);
        createOptions(yearDropdown, yearPeriods);

        let selectedLanguage = null;
        let selectedYearPeriod = 'All'; // Set default value to 'All'

        languageDropdown.addEventListener('change', () => {
            selectedLanguage = languageDropdown.value;
            displayMovies(selectedLanguage, selectedYearPeriod);
        });

        yearDropdown.addEventListener('change', () => {
            selectedYearPeriod = yearDropdown.value;
            displayMovies(selectedLanguage, selectedYearPeriod);
        });

        // Default selection for language and year
        selectedLanguage = languages[0];
        displayMovies(selectedLanguage, selectedYearPeriod);
    });