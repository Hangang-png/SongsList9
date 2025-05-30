async function loadSongs() {
  const res = await fetch('/songs.json');  // ← 注意这里
  const songs = await res.json();

  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <p>${song.title}</p>
      <audio controls loop src="${song.url}"></audio>
    `;
    songList.appendChild(div);
  });

  // 只允许一个音频播放
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.addEventListener('play', () => {
      audios.forEach(other => {
        if (other !== audio) {
          other.pause();
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSongs();
});
