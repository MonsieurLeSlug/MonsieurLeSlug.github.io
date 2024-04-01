function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function populateTeam(rank) {
  if (!document.getElementById('player1').classList.contains('set')) {
    player = document.getElementById('player1');
    document.getElementById('tr1').innerText = rank.getElementsByClassName('worth')[0].innerText;
    document.getElementById('ri1').innerText = rank.getAttribute('title');
  } else if (!document.getElementById('player2').classList.contains('set')) {
    player = document.getElementById('player2');
    document.getElementById('tr2').innerText = rank.getElementsByClassName('worth')[0].innerText;
    document.getElementById('ri2').innerText = rank.getAttribute('title');
  } else if (!document.getElementById('player3').classList.contains('set')) {
    player = document.getElementById('player3');
    document.getElementById('tr3').innerText = rank.getElementsByClassName('worth')[0].innerText;
    document.getElementById('ri3').innerText = rank.getAttribute('title');
  } else if (!document.getElementById('player4').classList.contains('set')) {
    player = document.getElementById('player4');
    document.getElementById('tr4').innerText = rank.getElementsByClassName('worth')[0].innerText;
    document.getElementById('ri4').innerText = rank.getAttribute('title');
  } else {
    player = document.getElementById('player5');
    document.getElementById('tr5').innerText = rank.getElementsByClassName('worth')[0].innerText;
    document.getElementById('ri5').innerText = rank.getAttribute('title');
  }

  player.classList.add('set');
  player.getElementsByClassName('img')[0].src = rank.getElementsByClassName('img')[0].src;
  player.getElementsByClassName('text')[0].innerText = rank.getElementsByClassName('text')[0].innerText;
  player.setAttribute('title', rank.getAttribute('title'));

  if (document.getElementById('player1').classList.contains('set') &&
      document.getElementById('player2').classList.contains('set') &&
      document.getElementById('player3').classList.contains('set') &&
      document.getElementById('player4').classList.contains('set') &&
      document.getElementById('player5').classList.contains('set')) {
    document.getElementById('team').classList.add('full');
    document.getElementById('ranks').classList.add('full');
  }
  calculateRankTotal();
}

function calculateRankTotal() {
  let total = 0;
  let teamRanks = document.getElementById('team_ranks').getElementsByClassName('tr');
  for (i = 0; i < teamRanks.length; i++) {
    var teamRank = teamRanks[i];
    if (teamRank.innerText) {
      total += Number(teamRank.innerText);
    }
  }

  if (total > 0) {
    document.getElementById('ri_total').innerText = `Total: ${total}pts`;
  } else {
    document.getElementById('ri_total').innerText = '';
  }

  if (total > 100) {
    document.getElementById('team').classList.add('failed');
  } else if (total != 0) {
    document.getElementById('team').classList.add('passed');
  }
}

function clearPlayer(player) {
  let team = document.getElementById('team');
  team.classList.remove('passed');
  team.classList.remove('failed');
  team.classList.remove('full');
  document.getElementById('ranks').classList.remove('full');
  player.classList.remove('set');
  player.getElementsByClassName('img')[0].src = './img/ranks/unranked.png';
  player.getElementsByClassName('text')[0].innerText = '';
  player.setAttribute('title', '');
  if (player.id == 'player1') {
    document.getElementById('tr1').innerText = '';
    document.getElementById('ri1').innerText = '';
  } else if (player.id == 'player2') {
    document.getElementById('tr2').innerText = '';
    document.getElementById('ri2').innerText = '';
  } else if (player.id == 'player3') {
    document.getElementById('tr3').innerText = '';
    document.getElementById('ri3').innerText = '';
  } else if (player.id == 'player4') {
    document.getElementById('tr4').innerText = '';
    document.getElementById('ri4').innerText = '';
  } else {
    document.getElementById('tr5').innerText = '';
    document.getElementById('ri5').innerText = '';
  }
  calculateRankTotal();
}

docReady(function() {
  let ranks = document.getElementById('ranks').getElementsByClassName('square');
  for (i = 0; i < ranks.length; i++) {
    var rank = ranks[i];
    rank.onclick = function() {
      if (!document.getElementById('team').classList.contains('full')) populateTeam(this);
    }
  }

  let players = document.getElementById('team').getElementsByClassName('square');
  for (i = 0; i < players.length; i++) {
    var player = players[i];
    player.onclick = function() {
      clearPlayer(this);
    }
  }

  document.getElementById('reset').onclick = function() {
    clearPlayer(document.getElementById('player1'));
    clearPlayer(document.getElementById('player2'));
    clearPlayer(document.getElementById('player3'));
    clearPlayer(document.getElementById('player4'));
    clearPlayer(document.getElementById('player5'));
  }

  document.getElementById('screenshot').onclick = function() {
    document.getElementById('team').classList.add('noglow');
    let elems = document.getElementById('team').getElementsByClassName('img');

    document.getElementById('screenshotbox').innerHTML = '<span class="loadingnotice">Importing images...</span>';
    document.getElementById('antitamper').classList.add('unhide');
    document.getElementById('screenshotbox').classList.add('unhide');

    setTimeout(function() {
      html2canvas(document.querySelector('#team'), {
        backgroundColor: 'null'
      }).then(canvas => {
        document.getElementById('screenshotbox').innerHTML = '';
        document.getElementById('screenshotbox').appendChild(canvas);
        document.getElementById('team').classList.remove('noglow');
      });
    }, 10); // Wait for all images to be converted
  }

  document.getElementById('info').onclick = function() {
    document.getElementById('antitamper').classList.add('unhide');
    document.getElementById('infobox').classList.add('unhide');
  }

  document.getElementById('antitamper').onclick = function() {
    let elems = document.getElementsByClassName('unhide');
    let arr = [];
    for (let elem of elems) arr.push(elem);
    for (let elem of arr) elem.classList.remove('unhide'); // Don't ask
    if (editing = document.getElementsByClassName('editing')[0]) editing.classList.remove('editing');
  }

})