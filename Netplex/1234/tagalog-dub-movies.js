// For Responsive Header
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Solid color after scrolling down
    } else {
        nav.classList.remove("nav-solid"); // Transparent at the top
    }
});

// For sticky header when scrolling
    window.addEventListener("scroll", function () {
      let nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Add solid background when scrolled
      } else {
        nav.classList.remove("nav-solid"); // Remove solid background at top
      }
    });

    // Toggle menu visibility when menu button is clicked
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("active");
});


// For Dropdown More Button Function Start
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");

    dropdown.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});
// For Dropdown More Button Function End


// FOR TAGALOG DUB MOVIE SECTION START //
const API_KEY = "a1e72fd93ed59f56e6332813b9f8dcae";
        const MOVIE_IDS = [
            18377, 597, 57627, 455714, 9470, 396535, 20453, 1001311, 11770, 41387, 16269, 57663, 
            53658, 570511, 200085, 433945, 184219, 11178, 15859, 158445, 851644, 9056, 10753, 
            11134, 9404, 11636, 52324, 58233, 219246,
        ];
        const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
        const movieGallery = document.getElementById("movieGallery");
        const movieModal = document.getElementById("movieModal");
        const moviePoster = document.getElementById("moviePoster");
        const movieTitle = document.getElementById("movieTitle");
        const movieGenres = document.getElementById("movieGenres");
        const movieDescription = document.getElementById("movieDescription");
        const movieTrailer = document.getElementById("movieTrailer");

        // Custom video links for each movie
        const MOVIE_VIDEOS = {
            18377: "https://short.icu/mMFEhpYrX",
            597: "//ok.ru/videoembed/9644046748238?nochat=1",
            57627: "//ok.ru/videoembed/9644096817742?nochat=1",
            455714: "//ok.ru/videoembed/9644110776910?nochat=1",
            9470: "https://short.icu/XoTnMZi8e",
            396535: "https://short.icu/LqFDAWPgr",
            20453: "//ok.ru/videoembed/9644393499214?nochat=1",
            1001311: "//ok.ru/videoembed/9644423055950?nochat=1",
            11770: "https://short.icu/9WQZkbpvM",
            41387: "https://short.icu/Vs4-n_xYk",
            16269: "//ok.ru/videoembed/9644806376014?nochat=1",
            57663: "//ok.ru/videoembed/9644935875150?nochat=1",
            53658: "//ok.ru/videoembed/9645021006414?nochat=1",
            570511: "//ok.ru/videoembed/9645632719438?nochat=1",
            200085: "//ok.ru/videoembed/9648220408398?nochat=1",
            433945: "https://short.icu/isDXfa25J",
            184219: "//ok.ru/videoembed/9653891828302?nochat=1",
            11178: "//ok.ru/videoembed/9663357454926?nochat=1",
            15859: "//ok.ru/videoembed/9663417485902?nochat=1",
            158445: "https://short.icu/38tub1wQA",
            851644: "//ok.ru/videoembed/9668446128718?nochat=1",
            9056: "//ok.ru/videoembed/9671771294286?nochat=1",
            10753: "//ok.ru/videoembed/9671802948174?nochat=1",
            11134: "https://short.icu/mAo8J7sVwG",
            9404: "//ok.ru/videoembed/9671888276046?nochat=1",
            11636: "https://short.icu/b4IONWrDS",
            52324: "//ok.ru/videoembed/9671939918414?nochat=1",
            58233: "//ok.ru/videoembed/9643975313998?nochat=1",
       };     
       const MOVIE_EPISODES = {     
            219246: [
                  { name: "Episode 1", link: "https://drive.google.com/file/d/1A3uH9QQ2aTaBA_EsDSSAEw1athH2ueY-/preview" },
                  { name: "Episode 2", link: "https://drive.google.com/file/d/19w2MZa_I6vbklXbI7Mxbz11geGppCjuU/preview" },
                  { name: "Episode 3", link: "https://drive.google.com/file/d/19u2iudJuxbBhysj2TMOIq1m2R6OLse5b/preview" },
                  { name: "Episode 4", link: "https://drive.google.com/file/d/19qmqs96tvEUNzVfbOZowG09C0pqeWqnL/preview" },
                  { name: "Episode 5", link: "https://drive.google.com/file/d/19nO1c0uiDQ_jmrXUrABmCScNr4SBcC0H/preview" },
                  { name: "Episode 6", link: "https://drive.google.com/file/d/19iOxU-eYZDyCTy6iik0-lA_Qggnugetf/preview" },
                  { name: "Episode 7", link: "https://drive.google.com/file/d/19ZXztXQMWRKYbNa1FOp-ROTdzuYmsU72/preview" },
                  { name: "Episode 8", link: "https://drive.google.com/file/d/19VF_JbX09856cmYA0_bQ6iVkqWeVyNwA/preview" },
                  { name: "Episode 9", link: "EP2_LINK_HERE" },
                  { name: "Episode 10", link: "EP2_LINK_HERE" },
                  { name: "Episode 11", link: "EP2_LINK_HERE" },
                  { name: "Episode 12", link: "EP2_LINK_HERE" },
            ],
        };

        async function fetchMovies() {
            try {
                const movieRequests = MOVIE_IDS.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
                        .then(response => response.json())
                );

                const movies = await Promise.all(movieRequests);

                movies.forEach(movie => {
                    if (movie.poster_path) {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movie-card");

                        movieCard.innerHTML = `
                            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                            <div class="play-button">▶</div>
                        `;
                        movieCard.addEventListener("click", () => openModal(movie));
                        movieGallery.appendChild(movieCard);
                    }
                });
            } catch (error) {
                console.error("Error fetching movies:", error);
                movieGallery.innerHTML = "<p>Failed to load movies. Please try again later.</p>";
            }
        }

        function openModal(movie) {
            moviePoster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
            moviePoster.alt = movie.title;
            movieTitle.textContent = movie.title;
            movieGenres.textContent = movie.genres ? movie.genres.map(genre => genre.name).join(", ") : "Unknown";
            movieDescription.textContent = movie.overview || "No description available.";

            // Get unique video link for the movie
            const videoUrl = MOVIE_VIDEOS[movie.id] || "https://www.youtube.com/embed/defaultVideo";

            // Set the iframe source
            movieTrailer.src = videoUrl;

            // Show the modal
            movieModal.classList.add("show");
        }

        function closeModal() {
            movieModal.classList.remove("show");
            movieTrailer.src = ""; // Stop video playback
        }

        // Close modal on outside click or Escape key
        window.addEventListener("click", event => {
            if (event.target === movieModal) closeModal();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeModal();
        });


