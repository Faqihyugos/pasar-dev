
const ALL_KONTEN = "https://api.pulo.dev/v1/contents";
const KONTEN_BY_MEDIA = "https://api.pulo.dev/v1/contents?media=";
const KONTEN_BY_TEXT = "https://api.pulo.dev/v1/contents?query=";

fetchData(ALL_KONTEN);
// button
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    let inputKey = document.querySelector('.input-keyword').value;
    let inputSelect = document.querySelector('.input-select').value;
    console.log(inputKey);
    console.log(inputSelect);
    if (inputKey !== "" && inputSelect !== "Semua Media") {
        console.log(`${KONTEN_BY_TEXT}${inputKey}&&media=${inputSelect}`);
        fetchData(`${KONTEN_BY_TEXT}${inputKey}&&media=${inputSelect}`);
        inputKey = '';
        inputSelect = 'semua media';
    } else if (inputKey !== "" && inputKey) {
        console.log(`${KONTEN_BY_TEXT}${inputKey}`);
        fetchData(`${KONTEN_BY_TEXT}${inputKey}`);
        inputKey = '';
    } else if (inputSelect !== "Semua Media" && inputSelect) {
        console.log(`${KONTEN_BY_MEDIA}${inputSelect}`);
        fetchData(`${KONTEN_BY_MEDIA}${inputSelect}`);
        inputSelect = '';
    }  else {
        fetchData(ALL_KONTEN);
        window.location.reload();
    }
});

// fecth
function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
            const kontens = response.data;
            let cards = '';
            kontens.forEach(async m => cards += showCard(m));
            const cardContainer = document.querySelector('.data-container');
            cardContainer.innerHTML = cards;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function showCard(m) {
    return `
    <div class="col">
        <div class="card h-100 shadow-sm">
            <span class="badge bg-info text-dark position-absolute top-0 start-20">${m.media}</span>
            <img src="${getThumb(m.thumbnail, m.media)}" class="card-img-top" alt="thumbnail">
            <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <h6> Contributor : ${m.contributor}</h6>
                <a target="_blank" href="${m.url}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
    `;
}

function getThumb(img, media) {
    switch (img) {
        case null && "":
            if (media === "video") {
                return './images/video.jpg';
            } else if (media === "web") {
                return './images/website.jpg';
            } else if (media === "tulisan") {
                return './images/Tulisan.jpg';
            } else if (media === "podcast") {
                return './images/podcast.jpg';
            }
            break;
        case img == "https://space.dailycode.id/profile":
            return './images/website.jpg';
        default:
            return img;
    }
}