document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Menampilkan preview gambar
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
            document.getElementById('preview-image').style.display = 'block'; // Menampilkan gambar preview
        };
        reader.readAsDataURL(file);

        // Menampilkan animasi loading
        document.getElementById('loading').style.display = 'block';

        // Mengirim file gambar ke API dan mendapatkan respons
        getRoastingResponse(file).then(responseText => {
            document.getElementById('loading').style.display = 'none'; // Menyembunyikan animasi loading
            document.getElementById('response').textContent = responseText; // Menampilkan respons roasting
        }).catch(error => {
            document.getElementById('loading').style.display = 'none'; // Menyembunyikan animasi loading jika terjadi error
            document.getElementById('response').textContent = 'Error occurred: ' + error.message; // Menampilkan pesan error
        });
    }
});

async function getRoastingResponse(file) {
    const formData = new FormData();
    formData.append('image', file);

    // Mengambil respons dari API Gemini
    const responseTextGemini = await fetch('/api/gemini', {
        method: 'POST',
        body: formData
    }).then(res => res.text());

    // Mengambil respons dari API GroqCloud
    const responseTextGroq = await fetch('/api/groqcloud', {
        method: 'POST',
        body: formData
    }).then(res => res.text());

    // Mengembalikan respons yang tersedia
    return responseTextGemini || responseTextGroq || "No roasting response available.";
}

// script.js

document.addEventListener('DOMContentLoaded', function () {
    const typewriterText = document.getElementById('typewriter-text');
    const text1 = "Roast-ink";
    const text2 = "roast your suck ink";

    function typeText(text, element, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function eraseText(element, callback) {
        let index = element.innerHTML.length;
        function erase() {
            if (index > 0) {
                element.innerHTML = element.innerHTML.substring(0, index - 1);
                index--;
                setTimeout(erase, 50);
            } else {
                if (callback) callback();
            }
        }
        erase();
    }

    function animateText() {
        typeText(text1, typewriterText, function() {
            setTimeout(function() {
                eraseText(typewriterText, function() {
                    typewriterText.classList.add('highlight');
                    typeText(text2, typewriterText);
                });
            }, 1000);
        });
    }

    animateText();
});

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
            document.getElementById('preview-image').style.display = 'block'; // Menampilkan gambar preview
        };
        reader.readAsDataURL(file);

        // Menampilkan animasi loading
        document.getElementById('loading').style.display = 'block';

        // Mengirim file gambar ke API dan mendapatkan respons
        getRoastingResponse(file).then(responseText => {
            document.getElementById('loading').style.display = 'none'; // Menyembunyikan animasi loading
            document.getElementById('response').textContent = responseText; // Menampilkan respons roasting
        }).catch(error => {
            document.getElementById('loading').style.display = 'none'; // Menyembunyikan animasi loading jika terjadi error
            document.getElementById('response').textContent = 'Error occurred: ' + error.message; // Menampilkan pesan error
        });
    }
});

async function getRoastingResponse(imageData) {
    try {
        const responseTextGemini = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Roast this artwork", image: imageData })
        }).then(res => res.text());

        const responseTextGroq = await fetch('/api/groqcloud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Roast this artwork", image: imageData })
        }).then(res => res.text());

        return responseTextGemini || responseTextGroq || "maaf, server sok sibuk, coba lagi nanti"; "Kena limit token kek nya"
    } catch (error) {
        console.error('Error occurred:', error);
        return "Failed to fetch response.";
    }
}
