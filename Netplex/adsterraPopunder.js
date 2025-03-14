// Set the popunder limit per day
const POPUNDER_LIMIT = 1;

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Get stored popunder data
function getPopunderData() {
    const data = localStorage.getItem('popunderData');
    return data ? JSON.parse(data) : { date: '', count: 0, lastMovieId: null, visitorIp: '' };
}

// Save popunder data
function setPopunderData(count, movieId, ip) {
    localStorage.setItem('popunderData', JSON.stringify({
        date: getTodayDate(),
        count: count,
        lastMovieId: movieId,
        visitorIp: ip
    }));
}

// Function to open the popunder window
function openPopunder() {
    const popunderUrl = 'https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5'; // Replace with your URL
    window.open(popunderUrl, '_blank', 'width=100,height=100');
}

// Function to trigger popunder when a new movie is fetched
function triggerPopunder(movieId) {
    fetch('https://api64.ipify.org?format=json') // Get visitor's IP
        .then(response => response.json())
        .then(data => {
            const visitorIp = data.ip;
            let popunderData = getPopunderData();

            // Reset if a new day has started
            if (popunderData.date !== getTodayDate()) {
                popunderData = { date: getTodayDate(), count: 0, lastMovieId: null, visitorIp: '' };
                setPopunderData(0, null, visitorIp);
            }

            // Trigger popunder only if the movie is new, the limit isn't reached, and it's a new visitor
            if (popunderData.count < POPUNDER_LIMIT && popunderData.lastMovieId !== movieId && popunderData.visitorIp !== visitorIp) {
                popunderData.count++;
                setPopunderData(popunderData.count, movieId, visitorIp);
                openPopunder();
            }
        })
        .catch(error => console.error('Error fetching IP:', error));
}
