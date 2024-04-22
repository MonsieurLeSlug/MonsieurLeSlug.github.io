function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  document.getElementById('menu_openclose').onclick = function() {
    document.getElementById('menu_container').classList.toggle('show');
    if (document.getElementById('menu_container').classList.contains('show')) {
      document.getElementById('menu_openclose').innerText = '✕';
    } else {
      document.getElementById('menu_openclose').innerText = '☰';
    }
  }

  const parallax = document.getElementById("parallax");
  if (window.innerWidth > window.innerHeight) {
    const html = document.querySelector("html");
    html.addEventListener("mousemove", (e) => {
      let moveX = e.clientX / -50;
      parallax.style.backgroundPositionX = moveX + "px";
    });
  } else {
    parallax.classList.add('disabled');
  }

  window.addEventListener('resize', function(event) {
    if (window.innerWidth > window.innerHeight) {
      parallax.classList.remove('disabled');
    } else {
      parallax.classList.add('disabled');
    }
  }, true);
})