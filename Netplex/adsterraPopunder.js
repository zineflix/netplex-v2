document.addEventListener("DOMContentLoaded", async function () {
    const watchNowBtn = document.getElementById("watch-now-btn");

    if (watchNowBtn) {
        watchNowBtn.addEventListener("click", async function () {
            const movieId = getMovieId(); // Get unique movie ID
            const userIp = await getUserIP();

            if (!movieId || !userIp) {
                console.error("Movie ID or User IP is missing.");
                return;
            }

            if (shouldTriggerPopunder(movieId, userIp)) {
                openPopunder();
                savePopunderData(movieId, userIp);
            } else {
                console.log(`Popunder already triggered today for ${movieId}.`);
            }
        });
    } else {
        console.error("Watch Now button not found!");
    }
});

// Function to fetch user IP
async function getUserIP() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to get user IP:", error);
        return null;
    }
}

// Function to get a unique Movie ID
function getMovieId() {
    const movieTitleElement = document.getElementById("movie-title");
    return movieTitleElement ? movieTitleElement.innerText.trim().replace(/\s+/g, "-").toLowerCase() : null;
}

// Function to check if popunder should trigger
function shouldTriggerPopunder(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const lastTriggered = localStorage.getItem(key);
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    return lastTriggered !== today; // If lastTriggered is not today, allow popunder
}

// Function to save popunder trigger event
function savePopunderData(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(key, today);
}

// Function to open the popunder in the background
function openPopunder() {
    const popunderUrl = "https:example.com"; // Replace with actual popunder URL
    const popunder = window.open(popunderUrl, "_blank", "width=100,height=100");

    if (popunder) {
        popunder.blur(); // Push to the background
        window.focus(); // Bring the main page to the front
    } else {
        console.error("Popunder blocked by browser.");
    }
}
