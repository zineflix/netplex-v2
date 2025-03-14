<div id="leaveCommentMessage">
    Please leave a comment
  </div>

  <div id="commentForm">
    <input type="text" id="username" placeholder="Enter Username">
    <textarea id="commentText" placeholder="Write a comment..."></textarea>
    
    <div id="avatarSelection">
      <p>Select your avatar:</p>
      <div id="avatarContainer"></div>
      <img id="avatarPreview" src="https://example.com/profile1.jpg" alt="Selected Avatar">
    </div>

    <button onclick="submitComment()">Post Comment</button>
  </div>

  <div id="commentsContainer"></div> 

  
<!-- LEAVE A COMMENT START -->
<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

    // Firebase configuration (Replace with your Firebase project details)
    const firebaseConfig = {
      apiKey: "AIzaSyB3hd4278XIZ86TAgR9UetC1Qa5M8KswlQ",
      authDomain: "mynetplex-9fbbf.firebaseapp.com",
      projectId: "mynetplex-9fbbf",
      storageBucket: "mynetplex-9fbbf.firebasestorage.app",
      messagingSenderId: "1028305253119",
      appId: "1:1028305253119:web:ee07ea2678b046271152ca"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Array of profile picture URLs
    const profilePictures = [
      "https://avatar.iran.liara.run/public/1",
      "https://avatar.iran.liara.run/public/2",
      "https://avatar.iran.liara.run/public/3",
      "https://avatar.iran.liara.run/public/37",
      "https://avatar.iran.liara.run/public/45",
      "https://avatar.iran.liara.run/public/38",
      "https://avatar.iran.liara.run/public/24",
      "https://avatar.iran.liara.run/public/73",
      "https://avatar.iran.liara.run/public/56",
      "https://avatar.iran.liara.run/public/58",
      "https://avatar.iran.liara.run/public/77",
      "https://avatar.iran.liara.run/public/95",
      "https://avatar.iran.liara.run/public/68",
      "https://avatar.iran.liara.run/public/90"
    ];

    let selectedAvatar = profilePictures[0]; // Default avatar

    // Function to display available avatars
    function displayAvatars() {
      const avatarContainer = document.getElementById('avatarContainer');
      avatarContainer.innerHTML = ""; // Clear existing avatars

      profilePictures.forEach((url) => {
        const avatarImg = document.createElement('img');
        avatarImg.src = url;
        avatarImg.alt = "Avatar";
        avatarImg.classList.add('avatar');
        
        // Highlight the default selected avatar
        if (url === selectedAvatar) {
          avatarImg.classList.add('selected-avatar');
        }

        avatarImg.onclick = () => selectAvatar(url, avatarImg);
        avatarContainer.appendChild(avatarImg);
      });
    }

    // Function to select an avatar
    function selectAvatar(avatar, selectedElement) {
      selectedAvatar = avatar;
      const avatarPreview = document.getElementById('avatarPreview');
      avatarPreview.src = avatar; // Update the preview image

      // Remove highlight from previous selection
      document.querySelectorAll('.avatar').forEach(img => img.classList.remove('selected-avatar'));
      selectedElement.classList.add('selected-avatar'); // Highlight new selection

      // Hide "SELECTED AVATAR" text if it exists
      const selectedText = document.getElementById("selectedAvatarText");
      if (selectedText) {
        selectedText.style.display = "none";
      }
    }

    // Submit a new comment
    async function submitComment() {
  if (!tvShowId) {
    console.error("TV Shows ID not found!");
    return;
  }

  const username = document.getElementById('username').value.trim();
  const commentText = document.getElementById('commentText').value.trim();

  if (!username || !commentText) {
    alert("Please enter your name and a comment.");
    return;
  }

  const profilePicture = selectedAvatar; // Assuming you have selectedAvatar defined

  try {
    await addDoc(collection(db, "comments", tvShowId, "userComments"), {
      text: commentText,
      user: username,
      timestamp: serverTimestamp(),
      likeCount: 0,
      profilePicture: profilePicture
    });

    console.log("Comment added successfully.");
    document.getElementById('commentText').value = ''; // Clear input
    getComments(); // Refresh comments
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}


    // Fetch and display comments
    async function getComments() {
  if (!tvShowId) {
    console.error("TV Shows ID not found!");
    return;
  }

  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = "<p>Loading comments...</p>";

  try {
    const q = query(collection(db, "comments", tvShowId, "userComments"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    commentsContainer.innerHTML = ""; // Clear previous comments
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <div class="commentHeader">
          <img src="${data.profilePicture || 'https://example.com/default-profile.jpg'}" class="profilePicture">
          <strong>${data.user}</strong>
          <div class="timestamp">${data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString() : "Just now"}</div>
        </div>
        <p>${data.text}</p>
      `;

      commentsContainer.appendChild(commentElement);
    });

  } catch (error) {
    console.error("Error fetching comments:", error);
    commentsContainer.innerHTML = "<p>Error loading comments.</p>";
  }
}


    // Fetch comments and display avatars when the page loads
    window.onload = () => {
      getComments();
      displayAvatars(); // Display available avatars on page load
    };

    // Expose functions to global scope
    window.submitComment = submitComment;
  </script>
