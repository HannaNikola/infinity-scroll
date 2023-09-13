
import axios from 'axios';

const conteinerElements = document.querySelector('.js-movie-list');
const guardElements = document.querySelector('.js-guard');

const defaults = {
  poster: "https://www.reelviews.net/resources/img/default_poster.jpg",
  date: "XXXX-XX-XX",
  title: "Title not found",
  vote: "XX.XX",
};

let page = 1;
let totalPage = 498;
let dataResult = [];

let options = {
  root: null,
  rootMargin: '300px',
//   threshold: 1.0,
};

let observer = new IntersectionObserver(handlerLoad, options);


const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
    const api_key = 'a2883c737e33341efae828fe3a93a67d';
    

async function searchMovie(currentPage = '1') {
  const options = {
    params: {
      api_key: 'a2883c737e33341efae828fe3a93a67d',
      page: currentPage,
    },
  };
  try {
    const response = await axios.get(BASE_URL, options);
      console.log(response);
      const dataResult = response.data.results;
    
      
     conteinerElements.insertAdjacentHTML( 'beforeend', createMurcup(dataResult));
      
      if (response.data.page < response.data.total_pages) {
        observer.observe(guardElements);
      } 
      
  } catch (error) {
    console.log(error);
  }
}

searchMovie();

 
function createMurcup(arr) {
    return arr
      .map(({ poster_path, release_date, original_title, vote_average }) => {
        return `<li class="movie-card">
        <img class= "img-movie" src="${
          poster_path
            ? 'https://image.tmdb.org/t/p/w300' + poster_path
            : 'https://example.com/default-poster.jpg'
        }" alt="${original_title || 'Unknown Title'}">
        <div class="movie-info">
            <h2 >${original_title || 'Unknown Title'}</h2>
            <p>Release Date: ${release_date || 'Unknown Date'}</p>
            <p>Vote Average: ${vote_average || 'Unknown Vote'}</p>
        </div>
    </li>`;
      })
      .join('');
}

function handlerLoad(entries) {
    entries.forEach(entry => {
         console.log(entry)
        if (entry.isIntersecting) {
            page += 1;
            searchMovie(page);
            if (response.data.page >= response.data.total_pages) {
        observer.unobserve(guardElements);
      }
           
        }
        
     });
}

