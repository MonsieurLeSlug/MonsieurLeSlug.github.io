function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function getRandomInt(max) { // number between 1 & max
  return ( Math.floor(Math.random() * Math.floor(max)) ) + 1;
}

function populateEditForm(sqr) {
  sqr.classList.add('editing');

  antiTamper = document.getElementById('antitamper');
  editForm = document.getElementById('editform');
  editImg = document.getElementById('editimg');
  editText = document.getElementById('edittext');
  inputText = document.getElementById('inputtext');
  inputURL = document.getElementById('inputurl');

  antiTamper.classList.add('unhide');
  editForm.classList.add('unhide');
  editImg.src = sqr.getElementsByClassName('img')[0].src;
  inputURL.value = sqr.getElementsByClassName('img')[0].src;
  editText.innerText = sqr.getElementsByClassName('text')[0].innerText;
  inputText.value = sqr.getElementsByClassName('text')[0].innerText;
}

function saveEditForm(sqr) {
  sqr.classList.remove('editing');
  editImg = document.getElementById('editimg');
  editText = document.getElementById('edittext');
  id = sqr.id;
  newImg = editImg.src;
  newText = editText.innerText;

  sqr.getElementsByClassName('img')[0].src = newImg;
  sqr.getElementsByClassName('text')[0].innerText = newText;
  saveSquare(id, newImg, newText);
}

function saveSquare(id, img, text) {
  if (img.startsWith('blob:')) return;
  img = encodeURIComponent(img);
  text = encodeURIComponent(text);
  sqrs = localStorage.getItem('F1Bingo');

  sqrs = (sqrs)
    ? JSON.parse(sqrs)
    : {};

  if (sqrs[id]) {
    sqrs[id].img = img;
    sqrs[id].text = text;
  } else {
    sqrs[id] = {'img': img, 'text': text};
  }
  sqrs = JSON.stringify(sqrs);

  localStorage.setItem('F1Bingo', sqrs);
}

function switchCorrect(sqr) {
  id = sqr.id;
  cl = sqr.classList;
  if (cl.contains('correct')) { cl.remove('correct'); cl.add('maybe'); correct = 'maybe'; }
  else if (cl.contains('maybe')) { cl.remove('maybe'); cl.add('false'); correct = 'false'; }
  else if (cl.contains('false')) { cl.remove('false'); correct = ''; }
  else { cl.add('correct'); correct = 'correct'; }

  img = encodeURIComponent(sqr.getElementsByClassName('img')[0].src);
  text = encodeURIComponent(sqr.getElementsByClassName('text')[0].innerText);
  sqrs = localStorage.getItem('F1Bingo');

  sqrs = (sqrs)
    ? JSON.parse(sqrs)
    : {};

  if (sqrs[id] && sqrs[id][correct]) {
    sqrs[id].correct = correct;
  } else {
    sqrs[id] = {'img': img, 'text': text, 'correct': correct};
  }
  sqrs = JSON.stringify(sqrs);

  localStorage.setItem('F1Bingo', sqrs);
}

function imageUpload() {
  const file = this.files[0];
  if (!file.type.startsWith('image/')) { return; }

  img = document.getElementById('editimg');
  img.file = file;

  const reader = new FileReader();
  reader.onload = (e) => { img.src = e.target.result; };
  reader.readAsDataURL(file);
}

function changeEditText() {
  document.getElementById('edittext').innerText = this.value;
}

function changeInputURL() {
  if (this.value && this.value != '') {
    document.getElementById('editimg').src = this.value;
  } else {
    document.getElementById('editimg').src = './img/goatifi.png';
  }
}

