async function loadSongs() {
  const res = await fetch('public/songs.json');
  const songs = await res.json();

  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    const div = document.createElement('div');
    div.className = 'song';

    // 音频处理
    if (song.type === 'audio') {
      div.innerHTML = `
        <p>${song.title}</p>
        <audio controls loop src="${song.url}"></audio>
      `;
    }

    // 视频处理
    if (song.type === 'video') {
      div.innerHTML = `
        <h3>🎬 ${song.title}</h3>
        <video width="640" height="360" controls>
          <source src="${song.url}" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
      `;
    }

    songList.appendChild(div);
  });

  // 🔁 只允许一个音频播放
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
