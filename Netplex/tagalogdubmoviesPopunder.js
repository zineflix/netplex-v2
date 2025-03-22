document.addEventListener("DOMContentLoaded", function () {
    const movieModal = document.getElementById("movieModal");

    if (!movieModal) return;

    movieModal.addEventListener("click", function (event) {
        let movieId = getCurrentMovieId();
        if (!movieId) return;

        let lastPopunder = localStorage.getItem(`popunder_${movieId}`);
        let today = new Date().toISOString().split('T')[0];

        if (lastPopunder === today) {
            console.log("Popunder already triggered today for this movie.");
            return;
        }

        openPopupContainer("https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5");

        localStorage.setItem(`popunder_${movieId}`, today);
    });
});

function getCurrentMovieId() {
    let movieTitleElement = document.getElementById("movieTitle");
    return movieTitleElement ? movieTitleElement.textContent.trim() : null;
}

function openPopupContainer(url) {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = 0;
    popup.style.left = 0;
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    popup.style.zIndex = 9999;
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "flex-start";

    const skipBtn = document.createElement("button");
    skipBtn.innerText = "Skip Ad";
    skipBtn.style.position = "absolute";
    skipBtn.style.top = "20px";
    skipBtn.style.right = "20px";
    skipBtn.style.padding = "10px 20px";
    skipBtn.style.fontSize = "18px";
    skipBtn.style.display = "none";
    skipBtn.style.cursor = "pointer";
    skipBtn.style.zIndex = 10000;
    skipBtn.onclick = () => document.body.removeChild(popup);

    const countdown = document.createElement("div");
    countdown.style.color = "#fff";
    countdown.style.fontSize = "24px";
    countdown.style.marginTop = "60px";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "90%";
    iframe.style.height = "80%";
    iframe.style.border = "none";

    popup.appendChild(skipBtn);
    popup.appendChild(countdown);
    popup.appendChild(iframe);
    document.body.appendChild(popup);

    let timer = 10; // 10-second countdown
    countdown.innerText = `Loading ad... Please wait ${timer} seconds...`;
    const interval = setInterval(() => {
        timer--;
        countdown.innerText = `Loading ad... Please wait ${timer} seconds...`;
        if (timer <= 0) {
            clearInterval(interval);
            countdown.innerText = "You can skip now.";
            skipBtn.style.display = "block";
        }
    }, 1000);
}
