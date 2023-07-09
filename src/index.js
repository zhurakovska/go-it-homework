import axios from "axios";
import { fetchBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectEl = document.getElementById('selectElement');
const imageWrapper = document.getElementById('image-wrapper');
const errorEl = document.querySelector('.error')
const bodyClassList = document.body.classList;

fetchBreeds().then((data) => {
    const options = data.map(({ id, name }) => ({
        text: name,                        
        value: id 
    }));

    const slim = new SlimSelect({ 
        select: selectEl, 
        data: [{ text: 'Choose a cat breed', value: '' }, ...options], 
        settings: { 
            placeholderText: 'Choose an option', 
            searchPlaceholder: 'Search', 
            searchText: 'Not found', 
            searchingText: 'Searching...', 
        },
        events: {  
            beforeChange: (newVal) => {
                const id = newVal[0].value; 
                if (id) { 
                    bodyClassList.remove("loading-info-off");
                    bodyClassList.add("loading-info-on");
                    errorEl.style.display = 'none'
                    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`) 
                    .then((response) => response.data)
                    .then((el) => { 
                        const url = el[0].url;
                        createElements(el);
                    }).catch(()=> {
                        imageWrapper.style.display = 'none'
                        errorEl.style.display = 'block'
                        Notiflix.Notify.failure('Error');
                    })
                    .finally(() => {
                        bodyClassList.remove("loading-info-on");
                        bodyClassList.add("loading-info-off");
                    });
                }
            },
        },
    });

}).catch(() => {
    errorEl.style.display = 'block';
    selectEl.style.display = 'none';
    Notiflix.Notify.failure('Error');
})

const createElements = (elements) => {
    if (elements && elements.length > 0) {
        const url = elements[0].url;
        const {description, name, temperament} = elements[0].breeds[0]
             imageWrapper.innerHTML = `
            <div class="item-img" style="background-image: url(${url});"></div>
            <h1 class="item-title">${name}</h1>
            <div class="item-temperament"><span class="item-span">Temperament:</span> ${temperament}</div>
            <div class="item-description">${description}</div>
        `;
    }
};