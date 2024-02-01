import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const URL ="https://pixabay.com/api";
const API_KEY = "42149629-e1e8d2a9238f015bc3d9ce966";

const refs = {
    form: document.getElementById("form"),
    resultContainer: document.getElementById("result-container"),
    loadingIndicator: document.querySelector(".loader")
};

refs.form.addEventListener("submit", handleSearch);  //лісенер на форму

function clearResultContainer() {
    refs.resultContainer.innerHTML = "";//div
}

function showLoadingIndicator() {
    refs.loadingIndicator.style.display = "block";//on lo
}

function hideLoadingIndicator() {
    refs.loadingIndicator.style.display = "none";//off lo
}


function handleSearch(event) {  // отримуємо дані з інпуту
    event.preventDefault();
    const form = event.currentTarget;
    const requestForSearch = form.elements.search.value;

    clearResultContainer();
    showLoadingIndicator();//


    if (requestForSearch.trim().length === 0){
            iziToast.show({
                message: "Please, try again!",
                color: "red"
            });
            hideLoadingIndicator(); //крутялка
            return;
        }
    clearResultContainer();// контейнер
    showLoadingIndicator()// крутялка


    searchPictures(requestForSearch).then((data) =>{

        const pictures = data.hits;

        if (pictures.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
        } else {
            let markup = ""
            for (const pic of pictures) {
                markup +=createPicturesMarkup(pic);
            }    
        refs.resultContainer.innerHTML = markup;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        hideLoadingIndicator(); //крутялка
        form.reset();
        
    });
}


function searchPictures(requestForSearch) {
    return fetch(`${URL}/?key=${API_KEY}&q=${requestForSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`).then(
        (res) => {
            if (!res.ok){
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            return res.json();
        }
    );
}


function createPicturesMarkup({likes, views, comments, downloads, tags, webformatURL, largeImageURL}) {
    return `<li class="image-container">
        <a class="gallery-link" href="${largeImageURL}">
         <img
           class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
         />
        </a>
        <div class="overlay">
        <p>likes<br>${likes}</p>
        <p>views<br>${views}</p>
        <p>comments<br>${comments}</p>
        <p>downloads<br>${downloads}</p></div>
    </li>
`
}

const lightbox = new SimpleLightbox(".gallery a", {  
    captionsData: "alt", 
    captionDelay: 250,
  });