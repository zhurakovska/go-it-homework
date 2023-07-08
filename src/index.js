import axios from "axios";
import { fetchBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.getElementById('selectElement');
const imageWrapper = document.getElementById('image-wrapper');
const loaderElement = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then((data) => {
    const options = data.map(({ id, name }) => ({
        text: name,                        
        value: id 
    }));

    const slim = new SlimSelect({ 
        select: selectEl, 
        data: [{ text: 'Choose a cat breed', value: '' }, ...options], 
        settings: { 
            placeholderText: 'Выберите опцию', 
            searchPlaceholder: 'Поиск', 
            searchText: 'Не нашел', 
            searchingText: 'Ищу...', 
        },
        events: {  
            beforeChange: (newVal) => {
                const id = newVal[0].value; 
                if (id) { 
                    document.body.classList.remove("loading-info-off");
                    document.body.classList.add("loading-info-on");
                    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`) 
                    .then((response) => response.data)
                    .then((el) => { 
                        const url = el[0].url;
                        createElements(el);
                    }).finally(() => {
                        document.body.classList.remove("loading-info-on");
                        document.body.classList.add("loading-info-off");
                    });
                }
            },
        },
    });
    const values = slim.getSelected();
}).catch((error) => {
    console.log(error);
})

const createElements = (elements) => {
    if (elements && elements.length > 0) {
        const url = elements[0].url;
        const description = elements[0].breeds[0].description;
        const name = elements[0].breeds[0].name;
        const temperament = elements[0].breeds[0].temperament;

        imageWrapper.innerHTML = `
            <div class="item-img" style="background-image: url(${url});"></div>
            <h1 class="item-title">${name}</h1>
            <div class="item-temperament">Temperament: ${temperament}</div>
            <div class="item-description">${description}</div>
        `;
    }
};