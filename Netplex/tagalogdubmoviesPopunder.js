let preloadedAdIframe;
let adIsLoaded = false;

document.addEventListener("DOMContentLoaded", function () {
    const movieModal = document.getElementById("movieModal");

    if (!movieModal) return;

    preloadAdIframe(); // Start preloading on page load

    movieModal.addEventListener("click", function () {
        let movieId = getCurrentMovieId();
        if (!movieId) return;

        let lastPopunder = localStorage.getItem(`popunder_${movieId}`);
        let today = new Date().toISOString().split('T')[0];

        if (lastPopunder === today) {
            console.log("Popunder already triggered today for this movie.");
            return;
        }

        openPopupContainer();
        localStorage.setItem(`popunder_${movieId}`, today);
    });
});

function getCurrentMovieId() {
    let movieTitleElement = document.getElementById("movieTitle");
    return movieTitleElement ? movieTitleElement.textContent.trim() : null;
}

function preloadAdIframe() {
    preloadedAdIframe = document.createElement("iframe");
    preloadedAdIframe.src = "https://beddingfetched.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5";
    preloadedAdIframe.style.display = "none";
    preloadedAdIframe.style.width = "0";
    preloadedAdIframe.style.height = "0";
    preloadedAdIframe.style.border = "none";

    // Track when ad iframe finishes loading
    preloadedAdIframe.onload = function () {
        adIsLoaded = true;
        console.log("Ad iframe preloaded and ready.");
    };

    document.body.appendChild(preloadedAdIframe);
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
            adIsLoaded = false;
            preloadAdIframe(); // Re-preload for next time
        }
    };

    const countdown = document.createElement("div");
    countdown.style.color = "#fff";
    countdown.style.fontSize = "24px";
    countdown.style.marginTop = "60px";

    if (preloadedAdIframe) {
        preloadedAdIframe.style.display = "block";
        preloadedAdIframe.style.width = "90%";
        preloadedAdIframe.style.height = "80%";
        preloadedAdIframe.style.border = "none";
    }

    popup.appendChild(skipBtn);
    popup.appendChild(countdown);
    popup.appendChild(preloadedAdIframe);
    document.body.appendChild(popup);

    let timer = 20;
    let interval;

    function showSkip() {
        clearInterval(interval);
        countdown.innerText = "Ad loaded. You can skip now.";
        skipBtn.style.display = "block";
    }

    // If ad is already loaded, skip countdown
    if (adIsLoaded) {
        showSkip();
    } else {
        // Start countdown if ad not loaded yet
        countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
        interval = setInterval(() => {
            timer--;
            if (timer > 0) {
                countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
            } else {
                showSkip();
            }
        }, 1000);

        // If it finishes loading during countdown, skip immediately
        preloadedAdIframe.onload = function () {
            adIsLoaded = true;
            showSkip();
        };
    }
}
