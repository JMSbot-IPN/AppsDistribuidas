import axios from 'axios';

const fetchDataFromApi = async (API_KEY) => {
  try {
    const response = await axios.get('http://localhost:5000/recurso_protegido', {
      headers: {
        'API-Key': API_KEY
      }
    });

    if (response.data.Auth === 'Success') {
      return 'Success';
    } else {
      return 'Fail';
    }
  } catch (error) {
    console.error(error);
    return 'Fail';
  }
};

export default fetchDataFromApi;