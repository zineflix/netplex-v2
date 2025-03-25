const apiKey = 'a1e72fd93ed59f56e6332813b9f8dcae';
const searchInput = document.getElementById('search');
const movieGrid = document.getElementById('movie-grid');
const recommendationText = document.getElementById('recommendation-text');

let currentPage = 1;
let currentQuery = '';
let isFetching = false; // Prevent multiple simultaneous fetches
let totalPages = 1;

async function fetchMovies(query, page = 1) {
  if (isFetching) return;
  isFetching = true;

  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&language=en-US&page=${page}&include_adult=false`;
  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    movieGrid.innerHTML = '';
  }

  if (data.results.length === 0 && page === 1) {
    movieGrid.innerHTML = '<p>No results found</p>';
    isFetching = false;
    return;
  }

  data.results.forEach(item => {
    if (item.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
      const title = item.title || item.name;
      const rating = item.vote_average || 0;
      const id = item.id;
      const mediaType = item.media_type;

      const link = document.createElement('a');
      link.href = mediaType === 'movie'
        ? `movie-details.html?movie_id=${id}`
        : `tvshows-details.html?id=${id}`;

      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');

      movieItem.innerHTML = `
        <div class="rating-container">
          <div class="rating">
            <span class="star">&#9733;</span><span class="rating-number">${rating.toFixed(1)}</span>
          </div>
        </div>
        <img src="${posterUrl}" alt="${title}" />
      `;

      link.appendChild(movieItem);
      movieGrid.appendChild(link);
    }
  });

  totalPages = data.total_pages;
  isFetching = false;
}

async function fetchRecommendations() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  movieGrid.innerHTML = '';

  if (data.results.length === 0) {
    movieGrid.innerHTML = '<p>No recommendations available</p>';
    return;
  }

  data.results.forEach(item => {
    if (item.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
      const title = item.title || item.name;
      const rating = item.vote_average || 0;
      const id = item.id;
      const mediaType = item.media_type;

      const link = document.createElement('a');
      link.href = mediaType === 'movie'
        ? `movie-details.html?movie_id=${id}`
        : `tvshows-details.html?id=${id}`;

      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');

      movieItem.innerHTML = `
        <div class="rating-container">
          <div class="rating">
            <span class="star">&#9733;</span><span class="rating-number">${rating.toFixed(1)}</span>
          </div>
        </div>
        <img src="${posterUrl}" alt="${title}" />
      `;

      link.appendChild(movieItem);
      movieGrid.appendChild(link);
    }
  });
}

searchInput.addEventListener('input', (e) => {
  currentQuery = e.target.value.trim();
  currentPage = 1;
  totalPages = 1;
  if (currentQuery) {
    recommendationText.innerHTML = `<p>Searching for "${currentQuery}"...</p>`;
    fetchMovies(currentQuery, currentPage);
  } else {
    recommendationText.innerHTML = '<p>Recommend Movies and TV Shows</p>';
    fetchRecommendations();
  }
});

// Infinite scroll handler
window.addEventListener('scroll', () => {
  if (currentQuery && !isFetching && currentPage < totalPages) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      currentPage++;
      fetchMovies(currentQuery, currentPage);
    }
  }
});

// Load trending recommendations on page load
fetchRecommendations();




/* FOR RESPONSIVE NAVIGATION BAR START */
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
/* FOR RESPONSIVE NAVIGATION BAR END */


// For Dropdown More Button Function Start
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");

    dropdown.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});
// For Dropdown More Button Function End
