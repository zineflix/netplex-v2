document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
        // Prevent triggering if already opened today for the movie
        let movieId = getCurrentMovieId(); // Function to get movie ID
        if (!movieId) return;

        let lastPopunder = localStorage.getItem(`popunder_${movieId}`);
        let today = new Date().toISOString().split('T')[0];

        if (lastPopunder === today) {
            console.log("Popunder already triggered today for this movie.");
            return;
        }

        // Open popunder
        openPopunder("https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5");

        // Store the trigger date
        localStorage.setItem(`popunder_${movieId}`, today);
    });
});

function getCurrentMovieId() {
    let movieTitleElement = document.getElementById("movieTitle");
    if (movieTitleElement) {
        return movieTitleElement.textContent.trim();
    }
    return null;
}

function openPopunder(url) {
    let popunder = window.open(url, "_blank", "width=1,height=1,left=9999,top=9999");
    if (popunder) {
        popunder.blur();
        window.focus();
    }
}
