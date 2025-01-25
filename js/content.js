const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const videoPlayer = document.querySelector(".video-player");
const playlistItems = document.querySelectorAll(".playlist-item");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.getAttribute("data-tab");
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Playlist functionality
playlistItems.forEach((item) => {
  item.addEventListener("click", () => {
    const videoSrc = item.getAttribute("data-video");
    const title = item.getAttribute("data-title");
    const description = item.getAttribute("data-description");

    // Update video source and play
    videoPlayer.src = videoSrc;
    videoPlayer.play();

    // Update video information
    document.querySelector(".video-title").textContent = title;
    document.querySelector(".video-info p").textContent = description;

    // Track progress for current video
    videoPlayer.ontimeupdate = () => {
      const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
      item.querySelector(".progress").style.width = `${progress}%`;
    };
  });
});

// Auto-play next video on completion
videoPlayer.addEventListener("ended", () => {
  const currentItem = Array.from(playlistItems).find(
    (item) => item.getAttribute("data-video") === videoPlayer.src
  );

  if (currentItem) {
    const nextItem = currentItem.nextElementSibling;
    if (nextItem && nextItem.classList.contains("playlist-item")) {
      nextItem.click();
    }
  }
});

// Video completion tracking
const updateVideoCompletion = () => {
  const completedVideos = JSON.parse(
    localStorage.getItem("completedVideos") || "{}"
  );

  playlistItems.forEach((item) => {
    const videoId = item.getAttribute("data-video");
    const checkbox = item.querySelector(".completion-checkbox");
    if (checkbox) {
      checkbox.checked = completedVideos[videoId] || false;

      // Mark progress as 100% for completed videos
      if (checkbox.checked) {
        const progressBar = item.querySelector(".progress");
        progressBar.style.width = "100%";
      }
    }
  });
};

playlistItems.forEach((item) => {
  const videoId = item.getAttribute("data-video");
  const checkbox = item.querySelector(".completion-checkbox");

  checkbox.addEventListener("change", (e) => {
    const completedVideos = JSON.parse(
      localStorage.getItem("completedVideos") || "{}"
    );

    // Update completed status in localStorage
    completedVideos[videoId] = e.target.checked;
    localStorage.setItem("completedVideos", JSON.stringify(completedVideos));

    // Set progress to 100% if marked as completed
    if (e.target.checked) {
      const progressBar = item.querySelector(".progress");
      progressBar.style.width = "100%";

      // Prevent the video from playing again when marking as completed
      if (videoPlayer.src === videoId) {
        videoPlayer.pause();
      }
    }
  });
});

// Initialize video completion on page load
updateVideoCompletion();

// Update completion when video ends
videoPlayer.addEventListener("ended", () => {
  const currentVideo = videoPlayer.src;
  const completedVideos = JSON.parse(
    localStorage.getItem("completedVideos") || "{}"
  );
  completedVideos[currentVideo] = true;
  localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
  updateVideoCompletion();
});
