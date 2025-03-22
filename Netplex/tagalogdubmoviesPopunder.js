let adPreloadUrl = "https://beddingfetched.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5";
let adIsPreloaded = false;

document.addEventListener("DOMContentLoaded", function () {
    const movieModal = document.getElementById("movieModal");

    if (!movieModal) return;

    preloadAdIframe(); // Preload on page load

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
    let testIframe = document.createElement("iframe");
    testIframe.src = adPreloadUrl;
    testIframe.style.display = "none";
    testIframe.style.width = "0";
    testIframe.style.height = "0";
    testIframe.style.border = "none";
    testIframe.onload = function () {
        adIsPreloaded = true;
        testIframe.remove(); // clean up test iframe after preload check
        console.log("Ad preload check: successful.");
    };
    document.body.appendChild(testIframe);
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
        adIsPreloaded = false;
        preloadAdIframe(); // preload again for next time
    };

    const countdown = document.createElement("div");
    countdown.style.color = "#fff";
    countdown.style.fontSize = "24px";
    countdown.style.marginTop = "60px";
    popup.appendChild(skipBtn);
    popup.appendChild(countdown);

    // Create fresh visible iframe
    const adIframe = document.createElement("iframe");
    adIframe.src = adPreloadUrl;
    adIframe.style.width = "90%";
    adIframe.style.height = "80%";
    adIframe.style.border = "none";
    adIframe.style.marginTop = "20px";
    popup.appendChild(adIframe);
    document.body.appendChild(popup);

    let timer = adIsPreloaded ? 3 : 20; // shorten if preloaded check was successful
    countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;

    let interval = setInterval(() => {
        timer--;
        if (timer > 0) {
            countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
        } else {
            clearInterval(interval);
            countdown.innerText = "You can skip now.";
            skipBtn.style.display = "block";
        }
    }, 1000);

    adIframe.onload = function () {
        console.log("Visible ad iframe finished loading.");
        clearInterval(interval);
        countdown.innerText = "Ad loaded. You can skip now.";
        skipBtn.style.display = "block";
    };
}
