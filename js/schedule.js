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

function toggleSpoiler(el) {
  let spoiler = el.parentNode;
  spoiler.classList.toggle('spoiled');
}

docReady(function() {
  let serie = document.getElementById('container').getElementsByClassName('series-info');
  for (i = 0; i < serie.length; i++) {
    var series = serie[i];
    series.onclick = function() {
      toggleDropdown(this);
    }
  }

  let spoilerToggles = document.getElementById('container').getElementsByClassName('spoiler-toggle');
  for (i = 0; i < spoilerToggles.length; i++) {
    var spoilerToggle = spoilerToggles[i];
    spoilerToggle.onclick = function() {
      toggleSpoiler(this);
    }
  }

  let dropdowns = document.getElementsByClassName('dropdown');
  for (i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i];
    dropdown.parentNode.getElementsByClassName('series-info')[0].classList.add('has-dropdown');
  }
})