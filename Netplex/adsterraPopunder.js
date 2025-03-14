document.addEventListener("DOMContentLoaded", function () {
    const watchNowBtn = document.getElementById("watch-now-btn");

    if (watchNowBtn) {
        watchNowBtn.addEventListener("click", async function () {
            const movieId = getMovieId(); // Unique ID per movie
            const userIp = await getUserIP();

            if (movieId && userIp && shouldTriggerPopunder(movieId, userIp)) {
                openPopunder();
                savePopunderData(movieId, userIp);
            }
        });
    }
});

async function getUserIP() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip; // User's IP Address
    } catch (error) {
        console.error("Failed to get user IP:", error);
        return null;
    }
}

function getMovieId() {
    // Extract movie ID from the page (modify this as per your structure)
    const movieTitleElement = document.getElementById("movie-title");
    return movieTitleElement ? movieTitleElement.innerText.trim().replace(/\s+/g, "-").toLowerCase() : "default-movie";
}

function shouldTriggerPopunder(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const lastTriggered = localStorage.getItem(key);
    const today = new Date().toISOString().split("T")[0]; // Get today's date

    return lastTriggered !== today; // Return true if popunder wasn't triggered today
}

function savePopunderData(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(key, today);
}

function openPopunder() {
    const popunderUrl = "https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5"; // Replace with actual popunder URL
    const popunder = window.open(popunderUrl, "_blank", "width=100,height=100");

    if (popunder) {
        popunder.blur(); // Push to background
        window.focus(); // Bring main window back to front
    }
}
