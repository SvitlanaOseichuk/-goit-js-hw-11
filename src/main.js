import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const URL ="https://pixabay.com/api";
const API_KEY = "42149629-e1e8d2a9238f015bc3d9ce966";

const refs = {
    form: document.getElementById("form"),
    resultContainer: document.getElementById("result-container")
};

refs.form.addEventListener("submit", handleSearch);  //лісенер на форму

function handleSearch(event) {  // отримуємо дані з інпуту
    event.preventDefault();
    const form = event.currentTarget;
    const requestForSearch = form.elements.search.value;

    if (form.elements.search.value.length === 0){
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please, try again!",
                color: "red"
            });  
            return;
        }


        showLoadingIndicator(); // Відобразити індикатор завантаження перед запитом

    searchPictures(requestForSearch)
    .then((data) =>{
        const pictures = data.hits;

        let markup = ""
        for (const pic of pictures) {
            markup +=createPicturesMarkup(pic);
            // console.log(pic)
        }
        refs.resultContainer.innerHTML = markup;
        
    })
    
    .finally(() => {
        // Приховати індикатор завантаження після завершення запиту
        hideLoadingIndicator();
        form.reset();
    });
}

function showLoadingIndicator() {
    document.getElementById("loading-indicator").style.display = "block";
}

function hideLoadingIndicator() {
    document.getElementById("loading-indicator").style.display = "none";
}

function searchPictures(requestForSearch) {
    return fetch(`${URL}?key=${API_KEY}&q=${requestForSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`).then(
        (res) => {
            if (!res.ok){
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return res.json();
        }
    );
}


function createPicturesMarkup({likes, views, comments, downloads, webformatURL, largeImageURL}) {
    return `<li>
        <a class="gallery-link" href="${largeImageURL}">
         <img
           class="gallery-image"
           src="${webformatURL}"
         />
        </a>
        <p>like ${likes}</p>
        <p>viewsc ${views}</p>
        <p>comments ${comments}</p>
        <p>downloads ${downloads}</p>
    </li>
`
}

    








// let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function () {
// 	// Do something…
// });

// gallery.on('error.simplelightbox', function (e) {
// 	console.log(e); // Some usefull information
// });

// galery



// const images = [
//     {
//       preview:
//         "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
//       original:
//         "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
//       description: "Hokkaido Flower",
//     },
// ];

// const gallery = document.querySelector(".gallery"); 


// gallery.innerHTML = createMarkup(images);

// function createMarkup(images){
//   return images.map(({preview, original, description}) => 
//   `<li class="gallery-item">
//   <a class="gallery-link" href="${original}">
//     <im
//       class="gallery-image"
//       src="${preview}"
//       alt="${description}"
//     />
//   </a>
//   </li>`
//   )
// .join ("")
// }

// const lightbox = new SimpleLightbox(".gallery a", {  
//   captionsData: "alt", 
//   captionDelay: 250,
// }