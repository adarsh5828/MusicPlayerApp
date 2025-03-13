const songs=[
    {id:1,name:'Locked Away',artist:'R City',genre:'Rock',img:'images/Locked Away.jpg', source:'music/Locked Away.mp3'},
    { id: 2, name: 'Sugar', artist: 'Maroon 5', img: 'images/Sugar.jpg', genre: 'Pop', source: 'music/Sugar.mp3' },
    { id: 3, name: 'Shape of You', artist: 'Ed Sheeran', img: 'images/shape of you.jpg', genre: 'Hip Hop', source: 'music/Shape of You.mp3' },
    {id:4,name:'Animals',artist:'Maroon 5',img:'images/wp10522832.jpg',genre:'Pop',source:'music/Maroon 5 - Animals.mp3'},
];

let currentSongIndex = 0;
let playlists = {};

const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');
const songName = document.getElementById('songName');
const artistName = document.getElementById('artistName');
const songImage = document.getElementById('songImage');
const genreFilter = document.getElementById('genreFilter');
const themeSwitcher = document.getElementById('themeSwitcher');
const currentPlaylist = document.getElementById('currentPlaylist');
const allPlaylists = document.getElementById('allPlaylists');

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
}
themeSwitcher.addEventListener('change', toggleTheme);

function showSongs() {
    const selectedGenre = genreFilter.value;
    songList.innerHTML = '';
    const filteredSongs = selectedGenre === 'All' ? songs : songs.filter(song => song.genre === selectedGenre);
    filteredSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.addEventListener('click', () => renderCurrentSong(song.id));
        songList.appendChild(li);
    });
}
genreFilter.addEventListener('change', showSongs);

function renderCurrentSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        currentSongIndex = songs.indexOf(song);
        songName.textContent = song.name;
        artistName.textContent = song.artist;
        songImage.src = song.img;               
        audioPlayer.src = song.source;          
        audioPlayer.play().catch(error => {     
            console.log("Playback error:", error);
        });
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
}

document.getElementById('nextBtn').addEventListener('click', playNextSong);
document.getElementById('prevBtn').addEventListener('click', playPrevSong);

document.getElementById('addToPlaylist').addEventListener('click', () => addToPlaylist(currentSongIndex));

function createPlaylist() {
    const playlistName = document.getElementById('playlistName').value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        const li = document.createElement('li');
        li.textContent = playlistName;
        li.addEventListener('click', () => renderPlaylistSongs(playlistName));
        allPlaylists.appendChild(li);
    }
}

document.getElementById('createPlaylist').addEventListener('click', createPlaylist);

function addToPlaylist(songIndex) {
    const playlistName = prompt('Enter playlist name to add the song:');
    if (playlistName && playlists[playlistName]) {
        playlists[playlistName].push(songs[songIndex]);
        renderPlaylistSongs(playlistName);
    }
}

function renderPlaylistSongs(playlistName) {
    currentPlaylist.innerHTML = '';
    playlists[playlistName].forEach(song => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.addEventListener('click', () => renderCurrentSong(song.id));
        currentPlaylist.appendChild(li);
    });
}

// Initial load
showSongs();
