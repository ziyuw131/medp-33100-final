document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#post_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted');

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
    

    const songs = document.querySelectorAll('.song');
    songs.forEach(song => {
        const commentsForm = song.querySelector('.comments_form');
        commentsForm.addEventListener('submit', (e) => {
            // e.preventDefault();
            console.log('submitted');
    
            const formData = new FormData(commentsForm);
    
            const formDataObject = {
                songID: song.id,
                content: formData.get('content'),
                authorID: '675b554ed8f2c5f28005c51c'
            };
    
            console.log(formDataObject);
    
            fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            })
        })
    })
});