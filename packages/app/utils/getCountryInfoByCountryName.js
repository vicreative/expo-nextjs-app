import axios from 'axios';

const getCountryInfoByCountryName = async countryName => {
  const data = await axios
    .get(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.data);

  return data;
};

export default getCountryInfoByCountryName;
