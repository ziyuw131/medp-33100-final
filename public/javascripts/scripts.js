document.addEventListener('DOMContentLoaded', () => {
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
