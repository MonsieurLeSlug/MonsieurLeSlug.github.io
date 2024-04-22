function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function toggleDropdown(el) {
  let dropdown = el.parentNode.getElementsByClassName('dropdown')[0];
  dropdown.classList.toggle('unhide');
}

docReady(function() {
  let serie = document.getElementById('container').getElementsByClassName('series-info');
  for (i = 0; i < serie.length; i++) {
    var series = serie[i];
    series.onclick = function() {
      toggleDropdown(this);
    }
  }
})