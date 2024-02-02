import{i as c,S as f}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="https://pixabay.com/api",p="42149629-e1e8d2a9238f015bc3d9ce966",s={form:document.getElementById("form"),resultContainer:document.getElementById("result-container"),loadingIndicator:document.querySelector(".loader")};s.form.addEventListener("submit",g);function l(){s.resultContainer.innerHTML=""}function u(){s.loadingIndicator.style.display="block"}function d(){s.loadingIndicator.style.display="none"}function g(n){n.preventDefault();const r=n.currentTarget,a=r.elements.search.value;if(l(),u(),a.trim().length===0){c.show({message:"Please, try again!",color:"red"}),d();return}l(),u(),h(a).then(o=>{const e=o.hits;if(e.length===0)c.show({message:"Sorry, there are no images matching your search query. Please try again!"});else{let t="";for(const i of e)t+=y(i);s.resultContainer.innerHTML=t,new f(".image-container a",{captionsData:"alt",captionDelay:250})}}).catch(o=>{console.error("Error:",o)}).finally(()=>{d(),r.reset()})}function h(n){return fetch(`${m}/?key=${p}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`).then(r=>{if(!r.ok)throw new Error(`Network response was not ok: ${r.statusText}`);return r.json()})}function y({likes:n,views:r,comments:a,downloads:o,tags:e,webformatURL:t,largeImageURL:i}){return`<li class="image-container">
        <a class="gallery-link" href="${i}">
         <img
           class="gallery-image"
           src="${t}"
           alt="${e}"
         />
        </a>
        <div class="overlay">
        <p>likes<br>${n}</p>
        <p>views<br>${r}</p>
        <p>comments<br>${a}</p>
        <p>downloads<br>${o}</p></div>
    </li>
`}
//# sourceMappingURL=commonHelpers.js.map
