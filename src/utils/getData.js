//const API = 'https://randomuser.me/api/'; - Esta linea de código la pasamos a Avariable de entorno Capitulo 12
const API = process.env.API;  //Es una variable de entorno que esta en el archivo .env

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;