// Set the popunder limit per day
const POPUNDER_LIMIT = 3;

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Check if the popunder count is stored for today
function getPopunderData() {
  const popunderData = localStorage.getItem('popunderData');
  if (popunderData) {
    return JSON.parse(popunderData);
  }
  return { date: '', count: 0 };
}

// Set the popunder count and today's date
function setPopunderData(count) {
  const popunderData = { date: getTodayDate(), count: count };
  localStorage.setItem('popunderData', JSON.stringify(popunderData));
}

// Function to open the popunder window
function openPopunder() {
  const popunderUrl = 'https://acceptguide.com/w6gnwauzb?key=4d8f595f0136eea4d9e6431d88f478b5'; // Replace with your desired URL
  window.open(popunderUrl, '_blank', 'width=100,height=100');
}

// Event listener for clicks anywhere on the document
document.addEventListener('click', function() {
  let popunderData = getPopunderData();

  // If the date has changed, reset the popunder count for today
  if (popunderData.date !== getTodayDate()) {
    popunderData = { date: getTodayDate(), count: 0 };
    setPopunderData(0);
  }

  if (popunderData.count < POPUNDER_LIMIT) {
    // Increment the popunder count and save it
    popunderData.count++;
    setPopunderData(popunderData.count);

    // Open the popunder
    openPopunder();
  }
});
