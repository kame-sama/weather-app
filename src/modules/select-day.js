export default function toggleSelected(event) {
  const selected = document.querySelector('.selected');

  if (selected) selected.classList.toggle('selected');

  event.target.classList.toggle('selected');
}
