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

    document.body.style.overflow = "hidden"; // lock scroll

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
        document.body.style.overflow = ""; // restore scroll
        if (preloadedAdIframe) {
            preloadedAdIframe.remove();
            preloadedAdIframe = null;
        }
    };

    const countdown = document.createElement("div");
    countdown.style.color = "#fff";
    countdown.style.fontSize = "24px";
    countdown.style.marginTop = "60px";

    // Create visible iframe based on preloaded one
    const adIframe = document.createElement("iframe");
    adIframe.src = preloadedAdIframe ? preloadedAdIframe.src : "https://beddingfetched.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5";
    adIframe.style.width = "90%";
    adIframe.style.height = "80%";
    adIframe.style.border = "none";

    popup.appendChild(skipBtn);
    popup.appendChild(countdown);
    popup.appendChild(adIframe);
    document.body.appendChild(popup);

    let timer = 15;
    countdown.innerText = `Loading ad... Please wait ${timer} seconds to Skip...`;
    const interval = setInterval(() => {
        timer--;
        countdown.innerText = `Loading ad... Please wait ${timer} second${timer === 1 ? '' : 's'} to Skip...`;
        if (timer <= 0) {
            clearInterval(interval);
            countdown.innerText = "You can skip now.";
            skipBtn.style.display = "block";
        }
    }, 1000);
}
