const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const updateNavigationButtons = () => {
    const currentVideo = Array.from(playlistItems).findIndex(
        item => item.getAttribute('data-video') === videoPlayer.src
    );
    
    prevBtn.disabled = currentVideo === 0;
    nextBtn.disabled = currentVideo === playlistItems.length - 1;
};

prevBtn.addEventListener('click', () => {
    const currentIndex = Array.from(playlistItems).findIndex(
        item => item.getAttribute('data-video') === videoPlayer.src
    );
    if (currentIndex > 0) {
        playlistItems[currentIndex - 1].click();
    }
});

nextBtn.addEventListener('click', () => {
    const currentIndex = Array.from(playlistItems).findIndex(
        item => item.getAttribute('data-video') === videoPlayer.src
    );
    if (currentIndex < playlistItems.length - 1) {
        playlistItems[currentIndex + 1].click();
    }
});

// Update button states on video change
playlistItems.forEach(item => {
    item.addEventListener('click', updateNavigationButtons);
});

// Initialize button states
updateNavigationButtons();