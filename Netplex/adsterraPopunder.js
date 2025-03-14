document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function () {
        fetch("https://api64.ipify.org?format=json") // Get visitor's IP
            .then(response => response.json())
            .then(data => {
                let userIP = data.ip;
                triggerPopunder(userIP);
            })
            .catch(error => console.error("IP fetch failed:", error));
    }, { once: true });
});

function triggerPopunder(userIP) {
    let movieId = getMovieId();
    if (!movieId || !userIP) return;

    let popunderKey = `popunder_${movieId}_${userIP}`;
    let lastTriggered = localStorage.getItem(popunderKey);
    let today = new Date().toDateString();

    if (lastTriggered === today) return; // Prevent multiple popunders for this IP

    let popunderURL = "https://example.com"; // Replace with your ad URL
    let popup = window.open(popunderURL, "_blank", "width=300,height=200");

    if (popup) {
        popup.blur();
        window.focus();
        localStorage.setItem(popunderKey, today);
    }
}

function getMovieId() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id") || document.querySelector("#movie-title")?.textContent.trim();
}
