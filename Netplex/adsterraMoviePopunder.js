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

    // Move the preloaded iframe into popup
    preloadedAdIframe.style.display = "block";
    preloadedAdIframe.style.width = "90%";
    preloadedAdIframe.style.height = "80%";
    preloadedAdIframe.style.border = "none";

    popup.appendChild(skipBtn);
    popup.appendChild(countdown);
    popup.appendChild(preloadedAdIframe);
    document.body.appendChild(popup);

    let timer = 10;
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
