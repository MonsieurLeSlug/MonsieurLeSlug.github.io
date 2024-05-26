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

function toggleSpoilers(id) {
  document.getElementById(id).classList.toggle('spoiled');
}

function populateResults() {
  let results = this.results;
  let teams = this.teams;
  for (const [week, weekInfo] of Object.entries(results)) {
    let weekDiv = document.getElementById(week);
    for (const [series, seriesInfo] of Object.entries(weekInfo)) {
      let seriesDiv = weekDiv.getElementsByClassName(series)[0];
      let team1 = teams[seriesInfo.team1];
      let team2 = teams[seriesInfo.team2];

      let seriesInfoDiv = document.createElement('div');
      seriesInfoDiv.classList.add('series-info');
      let dropdownDiv = document.createElement('table');
      dropdownDiv.classList.add('dropdown', 'hide');
      let tbody = document.createElement('tbody');
      tbody.classList.add('series_body');
      dropdownDiv.appendChild(tbody);

      seriesInfoDiv.innerHTML += `
        <div class="non-spoiler team team1"><img src="${team1.logo}" alt="${team1.name} logo"/><span class="team-name">${team1.name}</span></div>
        <div class="non-spoiler score"> - </div>
        <div class="non-spoiler team team2"><span class="team-name">${team2.name}</span><img src="${team2.logo}" alt="${team2.name} logo"/></div>`;

      if (seriesInfo.winner) {
        if (!seriesInfo.game1) { // Forfeit
          let team1win = (seriesInfo.team1 == seriesInfo.winner) ? 'winner' : '';
          let team2win = (seriesInfo.team2 == seriesInfo.winner) ? 'winner' : '';
          seriesInfoDiv.innerHTML += `
            <div class="spoiler team team1 ${team1win}"><img src="${team1.logo}" alt="${team1.name} logo"/><span class="team-name">${team1.name}</span></div>
            <div class="spoiler score">${seriesInfo.scoreTeam1} - ${seriesInfo.scoreTeam2}</div>
            <div class="spoiler team team2 ${team2win}"><span class="team-name">${team2.name}</span><img src="${team2.logo}" alt="${team2.name} logo"/></div>`;
        } else {
          seriesInfoDiv.classList.add('has-dropdown');
          let team1win = (seriesInfo.team1 == seriesInfo.winner) ? 'winner' : '';
          let team2win = (seriesInfo.team2 == seriesInfo.winner) ? 'winner' : '';
          seriesInfoDiv.innerHTML += `
            <div class="spoiler team team1 ${team1win}"><img src="${team1.logo}" alt="${team1.name} logo"/><span class="team-name">${team1.name}</span></div>
            <div class="spoiler score">${seriesInfo.scoreTeam1} - ${seriesInfo.scoreTeam2}</div>
            <div class="spoiler team team2 ${team2win}"><span class="team-name">${team2.name}</span><img src="${team2.logo}" alt="${team2.name} logo"/></div>`;

          let game1winner = teams[seriesInfo.game1.winner];
          let game2winner = teams[seriesInfo.game2.winner];
          let game1youtube = (seriesInfo.game1.youtube) ? `<a href="${seriesInfo.game1.youtube}" target="_blank"><img src="./img/icons/youtube.png" alt="YouTube logo"/></a>` : '';
          let game1twitch = (seriesInfo.game1.twitch) ? `<a href="${seriesInfo.game1.twitch}" target="_blank"><img src="./img/icons/twitch.png" alt="Twitch logo"/></a>` : '';
          let game2youtube = (seriesInfo.game2.youtube) ? `<a href="${seriesInfo.game2.youtube}" target="_blank"><img src="./img/icons/youtube.png" alt="YouTube logo"/></a>` : '';
          let game2twitch = (seriesInfo.game2.twitch) ? `<a href="${seriesInfo.game2.twitch}" target="_blank"><img src="./img/icons/twitch.png" alt="Twitch logo"/></a>` : '';

          tbody.innerHTML += `
            <tr class="non-spoiler game game1">
              <td class="whowon"><div class="team"><img src="./img/icons/dota.png" alt="Dota 2 logo"/><span class="team-name">Game 1</span></div></td>
              <td class="youtube">${game1youtube}</td>
              <td class="twitch">${game1twitch}</td>
              <td class="dotabuff"><a href="https://www.dotabuff.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
              <td class="opendota"><a href="https://www.opendota.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
              <td class="stratz"><a href="https://www.stratz.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
            </tr>
            <tr class="spoiler game game1">
              <td class="whowon"><div class="team"><img src="${game1winner.logo}" alt="${game1winner.name} logo"/><span class="team-name">${game1winner.name} victory</span></div></td>
              <td class="youtube">${game1youtube}</td>
              <td class="twitch">${game1twitch}</td>
              <td class="dotabuff"><a href="https://www.dotabuff.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
              <td class="opendota"><a href="https://www.opendota.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
              <td class="stratz"><a href="https://www.stratz.com/matches/${seriesInfo.game1.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
            </tr>
            <tr class="non-spoiler game game2">
              <td class="whowon"><div class="team"><img src="./img/icons/dota.png" alt="Dota 2 logo"/><span class="team-name">Game 2</span></div></td>
              <td class="youtube">${game2youtube}</td>
              <td class="twitch">${game2twitch}</td>
              <td class="dotabuff"><a href="https://www.dotabuff.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
              <td class="opendota"><a href="https://www.opendota.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
              <td class="stratz"><a href="https://www.stratz.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
            </tr>
            <tr class="spoiler game game2">
              <td class="whowon"><div class="team"><img src="${game2winner.logo}" alt="${game2winner.name} logo"/><span class="team-name">${game2winner.name} victory</span></div></td>
              <td class="youtube">${game2youtube}</td>
              <td class="twitch">${game2twitch}</td>
              <td class="dotabuff"><a href="https://www.dotabuff.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
              <td class="opendota"><a href="https://www.opendota.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
              <td class="stratz"><a href="https://www.stratz.com/matches/${seriesInfo.game2.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
            </tr>`;

          if (seriesInfo.game3) {
            let game3winner = teams[seriesInfo.game3.winner];
            let game3youtube = (seriesInfo.game3.youtube) ? `<a href="${seriesInfo.game3.youtube}" target="_blank"><img src="./img/icons/youtube.png" alt="YouTube logo"/></a>` : '';
            let game3twitch = (seriesInfo.game3.twitch) ? `<a href="${seriesInfo.game3.twitch}" target="_blank"><img src="./img/icons/twitch.png" alt="Twitch logo"/></a>` : '';

            tbody.innerHTML += `
              <tr class="non-spoiler game game3">
                <td class="whowon"><div class="team"><img src="./img/icons/dota.png" alt="Dota 2 logo"/><span class="team-name">Game 3</span></div></td>
                <td class="youtube">${game3youtube}</td>
                <td class="twitch">${game3twitch}</td>
                <td class="dotabuff"><a href="https://www.dotabuff.com/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
                <td class="opendota"><a href="https://www.opendota.com/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
                <td class="stratz"><a href="https://www.stratz.com/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
              </tr>
              <tr class="spoiler game game3">
                <td class="whowon"><div class="team"><img src="${game3winner.logo}" alt="${game3winner.name} logo"/><span class="team-name">${game3winner.name} victory</span></div></td>
                <td class="youtube">${game3youtube}</td>
                <td class="twitch">${game3twitch}</td>
                <td class="dotabuff"><a href="https://www.dotabuff.com/matches/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
                <td class="opendota"><a href="https://www.opendota.com/matches/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
                <td class="stratz"><a href="https://www.stratz.com/matches/${seriesInfo.game3.gameID}" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
              </tr>`;
          } else {
            let game3youtube = (seriesInfo.game2.youtube) ? `<a href="https://www.youtube.com/" target="_blank"><img src="./img/icons/youtube.png" alt="YouTube logo"/>` : '';
            let game3twitch = (seriesInfo.game2.twitch) ? `<a href="https://www.twitch.tv/" target="_blank"><img src="./img/icons/twitch.png" alt="Twitch logo"/></a>` : '';
            tbody.innerHTML += `
              <tr class="non-spoiler game">
                <td class="whowon"><div class="team"><img src="./img/icons/dota.png" alt="Dota 2 logo"/><span class="team-name">Game 3</span></div></td>
                <td class="youtube">${game3youtube}</a></td>
                <td class="twitch">${game3twitch}</td>
                <td class="dotabuff"><a href="https://www.dotabuff.com/" target="_blank"><img src="./img/icons/dotabuff.png" alt="Dotabuff logo"/></a></td>
                <td class="opendota"><a href="https://www.opendota.com/" target="_blank"><img src="./img/icons/opendota.png" alt="Opendota logo"/></a></td>
                <td class="stratz"><a href="https://www.stratz.com/" target="_blank"><img src="./img/icons/stratz.png" alt="Stratz logo"/></a></td>
              </tr>`;
          }
        }
      } else {
        seriesInfoDiv.innerHTML += `
          <div class="spoiler team team1"><img src="${team1.logo}" alt="${team1.name} logo"/><span class="team-name">${team1.name}</span></div>
          <div class="spoiler score"> - </div>
          <div class="spoiler team team2"><span class="team-name">${team2.name}</span><img src="${team2.logo}" alt="${team2.name} logo"/></div>`;
      }

      seriesDiv.appendChild(seriesInfoDiv);
      seriesDiv.appendChild(dropdownDiv);
    }
  }
}

