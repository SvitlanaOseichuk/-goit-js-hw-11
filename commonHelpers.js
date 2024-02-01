import{i as c}from"./assets/vendor-4d6948b9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const l="https://pixabay.com/api",u="42149629-e1e8d2a9238f015bc3d9ce966",a={form:document.getElementById("form"),resultContainer:document.getElementById("result-container")};a.form.addEventListener("submit",d);function d(o){o.preventDefault();const r=o.currentTarget,i=r.elements.search.value;if(r.elements.search.value.length===0){c.show({message:"Sorry, there are no images matching your search query. Please, try again!",color:"red"});return}f(),p(i).then(n=>{const e=n.hits;let t="";for(const s of e)t+=h(s);a.resultContainer.innerHTML=t}).finally(()=>{m(),r.reset()})}function f(){document.getElementById("loading-indicator").style.display="block"}function m(){document.getElementById("loading-indicator").style.display="none"}function p(o){return fetch(`${l}?key=${u}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`).then(r=>{if(!r.ok)throw new Error(`Network response was not ok: ${response.statusText}`);return r.json()})}function h({likes:o,views:r,comments:i,downloads:n,webformatURL:e,largeImageURL:t}){return`<li>
        <a class="gallery-link" href="${t}">
         <img
           class="gallery-image"
           src="${e}"
         />
        </a>
        <p>like ${o}</p>
        <p>viewsc ${r}</p>
        <p>comments ${i}</p>
        <p>downloads ${n}</p>
    </li>
`}
//# sourceMappingURL=commonHelpers.js.map
