async function getFirebaseConfig() {
    const response = await fetch("https://netplex.streamhdmovie1.workers.dev");
    return response.json();
}

getFirebaseConfig().then(config => {
    import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js").then(({ initializeApp }) => {
        const app = initializeApp(config);
        console.log("Firebase initialized securely!");
    });
});