docReady(function() {
  function offsetAnchor() {
    if (location.hash.length !== 0) window.scrollTo(window.scrollX, window.scrollY - 100);
  }
  const jump = document.getElementById('jump');
  jump.addEventListener('click', function() { window.setTimeout(offsetAnchor, 0); });
  window.setTimeout(offsetAnchor, 0);

  // Change #jump anchor based on current week
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  // This is horrible and needs to be changed but I'm tired as hell
  if (year > 2024 || month > 6 || (month === 6 && day > 2)) {
    jump.setAttribute('href', '#week7');
  } else if (month === 6 || (month === 5 && day > 26)) {
    jump.setAttribute('href', '#week6');
  } else if (month === 5 && day > 19) {
    jump.setAttribute('href', '#week5');
  } else if (month === 5 && day > 12) {
    jump.setAttribute('href', '#week4');
  } else if (month === 5 && day > 5) {
    jump.setAttribute('href', '#week3');
  } else if (month == 5 || (month === 4 && day > 28)) {
    jump.setAttribute('href', '#week2');
  } else if (month === 4 && day > 6) {
    jump.setAttribute('href', '#week1');
  }

  setTimeout(function() { // Wait for populateResults()
    let serie = document.getElementById('container').getElementsByClassName('series-info has-dropdown');
    for (i = 0; i < serie.length; i++) {
      var series = serie[i];
      series.onclick = function() {
        toggleDropdown(this);
      }
    }
  }, 100);

  let spoilerToggle = document.getElementById('spoiler_toggle');
  spoilerToggle.onclick = function() { toggleSpoilers('schedule'); }

  populateResults();
});

