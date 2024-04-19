const wishlist = []

async function searchMovie() {
    const movieNameInput = document.getElementById('movieNameInput');
    const movieName = movieNameInput.value.trim();
    const searchResultContainer = document.getElementById('searchResultContainer')

    try {
        const response = await fetch('movies.json'); // Fetch local JSON file
        const data = await response.json();

        const filteredMovies = data.filter(movie =>
            movie.movie.toLowerCase().includes(movieName.toLowerCase())
        );

        if (filteredMovies.length > 0) {
            const movieHTML = filteredMovies.map(foundMovie => `
                <div class="movieItem">
                    <img src="${foundMovie.image}" alt="${foundMovie.movie}">
                    <h4>${foundMovie.movie}</h4>
                    <p>Rating: ${foundMovie.rating}</p>
                    <div class="buttons">
                        <button onclick="addToWishList('${foundMovie.movie}', '${foundMovie.image}')">Add to wishlist</button>
                        <button id="_more"><a href="${foundMovie.imdb_url}" target="_blank">More</a></button>
                    </div>
                </div>
            `).join('');
            searchResultContainer.innerHTML = movieHTML;
        } else {
            searchResultContainer.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultContainer.innerHTML = '<p>Error fetching data.</p>';
    }
}

function addToFavourites(movie, image){
    const movieDetails = {
        movie:movie,
        "image":image
    }
    wishlist.push(movieDetails)
    alert("Added " + movieDetails.movie + " to wishlist")
}