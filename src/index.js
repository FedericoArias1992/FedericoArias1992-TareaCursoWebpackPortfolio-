//import Template from './templates/Template.js'; esto lo mejoramos con el alias del webpackconfig seccion resolve es la linea de abajo
import Template from '@templates/Template.js';
//import './styles/main.css';
import '@styles/main.css'; //la linea de arriba es igual a esa solo que de arriba no tenia el alias en webpack config
//import './styles/vars.styl';
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
