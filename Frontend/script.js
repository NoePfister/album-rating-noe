// ------------------------------------------------------------
// HTML-Elemente lokalisieren
// ------------------------------------------------------------

const reviewsButton = document.querySelector("#reviews-button");
const albumsButton = document.querySelector("#albums-button");
const usersButton = document.querySelector("#users-button");

const reviewsPage = document.querySelector("#reviews-page");
const albumsPage = document.querySelector("#albums-page");
const usersPage = document.querySelector("#users-page");

const reviewsList = document.querySelector("#reviews-list");
const albumsList = document.querySelector("#albums-list");
const usersList = document.querySelector("#users-list");

let allAlbums = []; // Variable, um alle Alben zu speichern
const albumSearchInput = document.querySelector("#album-search");


// ------------------------------------------------------------
// Hilfsfunktionen
// ------------------------------------------------------------

function createStars(rating) {
    const roundedRating = Math.round(rating);

    const fullStars = "★".repeat(roundedRating);
    const emptyStars = "☆".repeat(5 - roundedRating);

    return fullStars + emptyStars;
}


function showPage(pageToShow, activeButton) {
    // Zuerst werden alle Seiten verborgen.
    reviewsPage.classList.add("hidden");
    albumsPage.classList.add("hidden");
    usersPage.classList.add("hidden");

    // Danach wird nur die gewünschte Seite angezeigt.
    pageToShow.classList.remove("hidden");

    // Gleiche Idee für die Navigationsbuttons:
    reviewsButton.classList.remove("active");
    albumsButton.classList.remove("active");
    usersButton.classList.remove("active");

    activeButton.classList.add("active");
}


// ------------------------------------------------------------
// Reviews laden
// ------------------------------------------------------------

async function loadReviews() {
    const response = await fetch("/api/reviews/latest");
    const reviews = await response.json();

    reviewsList.innerHTML = "";

    for (const review of reviews) {

        review.image_path = review.image_path;
        reviewsList.innerHTML += `
            <article class="review-card">

                <img class="album-cover" src="${review.image_path}" alt="Album Cover">

                <div class="review-content">
                    <p class="artist-name">${review.artist}</p>
                    <h3 class="album-title">${review.album_title}</h3>

                    <div class="rating-row">
                        <span class="stars">${createStars(review.rating)}</span>
                        <span class="username">@${review.username}</span>
                    </div>

                    <p class="review-text">${review.review_text}</p>
                </div>

            </article>
        `;
    }
}

// ------------------------------------------------------------
// Users laden
// ------------------------------------------------------------

async function loadUsers() {
    const response = await fetch("/api/users");
    const users = await response.json();

    usersList.innerHTML = "";

    for (const user of users) {

        usersList.innerHTML += `
            <article class="user-card">
                <h3 class="username">@${user.username}</h3>
            </article>
        `;
    }
}   

// ------------------------------------------------------------
// Albums laden
// ------------------------------------------------------------

async function loadAlbums() {
    const response = await fetch("/api/albums");
    allAlbums = await response.json();

    displayAlbums(allAlbums);    
} 

function displayAlbums(albums) {
    albumsList.innerHTML = ""; 

    for (const album of albums) {

        albumsList.innerHTML += `
             <article class="review-card">

                <img class="album-cover" src="${album.image_path}" alt="Album Cover">

                <div class="review-content">
                    <p class="artist-name">${album.artist}</p>
                    <h3 class="album-title">${album.title}</h3>

                    <div class="rating-row">
                        <span class="stars">${createStars(album.average_rating)}</span>
                        <span>${album.average_rating} / 5</span>
                    </div>

                    

                    <p class="review-text">${album.release_date}</p>
                </div>

            </article>
        `;
    }

}

// ------------------------------------------------------------
// Album-Suche EventListener
// ------------------------------------------------------------

albumSearchInput.addEventListener("input", async () => {
    const searchTerm = albumSearchInput.value.trim();

    if (searchTerm === "") {
        displayAlbums(allAlbums);
        return;
    }

    if (allAlbums.length === 0) {
        await loadAlbums();
    }

    const albums = allAlbums.filter(album => 
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    displayAlbums(albums);
});




// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------

// Reviews funktioniert bereits.
reviewsButton.addEventListener("click", () => {
    showPage(reviewsPage, reviewsButton);
    loadReviews();
});

albumsButton.addEventListener("click", () => {
    showPage(albumsPage, albumsButton);
    loadAlbums();
});

usersButton.addEventListener("click", () => {
    showPage(usersPage, usersButton);
    loadUsers();
});


// ------------------------------------------------------------
// Applikation starten
// ------------------------------------------------------------

// Beim ersten Laden der Webseite werden nur die Reviews geladen.
loadReviews();
