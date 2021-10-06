import './css/styles.css';
import debounce from 'lodash/debounce';
/* import _ from 'lodash/debounce'; */
const DEBOUNCE_DELAY = 300;

let id = null;
const f = debounce(() => {
  id = setInterval(() => {
    console.log('a');
  }, 500);
}, 2000);
console.log('start');
f();
clearInterval(id);
const id2 = setTimeout(() => {
  clearInterval(id);
  console.log('end');
}, 4000);
