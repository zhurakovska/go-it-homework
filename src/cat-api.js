import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_S0tToHB0XVcBSipW02Ka6WJKt8YHUR4WSsbnCoSMNsa8rt7qwe5cg9aSZNOV6d35";
const bodyClassList = document.body.classList;
 export const fetchBreeds = () => {
  bodyClassList.add("loading-select-on");
    return axios.get('https://api.thecatapi.com/v1/breeds') 
  .then((response) => {
    if (!response.status) {
      throw new Error(response.status);
    }
    return response.data;
  })
  .finally(() => {
    bodyClassList.remove("loading-select-on");
    bodyClassList.add("loading-select-off");
  })
 }