function loadFromStorage() {
  sqrs = localStorage.getItem('F1Bingo');
  if (!sqrs) return;

  sqrs = JSON.parse(sqrs);
  console.log(sqrs);
  for (const id of Object.keys(sqrs)) {
    data = sqrs[id];
    img = (data.img) ? decodeURIComponent(data.img) : './img/goatifi.png';
    text = (data.text) ? decodeURIComponent(data.text) : '';
    correct = (data.correct) ? decodeURIComponent(data.correct) : '';
    if (sqr = document.getElementById(id)) {
      sqr.getElementsByClassName('img')[0].src = img;
      sqr.getElementsByClassName('text')[0].innerText = text;
      if (correct && correct != '') sqr.classList.add(correct);
    }
  }
}

function convertToBlob(img) {
  if (img.src.startsWith('file://')) return;
   fetch(img.src)
   .then(function (response) {
      return response.blob();
   })
   .then(function (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      img.src = url;
   });
};

docReady(function() {
  loadFromStorage();

  let imgs = document.getElementsByClassName('img');
  for (let img of imgs) {
    if (img.src == '') img.src = './img/goatifi.png';
  }

  var sqrs = document.getElementsByClassName('square');
  for (i = 0; i < sqrs.length; i++) {
    var sqr = sqrs[i];
    sqr.onclick = function() {
      if (document.getElementById('sheet').classList.contains('edit')) {
        populateEditForm(this);
      } else {
        switchCorrect(this);
      }
    }
  }

  document.getElementById('edit').onclick = function() {
    document.getElementById('sheet').classList.toggle('edit');
    document.getElementById('edit').classList.toggle('edit');
  }

  document.getElementById('export').onclick = function() {
    sqrs = localStorage.getItem('F1Bingo');
    if (sqrs) {
      navigator.clipboard.writeText(sqrs);
      alert('Save data copied to clipboard');
    } else alert('Could not find save data');
  }

  document.getElementById('import').onclick = function() {
    document.getElementById('importbox').classList.add('unhide');
    document.getElementById('antitamper').classList.add('unhide');
  }

  document.getElementById('closeall').onclick = function() {
    let elems = document.getElementsByClassName('unhide');
    let arr = [];
    for (let elem of elems) arr.push(elem);
    for (let elem of arr) elem.classList.remove('unhide'); // Don't ask
    if (editing = document.getElementsByClassName('editing')[0]) editing.classList.remove('editing');
  }

  const editImgEl = document.getElementById('inputurl');
  editImgEl.addEventListener('input', changeInputURL, false);

  const editTextEl = document.getElementById('inputtext');
  editTextEl.addEventListener('input', changeEditText, false);

  document.getElementById('editcancel').onclick = function() {
    document.getElementById('antitamper').classList.remove('unhide');
    document.getElementById('editform').classList.remove('unhide');
    document.getElementsByClassName('editing')[0].classList.remove('editing');
  }

  document.getElementById('editsave').onclick = function() {
    document.getElementById('antitamper').classList.remove('unhide');
    document.getElementById('editform').classList.remove('unhide');
    saveEditForm(document.getElementsByClassName('editing')[0]);
  }

  document.getElementById('importcancel').onclick = function() {
    document.getElementById('antitamper').classList.remove('unhide');
    document.getElementById('importbox').classList.remove('unhide');
  }

  document.getElementById('importsave').onclick = function() {
    savedata = document.getElementById('importtext').value;
    localStorage.setItem('F1Bingo', savedata);
    document.getElementById('antitamper').classList.remove('unhide');
    document.getElementById('importbox').classList.remove('unhide');
    alert('Imported data');
    loadFromStorage();
  }

  document.getElementById('screenshot').onclick = function() {
    let elems = document.getElementById('sheet').getElementsByClassName('img');
    for (let elem of elems) convertToBlob(elem);

    setTimeout(function() {
      html2canvas(document.querySelector('#sheet'), {backgroundColor: 'null'}).then(canvas => {
        document.getElementById('screenshotbox').innerHTML = '';
        document.getElementById('screenshotbox').appendChild(canvas);
        document.getElementById('antitamper').classList.add('unhide');
        document.getElementById('screenshotbox').classList.add('unhide');
      });
    }, 100); // Wait for all images to be converted
  }
});