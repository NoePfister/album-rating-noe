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


// ------------------------------------------------------------
// Hilfsfunktionen
// ------------------------------------------------------------

function createStars(rating) {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);

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

    // Sehr hilfreich zum Untersuchen in den DevTools:
    console.log("Reviews vom Backend:", reviews);

    reviewsList.innerHTML = "";

    for (const review of reviews) {

        /*
            Das Cover ist ABSICHTLICH noch nicht eingebaut.
            In einer späteren Übung wird image_path vom Backend
            bis zu diesem HTML-Element verfolgt.
        */

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

async function loadUsers() {
    const response = await fetch("/api/users");
    const users = await response.json();

    // Sehr hilfreich zum Untersuchen in den DevTools:
    console.log("users vom Backend:", users);

    usersList.innerHTML = "";

    for (const user of users) {


        usersList.innerHTML += `
            <article class="user-card">

                <div>${user.username}</div>
                <div>ID: ${user.id}</div>
                


            </article>
        `;
    }

}

async function loadAlbums() {
    const response = await fetch("/api/albums");
    const albums = await response.json();

    // Sehr hilfreich zum Untersuchen in den DevTools:
    console.log("albums vom Backend:", albums);

    albumsList.innerHTML = "";

    for (const album of albums) {


        albumsList.innerHTML += `
            <article class="album-card">

            
                <img class="album-cover" src="${album.image_path}" alt="Album Cover">

            
            <div class="horiz">
            <div>
                <div class="album-title">${album.title}</div>
                <div class="album-artist">${album.artist}</div>
                <div class="stars">${createStars(album.average_rating)}</div>
            </div>
            <div class="release-date">Release: ${album.release_date}</div>
            </div>




            </article>
        `;
    }

}


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
