import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_S0tToHB0XVcBSipW02Ka6WJKt8YHUR4WSsbnCoSMNsa8rt7qwe5cg9aSZNOV6d35";
 export const fetchBreeds = () => {
  document.body.classList.add("loading-select-on");
    return axios.get('https://api.thecatapi.com/v1/breeds') 
  .then((response) => {
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  })
  .finally(() => {
    document.body.classList.remove("loading-select-on");
    document.body.classList.add("loading-select-off");
  })
 }