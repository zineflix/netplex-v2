(() => {
    let preloadedAdIframe;

    document.addEventListener("DOMContentLoaded", () => {
        preloadAdIframe();
        document.addEventListener("click", () => triggerPopunder(), { once: true });
    });

    function preloadAdIframe() {
        preloadedAdIframe = document.createElement("iframe");
        Object.assign(preloadedAdIframe.style, {
            display: "none",
            width: "0",
            height: "0",
            border: "none",
        });
        preloadedAdIframe.src = "https://beddingfetched.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5";
        document.body.appendChild(preloadedAdIframe);
    }

    function triggerPopunder() {
        const movieId = getMovieIdFromURL();
        if (!movieId) return;

        const today = new Date().toISOString().split("T")[0];
        const popunderData = JSON.parse(localStorage.getItem("popunderData")) || {};

        if (popunderData[movieId] === today) return;

        localStorage.setItem("popunderData", JSON.stringify({ ...popunderData, [movieId]: today }));
        openPopupContainer();
    }

    function openPopupContainer() {
        const popup = document.createElement("div");
        Object.assign(popup.style, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        });

        const skipBtn = document.createElement("button");
        skipBtn.innerText = "Skip Ad";
        Object.assign(skipBtn.style, {
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            fontSize: "18px",
            display: "none",
            cursor: "pointer",
            zIndex: 10000,
        });
        skipBtn.setAttribute("aria-label", "Skip Ad");
        skipBtn.addEventListener("click", () => closePopup(popup));

        const countdown = document.createElement("div");
        Object.assign(countdown.style, {
            color: "#fff",
            fontSize: "24px",
            marginTop: "60px",
        });

        if (preloadedAdIframe) {
            Object.assign(preloadedAdIframe.style, {
                display: "block",
                width: "90%",
                height: "80%",
                border: "none",
            });
        }

        popup.appendChild(skipBtn);
        popup.appendChild(countdown);
        if (preloadedAdIframe) popup.appendChild(preloadedAdIframe);
        document.body.appendChild(popup);

        let timer = 15;
        countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
        const interval = setInterval(() => {
            timer--;
            countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
            if (timer <= 0) {
                clearInterval(interval);
                countdown.innerText = "You can skip now.";
                skipBtn.style.display = "block";
            }
        }, 1000);
    }

    function closePopup(popup) {
        popup.remove();
        if (preloadedAdIframe) {
            preloadedAdIframe.remove();
            preloadedAdIframe = null;
        }
    }

    function getMovieIdFromURL() {
        return new URLSearchParams(window.location.search).get("movie_id");
    }
})();
