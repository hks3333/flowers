document.addEventListener('DOMContentLoaded', function() {

    const audio = new Audio('starry night.mp3');
    audio.loop = true;

    const strt = document.getElementById("startbutton");
    strt.addEventListener('click', function() {
        audio.play();
        document.getElementById('starter').style.display = 'none';
        document.getElementById('container').classList.remove('hidden');
    });





    const PROJECT = 'all';
    const API_URL = 'https://my-api.plantnet.org/v2/identify/' + PROJECT;

    const API_KEY = '2b10QAoQhFCUiI9YSnliKcm0fu';

    const identify = async () => {
        const fileInput = document.getElementById('picture');
        const images = fileInput.files;
        if (images.length === 0) {
            console.error('choose a file');
            return false;
        }

        const form = new FormData();
        for (let i = 0; i < images.length; i += 1) {
            form.append('organs', 'auto');
            form.append('images', images[i]);
        }

        const url = new URL(API_URL);
        url.searchParams.append('include-related-images', 'true'); // try false
        url.searchParams.append('api-key', API_KEY);

        fetch(url.toString(), {
            method: 'POST',
            body: form,
        })
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((r) => {
                    document.getElementById('results').innerHTML = JSON.stringify(r);
                })
                .catch(console.error);
            } else {
                const resp = `status: ${response.status} (${response.statusText})`;
                document.getElementById('results').innerHTML = resp;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };


    const form = document.getElementById('myform');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        identify();
    });


});