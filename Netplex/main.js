<!-- LEAVE A COMMENT START -->
<script type="module">
    import { firebaseConfig } from "./config.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

    // Firebase configuration (Replace with your Firebase project details)
    const firebaseConfig = {
      apiKey: window.env.FIREBASE_API_KEY,
      authDomain: window.env.FIREBASE_AUTH_DOMAIN,
      projectId: window.env.FIREBASE_PROJECT_ID,
      storageBucket: window.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: window.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: window.env.FIREBASE_APP_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Firebase initialized successfully!");

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
  if (!movieId) {
    console.error("Movie ID not found!");
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
    await addDoc(collection(db, "comments", movieId, "userComments"), {
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
  if (!movieId) {
    console.error("Movie ID not found!");
    return;
  }

  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = "<p>Loading comments...</p>";

  try {
    const q = query(collection(db, "comments", movieId, "userComments"), orderBy("timestamp", "desc"));
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
<!-- LEAVE A COMMENT END -->