// Separate TV Show Section
const TV_SHOW_IDS = [219246];

const MOVIE_EPISODES = {
  219246: [
    { name: "Episode 1", link: "https://drive.google.com/file/d/1A3uH9QQ2aTaBA_EsDSSAEw1athH2ueY-/preview" },
    { name: "Episode 2", link: "https://drive.google.com/file/d/19w2MZa_I6vbklXbI7Mxbz11geGppCjuU/preview" },
    { name: "Episode 3", link: "https://drive.google.com/file/d/19u2iudJuxbBhysj2TMOIq1m2R6OLse5b/preview" },
    { name: "Episode 4", link: "https://drive.google.com/file/d/19qmqs96tvEUNzVfbOZowG09C0pqeWqnL/preview" },
    { name: "Episode 5", link: "https://drive.google.com/file/d/19nO1c0uiDQ_jmrXUrABmCScNr4SBcC0H/preview" },
    { name: "Episode 6", link: "https://drive.google.com/file/d/19iOxU-eYZDyCTy6iik0-lA_Qggnugetf/preview" },
    { name: "Episode 7", link: "https://drive.google.com/file/d/19ZXztXQMWRKYbNa1FOp-ROTdzuYmsU72/preview" },
    { name: "Episode 8", link: "https://drive.google.com/file/d/19VF_JbX09856cmYA0_bQ6iVkqWeVyNwA/preview" },
  ],
};

async function fetchTvShows() {
  try {
    const tvRequests = TV_SHOW_IDS.map(id => fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`).then(res => res.json()));
    const tvShows = await Promise.all(tvRequests);

    tvShows.forEach(show => {
      if (show.poster_path) {
        const showCard = document.createElement("div");
        showCard.classList.add("movie-card");
        showCard.innerHTML = `<img src="${IMAGE_BASE_URL}${show.poster_path}" alt="${show.name}"><div class="play-button">▶</div>`;
        showCard.addEventListener("click", () => openTvModal(show));
        document.getElementById("tvGallery").appendChild(showCard);
      }
    });
  } catch (err) {
    console.error("Error fetching TV shows:", err);
  }
}

function openTvModal(show) {
  moviePoster.src = `${IMAGE_BASE_URL}${show.poster_path}`;
  movieTitle.textContent = show.name;
  movieGenres.textContent = (show.genres || []).map(g => g.name).join(", ") || "Unknown";
  movieDescription.textContent = show.overview || "No description available.";

  const trailerContainer = document.getElementById("trailerContainer");
  trailerContainer.innerHTML = "";

  if (MOVIE_EPISODES[show.id]) {
    const select = document.createElement("select");
    select.id = "episodeSelector";

    MOVIE_EPISODES[show.id].forEach((ep, index) => {
      const option = document.createElement("option");
      option.value = ep.link;
      option.textContent = ep.name;
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });

    const iframe = document.createElement("iframe");
    iframe.src = MOVIE_EPISODES[show.id][0].link;
    iframe.id = "movieTrailer";
    iframe.setAttribute("allowfullscreen", "");

    select.addEventListener("change", function () {
      iframe.src = this.value;
    });

    trailerContainer.appendChild(select);
    trailerContainer.appendChild(iframe);
  } else {
    trailerContainer.innerHTML = `<iframe id="movieTrailer" src="https://www.youtube.com/embed/defaultVideo" allowfullscreen></iframe>`;
  }

  movieModal.classList.add("show");
}
        fetchMovies();
        fetchTvShows();
// FOR TAGALOG DUB MOVIE SECTION END //

// Fullscreen Button Start //
document.getElementById("fullscreenButton").addEventListener("click", function () {
    let iframe = document.getElementById("movieTrailer");

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
    // Rotate the screen to landscape mode (Only works on mobile browsers)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(error => console.log("Orientation lock failed:", error));
    }
});
// Fullscreen Button End //
