import './style.css';
import displayCurrent from './modules/display-current';
import displayDaily from './modules/display-daily';
import displayHourly from './modules/display-hourly';

const searchInput = document.querySelector('#location-input');
const searchButton = document.querySelector('#location-search');
const hourlyList = document.querySelector('.hourly ul');
const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');
const todayButton = document.querySelector('.today');
const tomorrowButton = document.querySelector('.tomorrow');
const afterTomorrowButton = document.querySelector('.after-tomorrow');
const toggleTempScale = document.querySelector('.toggle-temp');
let isCelsius = true;
let weather;

async function getWeather(location) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=29527e538ac34f9482314537232912&q=${location}&days=3`,
  );
  weather = await data.json();

  displayCurrent(isCelsius, weather);
  displayDaily(isCelsius, weather);
  displayHourly(isCelsius, weather.forecast.forecastday[0].hour);

  function selectDay(event) {
    const selected = document.querySelector('.selected');

    if (selected) selected.classList.toggle('selected');

    event.target.classList.toggle('selected');

    displayHourly(
      isCelsius,
      weather.forecast.forecastday[event.target.dataset.index].hour,
    );
  }

  todayButton.addEventListener('click', selectDay);
  tomorrowButton.addEventListener('click', selectDay);
  afterTomorrowButton.addEventListener('click', selectDay);
}

window.addEventListener('load', getWeather('moscow'));

searchButton.addEventListener('click', () => {
  if (searchInput.value) getWeather(searchInput.value);
  searchInput.value = '';
});

searchInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') searchButton.click();
});

scrollLeftButton.addEventListener('click', () => {
  hourlyList.scrollBy({
    top: 0,
    left: -500,
    behavior: 'smooth',
  });
});

scrollRightButton.addEventListener('click', () => {
  hourlyList.scrollBy({
    top: 0,
    left: 500,
    behavior: 'smooth',
  });
});

toggleTempScale.addEventListener('click', () => {
  const selected = document.querySelector('.selected');

  if (isCelsius) {
    isCelsius = false;
    toggleTempScale.innerHTML = 'Display &deg;C';
  } else {
    isCelsius = true;
    toggleTempScale.innerHTML = 'Display &deg;F';
  }

  displayCurrent(isCelsius, weather);
  displayDaily(isCelsius, weather);
  displayHourly(
    isCelsius,
    weather.forecast.forecastday[selected.dataset.index].hour,
  );
});
