async function loadSongs() {
  const res = await fetch('public/songs.json');
  const songs = await res.json();

  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    const div = document.createElement('div');
    div.className = 'song';

    if (song.type === 'video') {
      // 视频播放
      div.innerHTML = `
        <p>${song.title}</p>
        <video controls width="320">
          <source src="${song.url}" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
      `;
    } else {
      // 默认音频播放
      div.innerHTML = `
        <p>${song.title}</p>
        <audio controls loop src="${song.url}"></audio>
      `;
    }

    songList.appendChild(div);
  });

  // 只允许一个音频播放（视频不受限制）
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