teams = {
  'Mages': {
    'name': 'Mage Esports 2',
    'logo': './img/teams/100/Mage Esports 2.png'
  },
  'CC': {
    'name': 'Chili Crunch',
    'logo': './img/teams/100/Chili Crunch.png'
  },
  'WUT': {
    'name': 'Warmed Up Team',
    'logo': './img/teams/100/Warmed Up Team.png'
  },
  'BB': {
    'name': 'Bushido Boys',
    'logo': './img/teams/100/Bushido Boys.png'
  },
  'AP': {
    'name': 'Anubis Promise',
    'logo': './img/teams/100/Anubis Promise.png'
  },
  '5D1U': {
    'name': '5 Dicks 1 Urinal',
    'logo': './img/teams/100/5 Dicks 1 Urinal.png'
  },
  'aTeam': {
    'name': 'a Team',
    'logo': './img/teams/100/a Team.png'
  },
  'Spuds': {
    'name': 'Tato and the Spuds',
    'logo': './img/teams/100/Tato and the Spuds.png'
  }
}

results = {
  'week1': {
    'series1': {
      'team1': 'Mages',
      'team2': 'Spuds',
      'winner': 'Mages',
      'scoreTeam1': '2',
      'scoreTeam2': '0',
      'game1': {
        'winner': 'Mages',
        'gameID': '7705110336',
        'youtube': 'https://youtu.be/lhEPhaLJf9E',
        'twitch': 'https://www.twitch.tv/videos/2129522709?t=00h18m29s',
      },
      'game2': {
        'winner': 'Mages',
        'gameID': '7705180986',
        'youtube': 'https://youtu.be/lhEPhaLJf9E?t=6010',
        'twitch': 'https://www.twitch.tv/videos/2129522709?t=01h57m20s',
      }
    },
    'series2': {
      'team1': 'CC',
      'team2': 'aTeam',
      'winner': 'CC',
      'scoreTeam1': '2',
      'scoreTeam2': '1',
      'game1': {
        'winner': 'aTeam',
        'gameID': '7708934397',
        'youtube': 'https://youtu.be/fFgWRJ51yhI?t=415',
        'twitch': 'https://www.twitch.tv/videos/2131457537?t=00h06m52s',
      },
      'game2': {
        'winner': 'CC',
        'gameID': '7708974529',
        'youtube': 'https://youtu.be/fFgWRJ51yhI?t=3719',
        'twitch': 'https://www.twitch.tv/videos/2131457537?t=01h01m56s',
      },
      'game3': {
        'winner': 'CC',
        'gameID': '7709018247',
        'youtube': 'https://youtu.be/fFgWRJ51yhI?t=7206',
        'twitch': 'https://www.twitch.tv/videos/2131457537?t=01h01m56s',
      }
    },
    'series3': {
      'team1': 'WUT',
      'team2': '5D1U',
      'winner': 'WUT',
      'scoreTeam1': '2',
      'scoreTeam2': '0',
      'game1': {
        'winner': 'WUT',
        'gameID': '7710685814',
        'twitch': 'https://www.twitch.tv/videos/2132249504?t=00h00m47s',
      },
      'game2': {
        'winner': 'WUT',
        'gameID': '7710769856',
        'twitch': 'https://www.twitch.tv/videos/2132249504?t=01h19m25s',
      }
    },
    'series4': {
      'team1': 'BB',
      'team2': 'AP',
      'winner': 'AP',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'AP',
        'gameID': '7712569892',
        'youtube': 'https://youtu.be/l98Xd27Bc2Q?t=31',
        'twitch': 'https://www.twitch.tv/videos/2133164559?t=00h02m39s',
      },
      'game2': {
        'winner': 'AP',
        'gameID': '7712623119',
        'youtube': 'https://youtu.be/l98Xd27Bc2Q?t=4730',
        'twitch': 'https://www.twitch.tv/videos/2133164559?t=01h21m06s',
      }
    }
  },
  'week2': {
    'series1': {
      'team1': 'BB',
      'team2': 'WUT',
      'winner': 'WUT',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'WUT',
        'gameID': '7723286837',
        'youtube': 'https://youtu.be/l98Xd27Bc2Q?t=31',
        'twitch': 'https://www.twitch.tv/videos/2138320857?t=00h02m13s',
      },
      'game2': {
        'winner': 'WUT',
        'gameID': '7723352028',
        'youtube': 'https://youtu.be/l98Xd27Bc2Q?t=4730',
        'twitch': 'https://www.twitch.tv/videos/2138320857?t=01h09m25s',
      }
    },
    'series2': {
      'team1': 'aTeam',
      'team2': 'Mages',
      'winner': 'Mages',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'Mages',
        'gameID': '7719593138',
        'youtube': 'https://youtu.be/9XKzhu7u7bY?t=217',
        'twitch': 'https://www.twitch.tv/videos/2136662682?t=00h03m36s',
      },
      'game2': {
        'winner': 'Mages',
        'gameID': '7719626738',
        'youtube': 'https://youtu.be/9XKzhu7u7bY?t=3088',
        'twitch': 'https://www.twitch.tv/videos/2136662682?t=00h51m28s',
      }
    },
    'series3': {
      'team1': '5D1U',
      'team2': 'Spuds',
      'winner': 'Spuds',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'Spuds',
        'gameID': '7721462586',
        'twitch': 'https://www.twitch.tv/videos/2137502845?t=00h04m08s',
      },
      'game2': {
        'winner': 'Spuds',
        'gameID': '7721514979',
        'twitch': 'https://www.twitch.tv/videos/2137502845?t=01h10m54s',
      }
    },
    'series4': {
      'team1': 'AP',
      'team2': 'CC',
      'winner': 'CC',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'CC',
        'gameID': '7728068369',
        'twitch': 'https://www.twitch.tv/videos/2140925675?t=00h00m13s',
      },
      'game2': {
        'winner': 'CC',
        'gameID': '7728099726',
        'twitch': 'https://www.twitch.tv/videos/2140925675?t=00h51m53s',
      }
    }
  },
  'week3': {
    'series1': {
      'team1': 'Spuds',
      'team2': 'BB',
      'winner': 'Spuds',
      'scoreTeam1': '2',
      'scoreTeam2': '1',
      'game1': {
        'winner': 'Spuds',
        'gameID': '7734885358',
        'twitch': 'https://www.twitch.tv/videos/2144186979?t=00h00m42s',
      },
      'game2': {
        'winner': 'BB',
        'gameID': '7734973546',
        'twitch': 'https://www.twitch.tv/videos/2144186979?t=01h18m21s',
      },
      'game3': {
        'winner': 'Spuds',
        'gameID': '7735031797',
        'twitch': 'https://www.twitch.tv/videos/2144186979?t=02h26m55s',
      }
    },
    'series2': {
      'team1': 'CC',
      'team2': 'WUT',
      'winner': 'WUT',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'WUT',
        'gameID': '7733261906',
        'twitch': 'https://www.twitch.tv/videos/2143501255?t=00h00m46s',
      },
      'game2': {
        'winner': 'WUT',
        'gameID': '7733312797',
        'twitch': 'https://www.twitch.tv/videos/2143501255?t=01h13m09s',
      }
    },
    'series3': {
      'team1': 'Mages',
      'team2': '5D1U',
      'winner': 'Mages',
      'scoreTeam1': '2',
      'scoreTeam2': '0',
      'game1': {
        'winner': 'Mages',
        'gameID': '7727946890',
        'twitch': 'https://www.twitch.tv/videos/2140806377?t=00h01m00s',
      },
      'game2': {
        'winner': 'Mages',
        'gameID': '7728006481',
        'twitch': 'https://www.twitch.tv/videos/2140806377?t=01h05m13s',
      }
    },
    'series4': {
      'team1': 'aTeam',
      'team2': 'AP',
      'winner': 'AP',
      'scoreTeam1': '1',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'aTeam',
        'gameID': '7733290548',
        'twitch': 'https://www.twitch.tv/videos/2143522623?t=00h11m27s',
      },
      'game2': {
        'winner': 'AP',
        'gameID': '7733349889',
        'twitch': 'https://www.twitch.tv/videos/2143522623?t=01h30m37s',
      },
      'game3': {
        'winner': 'AP',
        'gameID': '7733395981',
        'twitch': 'https://www.twitch.tv/videos/2143522623?t=02h25m05s',
      }
    }
  },
  'week4': {
    'series1': {
      'team1': '5D1U',
      'team2': 'BB',
      'winner': 'BB',
      'scoreTeam1': 'FF',
      'scoreTeam2': '2',
    },
    'series2': {
      'team1': 'WUT',
      'team2': 'aTeam',
      'winner': 'WUT',
      'scoreTeam1': '2',
      'scoreTeam2': 'FF',
    },
    'series3': {
      'team1': 'Spuds',
      'team2': 'CC',
      'winner': 'Spuds',
      'scoreTeam1': '2',
      'scoreTeam2': '0',
      'game1': {
        'winner': 'Spuds',
        'gameID': '7745864701',
      },
      'game2': {
        'winner': 'Spuds',
        'gameID': '7745982139',
      },
    },
    'series4': {
      'team1': 'AP',
      'team2': 'Mages',
      'winner': 'Mages',
      'scoreTeam1': '0',
      'scoreTeam2': '2',
      'game1': {
        'winner': 'Mages',
        'gameID': '7749059816',
      },
      'game2': {
        'winner': 'Mages',
        'gameID': '7749091489',
      },
    }
  },
  'week5': {
    'series1': {
      'team1': 'Mages',
      'team2': 'BB',
      'winner': 'Mages',
      'scoreTeam1': '2',
      'scoreTeam2': '1',
      'game1': {
        'winner': 'Mages',
        'gameID': '7750581075',
      },
      'game2': {
        'winner': 'BB',
        'gameID': '7750621578',
      },
      'game3': {
        'winner': 'Mages',
        'gameID': '7750665891',
      },
    },
    'series2': {
      'team1': 'AP',
      'team2': 'WUT',
      'winner': 'AP',
      'scoreTeam1': '2',
      'scoreTeam2': '1',
      'game1': {
        'winner': 'AP',
        'gameID': '7759264783',
      },
      'game2': {
        'winner': 'WUT',
        'gameID': '7759420827',
      },
      'game3': {
        'winner': 'AP',
        'gameID': '7759562880',
      },
    },
    'series3': {
      'team1': '5D1U',
      'team2': 'CC',
      'winner': 'CC',
      'scoreTeam1': 'FF',
      'scoreTeam2': '2',
    },
    'series4': {
      'team1': 'aTeam',
      'team2': 'Spuds',
      'winner': 'Spuds',
      'scoreTeam1': 'FF',
      'scoreTeam2': '2',
    }
  },
  'week6': {
    'series1': {
      'team1': 'aTeam',
      'team2': '5D1U',
    },
    'series2': {
      'team1': 'WUT',
      'team2': 'Mages',
    },
    'series3': {
      'team1': 'CC',
      'team2': 'BB',
    },
    'series4': {
      'team1': 'Spuds',
      'team2': 'AP',
    }
  },
  'week7': {
    'series1': {
      'team1': 'BB',
      'team2': 'aTeam',
    },
    'series2': {
      'team1': 'AP',
      'team2': '5D1U',
    },
    'series3': {
      'team1': 'Mages',
      'team2': 'CC',
    },
    'series4': {
      'team1': 'WUT',
      'team2': 'Spuds',
    }
  }
}