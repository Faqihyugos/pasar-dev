const ALL_KONTEN = "https://api.pulo.dev/v1/contents";

const KONTEN_BY_MEDIA = "https://api.pulo.dev/v1/contents?media=";

const KONTEN_BY_TEXT = "https://api.pulo.dev/v1/contents?query=";

const main = document.getElementById("main");
const filter = document.getElementById("filter");
const jenisMedia = document.getElementsByTagName("option");
const cari = document.getElementById('cari');

//getKonten(ALL_KONTEN);
async function getKonten(url) {
    console.log(getKonten())
    const response = await fetch(url);
    const data = await response.json();
    displayKonten(data.data);
}

cari.addEventListener("submit", (e) =>{
    e.preventDefault();
    const filterText = filter.value;
    const mediaText = jenisMedia.value;
    if (filterText && filterText !== "") {
        getKonten(KONTEN_BY_TEXT + filterText);
        filterText="";
    }else if (mediaText && mediaText !== ""){
        getKonten( KONTEN_BY_MEDIA + mediaText)
        mediaText="";
    }else if (filterText !== "" && mediaText !== "") {
        getKonten(KONTEN_BY_TEXT + filterText +"&&"+ KONTEN_BY_MEDIA + mediaText);
        mediaText="";
        filterText="";
    }else {
        window.location.reload();
    }
});

function displayKonten(kontens) {
    main.innerHTML = "";
    Array.from(kontens).forEach(konten => {
        const { title, body, url, media, contributor, thumbnail } = konten;
        const kontenDiv = document.createElement("div");
        kontenDiv.classList.add("col");
        kontenDiv.innerHTML = `
        <div class="card h-100 shadow-sm">
        <span class="badge bg-info text-dark position-absolute top-0 start-20">${media}</span>
        <img src="${getThumb(thumbnail,media)}" class="card-img-top " width="100%" alt="thumbnail">
        <div class="card-body">
            <h5 class="card-title"><a target="_blank" href="${url}">${title}</a></h5>
            <h6> Contributor : ${contributor}</h6>
            <p class="card-text">${body<20}</p>
        </div>
        </div>
        `;
        main.appendChild(kontenDiv);
    })
}

function getThumb(img, media){
    switch (img) {
        case null:
            if(media === "video") {
                return '/images/video.jpg';
            } else if(media === "web"){
                return '/images/website.jpg';
            } else if(media === "tulisan"){
                return '/images/Tulisan.jpg';
            } else if(media === "podcast"){
                return'/images/podcast.jpg';
            }
            break;
        default:
            return img;

    }
}



