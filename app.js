const lyricInput = document.getElementById('lyric-input');
const searchBtn = document.getElementById('searchBtn');
const resultSong = document.getElementById('resultSong');
const resultLyric = document.getElementById('resultLyric');
const displayFancy = document.getElementById('display-fancy');
const defaultFancy = document.getElementById('fancy-result');

// Click button event listener
searchBtn.addEventListener('click', () => {
  if (lyricInput.value === '') {
    alert(`You didn't type any song name`);
  }
  getData();
});

// Get data from API
function getData() {
  const api = `https://api.lyrics.ovh/suggest/${lyricInput.value}`;
  fetch(api)
    .then((res) => res.json())
      .then((data) => {
      showData(data);
    });
  resultSong.style.display = 'none';
  displayFancy.style.display = 'block';
  defaultFancy.style.display = 'none';
}

// Show data on the display
function showData(data) {
  let result = '';

  data.data.forEach((song) => {
    result += `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-7">
        <h3 class="lyrics-name">${song.artist.name}</h3><p class="author lead"> Album by <span>${song.title}</span>
        </div>
        <div class="col-md-5 text-md-right text-center">
        <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></p>
        </div>
        </div>
        `;
  });
  displayFancy.innerHTML = `${result}`;
}

// Get lyrics from API and display lyric
function getLyrics(artist, songTitle) {
  const api = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br/>');
      resultLyric.innerHTML = `<h2 class="text-success my-5"><strong>${artist} - ${songTitle}</strong></h2>
        <span class="pb-5 lyric text-white">${lyrics}</span>`;
    });
}

// Get Lyric event listener
displayFancy.addEventListener('click', (event) => {
  const lyricBtn = event.target;
  if (lyricBtn.tagName === 'BUTTON') {
    const artist = lyricBtn.getAttribute('data-artist');
    const songTitle = lyricBtn.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
});
