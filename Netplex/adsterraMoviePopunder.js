document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function () {
        triggerPopunder();
    }, { once: true }); // Ensures it runs only once per page load
});

function triggerPopunder() {
    const movieId = getMovieIdFromURL();
    if (!movieId) return;

    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD
    const savedData = JSON.parse(localStorage.getItem("popunderData")) || {};

    if (savedData[movieId] === today) return; // Already triggered today

    localStorage.setItem("popunderData", JSON.stringify({ ...savedData, [movieId]: today }));

    openPopunder("https://your-popunder-url.com");
}

function openPopunder(url) {
    let popunder = window.open(url, "_blank", "width=400,height=300,left=100,top=100");
    if (popunder) {
        popunder.blur();
        window.focus();
    }
}

function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movie_id");
}
