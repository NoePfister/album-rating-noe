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

                <div class="cover-placeholder">
                    <p>Album Cover wird später hinzugefügt</p>
                </div>

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
// Navigation
// ------------------------------------------------------------

// Reviews funktioniert bereits.
reviewsButton.addEventListener("click", () => {
    showPage(reviewsPage, reviewsButton);
    loadReviews();
});

albumsButton.addEventListener("click", () => {
    showPage(albumsPage, albumsButton);
});

usersButton.addEventListener("click", () => {
    showPage(usersPage, usersButton);
});


// ------------------------------------------------------------
// Applikation starten
// ------------------------------------------------------------

// Beim ersten Laden der Webseite werden nur die Reviews geladen.
loadReviews();
