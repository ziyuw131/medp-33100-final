document.addEventListener('DOMContentLoaded', () => {

    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    introScreen.addEventListener("click", () => {
        introScreen.style.display = "none"; // Hide the intro screen
        mainContent.style.display = "block"; // Show the main content
    });
    
    const openPopupButton = document.getElementById("open-popup");
    const popupModal = document.getElementById("popup-modal");
    const closePopupButton = document.getElementById("close-popup");

    openPopupButton.addEventListener("click", () => {
        popupModal.classList.add("visible");
    });

    closePopupButton.addEventListener("click", () => {
        popupModal.classList.remove("visible");
    });

    // Filtering functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.getAttribute('data-tag'); // Get the filter type
            sortSongs(filterType); // Apply the sorting
        });
    });

    // Function to sort songs
    function sortSongs(filterType) {
        const songContainer = document.getElementById('song-container'); // Define songContainer

        const songs = Array.from(songContainer.querySelectorAll('.card')); // Convert NodeList to Array

        if (filterType === 'rock') {
            // Sort alphabetically (A-Z)
            songs.sort((a, b) => {
                const titleA = a.querySelector('.song').innerText.toLowerCase();
                const titleB = b.querySelector('.song').innerText.toLowerCase();
                return titleA.localeCompare(titleB);
            });
        } else if (filterType === 'chill') {
            // Sort reverse alphabetically (Z-A)
            songs.sort((a, b) => {
                const titleA = a.querySelector('.song').innerText.toLowerCase();
                const titleB = b.querySelector('.song').innerText.toLowerCase();
                return titleB.localeCompare(titleA);
            });
        }

        // Clear the container and reattach the sorted elements
        songContainer.innerHTML = '';
        songs.forEach(song => songContainer.appendChild(song));
    }

    document.querySelector('#post_form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const form = e.target;
        const formData = new FormData(form);

        const formDataObject = {
            song: formData.get('song'),
            image_url: formData.get('image_url'),
            memory: formData.get('memory'),
            authorID: '675b554ed8f2c5f28005c51c'
        };

        console.log('Form Data:', formDataObject);

        fetch('/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })

    document.querySelectorAll('.card').forEach(song => {
        song.querySelector('.comments_form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Comment submitted');

            const form = e.target;
            const formData = new FormData(form);

            const formDataObject = {
                songID: song.id,
                content: formData.get('content'),
                authorID: '675b554ed8f2c5f28005c51c'
            };

            console.log('Comment Data:', formDataObject);

            fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });
        });

        song.querySelector('.edit_button')?.addEventListener('click', () => {
            const memory = song.querySelector('.memory');
            const memoryInput = document.createElement('input');
            memoryInput.value = memory.innerText;
            memoryInput.name = 'memory';
            memoryInput.classList.add('memory_input');

            memory.innerHTML = '';
            memory.appendChild(memoryInput);

            const saveButton = document.createElement('button');
            saveButton.classList.add('save_button');
            saveButton.innerText = 'Save';

            saveButton.addEventListener('click', async () => {
                const newValue = memoryInput.value;

                const updatedSong = {
                    memory: newValue,
                    songID: song.id,
                };

                console.log(updatedSong);
                await updateSong(updatedSong);

                memory.innerHTML = '';
                const updatedParagraphEl = document.createElement('p');
                updatedParagraphEl.innerText = newValue;
                memory.appendChild(updatedParagraphEl);

                saveButton.remove();
            });

            song.appendChild(saveButton);
        })

        const deleteButton = song.querySelector('.delete_button');
        deleteButton.addEventListener('click', async () => {
            deleteSong(song.id);
        })
    })
});

async function updateSong(updatedSong) {
    fetch('/songs', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSong)
    })
}


async function deleteSong(songID) {
    fetch('/songs/' + songID, {
        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(updatedSong)
    })
}