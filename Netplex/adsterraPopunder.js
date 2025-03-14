document.addEventListener("DOMContentLoaded", async function () {
    const popunderUrl = "https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5"; // Replace with your actual popunder link
    const popupWidth = 1;
    const popupHeight = 1;
    const storageKey = "popunderData";

    // Function to get user's IP Address
    async function getUserIP() {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error fetching IP:", error);
            return null;
        }
    }

    // Function to open the popunder
    function openPopunder() {
        let win = window.open(popunderUrl, "_blank", `width=${popupWidth},height=${popupHeight},left=-1000,top=-1000`);
        if (win) {
            win.blur(); 
            window.focus(); 
        }
    }

    // Check if popunder is allowed
    async function handlePopunder() {
        const ip = await getUserIP();
        if (!ip) return;

        const movieTitle = document.getElementById("movie-title")?.innerText || "default_movie";
        const today = new Date().toISOString().split("T")[0]; // Get current date

        let storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

        // If popunder for this IP and movie was already triggered today, do nothing
        if (storedData[ip] && storedData[ip][movieTitle] === today) {
            console.log("Popunder already shown today for this movie.");
            return;
        }

        // Store popunder trigger date for this movie and IP
        storedData[ip] = storedData[ip] || {};
        storedData[ip][movieTitle] = today;
        localStorage.setItem(storageKey, JSON.stringify(storedData));

        // Open the popunder
        openPopunder();
    }

    // Attach popunder to any click
    document.addEventListener("click", handlePopunder, { once: true });
});
