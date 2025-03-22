let preloadedAdIframe;
let adLoaded = false;

// Preload ad iframe in background
function preloadAd() {
    preloadedAdIframe = document.createElement("iframe");
    preloadedAdIframe.src = "https://beddingfetched.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5";
    preloadedAdIframe.style.display = "none";
    preloadedAdIframe.style.width = "0";
    preloadedAdIframe.style.height = "0";
    preloadedAdIframe.style.border = "none";
    preloadedAdIframe.onload = () => {
        adLoaded = true;
    };
    document.body.appendChild(preloadedAdIframe);
}

function triggerPopunder() {
    const movieId = getMovieIdFromURL();
    if (!movieId) return;

    const today = new Date().toISOString().split("T")[0];
    const savedData = JSON.parse(localStorage.getItem("popunderData")) || {};

    if (savedData[movieId] === today) return; // Already triggered today

    localStorage.setItem("popunderData", JSON.stringify({ ...savedData, [movieId]: today }));

    openPopupContainer();
}

function openPopupContainer() {
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
    skipBtn.onclick = () => {
        document.body.removeChild(popup);
        if (preloadedAdIframe) {
            preloadedAdIframe.remove();
            preloadedAdIframe = null;
        }
    };

    const countdown = document.createElement("div");
    countdown.style.color = "#fff";
    countdown.style.fontSize = "24px";
    countdown.style.marginTop = "60px";

    popup.appendChild(skipBtn);
    popup.appendChild(countdown);
    document.body.appendChild(popup);

    let timer = 20;
    let shortCountdownStarted = false;

    const showAdAndStartCountdown = () => {
        if (preloadedAdIframe) {
            preloadedAdIframe.style.display = "block";
            preloadedAdIframe.style.width = "90%";
            preloadedAdIframe.style.height = "80%";
            preloadedAdIframe.style.border = "none";
            popup.appendChild(preloadedAdIframe);
        }

        const interval = setInterval(() => {
            if (adLoaded && !shortCountdownStarted && timer > 3 && preloadedAdIframe.style.display === "block") {
                timer = 3; // Reduce to 3 seconds only after the ad is visible on screen
                shortCountdownStarted = true;
            }

            countdown.innerText = `Ad loading... Please wait ${timer} seconds to skip...`;

            if (timer <= 0) {
                clearInterval(interval);
                countdown.innerText = "You can now skip the ad.";
                if (adLoaded && preloadedAdIframe.style.display === "block") skipBtn.style.display = "block";
            }
            timer--;
        }, 1000);
    };

    if (adLoaded) {
        showAdAndStartCountdown();
    } else {
        const adLoadCheck = setInterval(() => {
            if (adLoaded) {
                clearInterval(adLoadCheck);
                showAdAndStartCountdown();
            }
        }, 500);
    }
}

function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movie_id");
}

document.addEventListener("DOMContentLoaded", function () {
    preloadAd();
    document.addEventListener(
        "click",
        function () {
            triggerPopunder();
        },
        { once: true }
    );
});
