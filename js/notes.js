document.addEventListener('DOMContentLoaded', () => {
    const currentVideoId = videoPlayer.src;
    updateNotesList(currentVideoId);
    updateViewsDisplay();
});

const notesContainer = document.querySelector('.notes-container');
const addNoteBtn = document.querySelector('.add-note-btn');

// Function to update the view count of a specific video
const updateVideoViews = (videoId) => {
    const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
    views[videoId] = (views[videoId] || 0) + 1;
    localStorage.setItem('videoViews', JSON.stringify(views));
    return views[videoId];
};

// Function to update the display of views for all videos
const updateViewsDisplay = () => {
    const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
    playlistItems.forEach(item => {
        const videoId = item.getAttribute('data-video');
        const viewCount = views[videoId] || 0;

        let viewsCount = item.querySelector('.views-count');
        if (!viewsCount) {
            viewsCount = document.createElement('div');
            viewsCount.className = 'views-count';
            item.querySelector('.video-details').appendChild(viewsCount);
        }
        viewsCount.innerHTML = `<i class="fas fa-eye"></i> ${viewCount} views`;
    });
};

// Save and load notes for each video
const saveNotes = (videoId, notes) => {
    const allNotes = JSON.parse(localStorage.getItem('videoNotes') || '{}');
    allNotes[videoId] = notes;
    localStorage.setItem('videoNotes', JSON.stringify(allNotes));
};

const loadNotes = (videoId) => {
    const allNotes = JSON.parse(localStorage.getItem('videoNotes') || '{}');
    return allNotes[videoId] || [];
};

// Create note card
const createNoteCard = (note, videoId, index) => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
        <div class="note-header">
            <span class="note-timestamp">${note.timestamp}</span>
            <div class="note-actions">
                <i class="fas fa-pencil-alt edit-note"></i>
                <i class="fas fa-trash-alt delete-note"></i>
            </div>
        </div>
        <div class="note-content">${note.content}</div>
    `;

    card.querySelector('.delete-note').onclick = () => {
        const notes = loadNotes(videoId);
        notes.splice(index, 1);
        saveNotes(videoId, notes);
        updateNotesList(videoId);
    };

    card.querySelector('.edit-note').onclick = () => {
        const content = card.querySelector('.note-content');
        const originalText = content.textContent;
        content.innerHTML = `
            <textarea class="note-textarea">${originalText}</textarea>
            <button class="save-edit">Save</button>
        `;

        const saveEdit = content.querySelector('.save-edit');
        saveEdit.onclick = () => {
            const newText = content.querySelector('textarea').value;
            const notes = loadNotes(videoId);
            notes[index].content = newText;
            saveNotes(videoId, notes);
            updateNotesList(videoId);
        };
    };

    return card;
};

// Update the notes list for a video
const updateNotesList = (videoId) => {
    notesContainer.innerHTML = '';
    const notes = loadNotes(videoId);
    notes.forEach((note, index) => {
        notesContainer.appendChild(createNoteCard(note, videoId, index));
    });
};

// Add a new note
addNoteBtn.addEventListener('click', () => {
    const videoId = videoPlayer.src;
    const noteInput = document.createElement('div');
    noteInput.className = 'note-card';
    noteInput.innerHTML = `
        <textarea class="note-textarea" placeholder="Enter your note..."></textarea>
        <button class="save-note">Save Note</button>
    `;

    noteInput.querySelector('.save-note').onclick = () => {
        const content = noteInput.querySelector('textarea').value;
        if (content.trim()) {
            const notes = loadNotes(videoId);
            notes.push({
                content,
                timestamp: new Date().toLocaleString()
            });
            saveNotes(videoId, notes);
            updateNotesList(videoId);
            noteInput.remove();
        }
    };

    notesContainer.insertBefore(noteInput, notesContainer.firstChild);
});

// Handle playlist item click
playlistItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video');

        // Update view count for the selected video
        updateVideoViews(videoId);
        updateViewsDisplay();

        // Save the current notes before switching videos
        if (videoPlayer.src) {
            const currentNotes = document.querySelectorAll('.note-content');
            const savedNotes = [];
            currentNotes.forEach(note => {
                savedNotes.push({
                    content: note.textContent,
                    timestamp: note.parentElement.querySelector('.note-timestamp').textContent
                });
            });
            saveNotes(videoPlayer.src, savedNotes);
        }

        // Update the notes list for the selected video
        updateNotesList(videoId);
    });
});
