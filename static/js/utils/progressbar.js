// Animate Progress Bar
export function animateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  let i = 0;
  while (i < 100) {
    progressBar.style.width = `${i}%`;
    progressBar.setAttribute("aria-valuenow", i);
    i++;
  }
}
export function resetProgressBar() {
  progressBar.style.width = 0;
  progressBar.setAttribute("aria-valuenow", 0);
}
