import { format } from 'date-fns';
import getDayIcon from './get-day-icon';
import getNightIcon from './get-night-icon';

export default function displayCurrent(isCelsius, weather) {
  const temperature = document.querySelector('.main-info .temp');
  const icon = document.querySelector('.main-info .weather-icon');
  const location = document.querySelector('.main-info .location');
  const date = document.querySelector('.main-info .date');
  const condition = document.querySelector('.main-info .condition');
  const feelsLike = document.querySelector('.extra-info .feels-like p');
  const humidity = document.querySelector('.extra-info .humidity p');
  const windSpeed = document.querySelector('.extra-info .wind-speed p');
  const windDir = document.querySelector('.extra-info .wind-dir p');

  temperature.innerHTML = isCelsius
    ? `${weather.current.temp_c}&deg;C`
    : `${weather.current.temp_f}&deg;F`;

  icon.innerHTML = weather.current.isDay
    ? getDayIcon(weather.current.condition.code)
    : getNightIcon(weather.current.condition.code);

  location.innerHTML = weather.location.name;

  date.innerHTML = format(weather.current.last_updated, 'ha MMM do');

  condition.innerHTML = weather.current.condition.text;

  feelsLike.innerHTML = isCelsius
    ? `${weather.current.feelslike_c}&deg;C`
    : `${weather.current.feelslike_f}&deg;F`;

  humidity.innerHTML = `${weather.current.humidity}%`;

  windSpeed.innerHTML = `${weather.current.wind_kph} km/h`;

  windDir.innerHTML = weather.current.wind_dir;
}
