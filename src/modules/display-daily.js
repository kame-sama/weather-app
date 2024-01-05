import { format, isToday, isTomorrow } from 'date-fns';
import getDayIcon from './get-day-icon';

export default function displayDaily(isCelsius, weather) {
  const items = document.querySelectorAll('.day-menu ul > *');

  weather.forecast.forecastday.forEach((day, index) => {
    const date = document.createElement('div');
    const icon = document.createElement('div');
    const temperature = document.createElement('div');

    if (isToday(day.date)) {
      date.innerHTML = 'Today';
    } else if (isTomorrow(day.date)) {
      date.innerHTML = 'Tomorrow';
    } else {
      date.innerHTML = format(day.date, 'EEEE');
    }

    date.classList.add('date');

    icon.innerHTML = getDayIcon(day.day.condition.code);
    icon.classList.add('icon');

    temperature.innerHTML = isCelsius
      ? `${day.day.maxtemp_c}&deg;C / ${day.day.mintemp_c}&deg;C`
      : `${day.day.maxtemp_f}&deg;F / ${day.day.mintemp_f}&deg;F`;
    temperature.classList.add('temp');

    items[index].replaceChildren(date, icon, temperature);
  });
}
