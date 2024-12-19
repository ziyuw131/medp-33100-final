document.addEventListener('DOMContentLoaded', () => {

    // Add Song Button
    const close = document.getElementById("close");
    const open = document.getElementById("open");
    const modal = document.getElementById("modal");

    open.addEventListener("click", () => modal.classList.add("show-modal"));
    close.addEventListener("click", () => modal.classList.remove("show-modal"));

    window.addEventListener("click", (e) => {
    e.target === modal ? modal.classList.remove("show-modal") : false;
    });

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
    

    const songs = document.querySelectorAll('.post');
    songs.forEach(post => {
        const commentsForm = post.querySelector('.comments_form');
        commentsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('submitted');
    
            const formData = new FormData(commentsForm);
    
            const formDataObject = {
                // songID: song.id,
                content: formData.get('content'),
                authorID: '675b554ed8f2c5f28005c51c'
            };
    
            console.log(formDataObject);
    
            // fetch('/comments', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formDataObject)
            // })
        })
    })
});