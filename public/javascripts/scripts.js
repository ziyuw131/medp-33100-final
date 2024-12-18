document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#post_form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted');

        const formData = new FormData(form);

        const formDataObject = {
            song: formData.get('song'),
            memory: formData.get('memory'),
            authorID: '675b554ed8f2c5f28005c51c'
        };

        console.log(formDataObject);

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
});