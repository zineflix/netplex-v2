document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", async function (event) {
        const watchNowBtn = document.getElementById("watch-now-btn");
        
        // Prevent popunder trigger when clicking the watch button
        if (watchNowBtn && watchNowBtn.contains(event.target)) {
            return;
        }
        
        const movieId = getMovieId(); // Ensure you have a way to get movie ID
        const userIp = await getUserIP();
        
        if (shouldTriggerPopunder(movieId, userIp)) {
            openPopunder();
            savePopunderData(movieId, userIp);
        }
    });
});

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

function getMovieId() {
    // Extract the movie ID from the URL or some identifier on the page
    return document.getElementById("movie-title")?.innerText || "defaultMovie";
}

function shouldTriggerPopunder(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const lastTriggered = localStorage.getItem(key);
    const today = new Date().toISOString().split("T")[0];
    
    return lastTriggered !== today; // Only trigger if not triggered today
}

function savePopunderData(movieId, userIp) {
    const key = `popunder_${movieId}_${userIp}`;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(key, today);
}

function openPopunder() {
    const url = "https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5"; // Replace with the actual popunder link
    const popunder = window.open(url, "_blank", "width=500,height=500");
    
    if (popunder) {
        popunder.blur(); // Push it to the background
        window.focus(); // Bring the main window back to focus
    }
}
