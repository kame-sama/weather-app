import getDayIcon from './get-day-icon';
import getNightIcon from './get-night-icon';

export default function displayHourly(isCelsius, hours) {
  const list = document.querySelector('.hourly ul');
  list.textContent = '';

  hours.forEach((hour) => {
    const item = document.createElement('li');
    const time = document.createElement('div');
    const icon = document.createElement('div');
    const temperature = document.createElement('div');

    time.classList.add('hour');
    time.innerHTML = hour.time.slice(11);
    icon.classList.add('icon');
    icon.innerHTML = hour.isDay
      ? getDayIcon(hour.condition.code)
      : getNightIcon(hour.condition.code);
    temperature.classList.add('temp');
    temperature.innerHTML = isCelsius
      ? `${hour.temp_c}&deg;C`
      : `${hour.temp_f}&deg;F`;

    item.replaceChildren(time, icon, temperature);
    list.appendChild(item);
  });

  list.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
