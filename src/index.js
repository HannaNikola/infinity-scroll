
import axios from 'axios';

const conteinerElements = document.querySelector('.js-movie-list');

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
    const api_key = 'a2883c737e33341efae828fe3a93a67d';
    // page = currentPage;

async function searchMovie(currentPage = '1') {
  const options = {
    params: {
      api_key: 'a2883c737e33341efae828fe3a93a67d',
      page: currentPage,
    },
  };
  try {
    const response = await axios.get(BASE_URL, options);
    //   console.log(response);
      const dataResult = response.data.results;
      console.log(response.data.results);
      conteinerElements.insertAdjacentHTML(
        'beforeend',createMurcup(dataResult)
      );
  } catch (error) {
    console.log(error);
  }
}

searchMovie(2);

 
function createMurcup(arr) {
    return arr
      .map(({ poster_path, release_date, original_title, vote_average }) => {
        return `<li class="movie-card">
        <img src="${
          poster_path
            ? 'https://image.tmdb.org/t/p/w300' + poster_path
            : 'https://example.com/default-poster.jpg' 
        }" alt="${original_title || 'Unknown Title'}">
        <div class="movie-info">
            <h2>${original_title || 'Unknown Title'}</h2>
            <p>Release Date: ${release_date || 'Unknown Date'}</p>
            <p>Vote Average: ${vote_average || 'Unknown Vote'}</p>
        </div>
    </li>`;
      })
      .join('');
}