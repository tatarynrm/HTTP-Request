let searchInput = document.getElementById('search');
let btn = document.getElementById('searchBtn');

btn.onclick = (e) => {
    e.preventDefault();
    let value = searchInput.value;
    const xhr = new XMLHttpRequest();
    const URL = `https://www.omdbapi.com/?&s=${value}&plot=full&apikey=98da37e5`
    xhr.open('GET', URL);
    xhr.send();
    xhr.onreadystatechange = function() {
        let films = document.querySelector('.films');
        console.log(xhr.responseText);
        let data = JSON.parse(this.responseText);
        console.log(data.Search);
        data.Search.forEach(el => {
            films.innerHTML += `            
            <div class="film">
            <img src="${el.Poster}" alt="">
            <p class="title">${el.Title}</p>
            <p class="type">${el.Type}</p>
            <p class="yeaar">${el.Year}</p>
            <button data-id="${el.imdbID}" class ="film-btn">More Details</button>
        </div>`
        });
    }
    document.body.clear();
}

let popup = document.getElementById('popup');
popup.onclick = () => {
    popup.style.display = 'none';
}

const more = document.getElementsByClassName('.film-btn');
const area = document.getElementById('container');
area.onclick = function(e) {
    if (e.target.classList.contains('film-btn')) {
        let target = e.target;
        console.dir(target);
        let movieId = e.target.dataset.id;
        const xhr = new XMLHttpRequest();
        const URL = `http://www.omdbapi.com/?i=${movieId}&apikey=98da37e5`;
        xhr.open('GET', URL);
        xhr.send();
        xhr.onreadystatechange = function() {
            let data = JSON.parse(this.responseText);
            console.log(data);
            popup.style.display = 'block';
            popup.innerHTML = `
                <div class="popup-content">
                <div class="popup-poster">
                    <img src="${data.Poster}" alt="">
                </div>
                <div class="popup-info">
                    <h2 class="popup-title">${data.Title}</h2>
                    <p class="popup-ratings">Ratings:${data.Ratings[0].Value}</p>
                    <hr>
                    <p class="popup-desc">Опис: ${data.Plot}</p>
                </div>
            </div>
                `
        }
    }

}



// For notes
// Actors: "Sarah Jessica Parker, Kim Cattrall, Kristin Davis"
// Awards: "Won 7 Primetime Emmys. 48 wins & 166 nominations total"
// Country: "United States"
// Director: "N/A"
// Genre: "Comedy, Drama, Romance"
// Language: "English"
// Metascore: "N/A"
// Plot: "Four female New Yorkers gossip about their sex lives (or lack thereof) and find new ways to deal with being a woman in the late 1990s."
// Poster: "https://m.media-amazon.com/images/M/MV5BNGEyNDRjM2QtY2VlYy00OWRhLWI4N2UtZTM4NDc0MGM0YzBkXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg"
// Rated: "TV-MA"
// Ratings: [{…}]
// Released: "06 Jun 1998"
// Response: "True"
// Runtime: "30 min"
// Title: "Sex and the City"
// Type: "series"
// Writer: "Darren Star"
// Year: "1998–2004"
// imdbID: "tt0159206"
// imdbRating: "7.2"
// imdbVotes: "119,974"
// totalSeasons: "6"
//