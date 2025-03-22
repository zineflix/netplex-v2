document.addEventListener("DOMContentLoaded", function () {
    const movieModal = document.getElementById("movieModal");

    if (!movieModal) return;

    movieModal.addEventListener("click", function (event) {
        let movieId = getCurrentMovieId();
        if (!movieId) return;

        let lastPopunder = localStorage.getItem(`popunder_${movieId}`);
        let today = new Date().toISOString().split('T')[0];

        if (lastPopunder === today) {
            console.log("Ad popup already shown today for this movie.");
            return;
        }

        showAdPopup("https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5");

        localStorage.setItem(`popunder_${movieId}`, today);
    });
});

function getCurrentMovieId() {
    let movieTitleElement = document.getElementById("movieTitle");
    return movieTitleElement ? movieTitleElement.textContent.trim() : null;
}

function showAdPopup(url) {
    const popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "0";
    popupContainer.style.left = "0";
    popupContainer.style.width = "100%";
    popupContainer.style.height = "100%";
    popupContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popupContainer.style.display = "flex";
    popupContainer.style.flexDirection = "column";
    popupContainer.style.justifyContent = "center";
    popupContainer.style.alignItems = "center";
    popupContainer.style.zIndex = "9999";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "80%";
    iframe.style.height = "60%";
    iframe.style.border = "none";
    iframe.allow = "autoplay; fullscreen";

    const countdownDiv = document.createElement("div");
    countdownDiv.style.color = "white";
    countdownDiv.style.fontSize = "20px";
    countdownDiv.style.marginTop = "20px";

    let countdown = 10; // seconds
    countdownDiv.textContent = `Ad ends in ${countdown} seconds...`;

    const skipButton = document.createElement("button");
    skipButton.textContent = "Skip Ad";
    skipButton.style.display = "none";
    skipButton.style.marginTop = "15px";
    skipButton.style.padding = "10px 20px";
    skipButton.style.fontSize = "16px";
    skipButton.style.cursor = "pointer";

    skipButton.addEventListener("click", function () {
        document.body.removeChild(popupContainer);
    });

    popupContainer.appendChild(iframe);
    popupContainer.appendChild(countdownDiv);
    popupContainer.appendChild(skipButton);
    document.body.appendChild(popupContainer);

    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownDiv.textContent = `Ad ends in ${countdown} seconds...`;
        } else {
            clearInterval(countdownInterval);
            countdownDiv.textContent = "You can now skip the ad.";
            skipButton.style.display = "block";
        }
    }, 1000);
}
