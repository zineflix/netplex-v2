document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function () {
        triggerPopunder();
    }, { once: true }); // Ensures it runs only once per page load
});

function triggerPopunder() {
    const tvShowId = getTvShowIdFromURL();  // Adjusted to get the TV show ID instead of movie ID
    if (!tvShowId) return;

    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD
    const savedData = JSON.parse(localStorage.getItem("popunderData")) || {};

    if (savedData[tvShowId] === today) return; // Already triggered today

    localStorage.setItem("popunderData", JSON.stringify({ ...savedData, [tvShowId]: today }));

    openPopunder("https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5");
}

function openPopunder(url) {
    // Open a small, off-screen popunder window
    let popunder = window.open(url, "_blank", "width=1,height=1,left=-10000,top=-10000");

    if (popunder) {
        // Make the popunder window stay behind the main window
        popunder.blur();
        window.focus();
        
        // Try to minimize the popunder if the browser allows it
        if (popunder.document) {
            popunder.document.title = 'Invisible';
        }

        // Force the popunder window to stay behind (this may not work on all browsers)
        try {
            popunder.moveTo(-10000, -10000); // Moves it far away off-screen, this can also reduce visibility
        } catch (e) {
            console.log("Popunder window movement failed:", e);
        }

        // It's not guaranteed, but this might encourage the window to stay in the background
        setTimeout(() => {
            try {
                popunder.blur();
            } catch (e) {
                console.log("Popunder window blur failed:", e);
            }
        }, 100);
    }
}

function getTvShowIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tvshow_id");  // Adjusted to get "tvshow_id" from URL
}
