async function loadSongs() {
  const res = await fetch('/public/songs.json');
  const songs = await res.json();

  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    // 只处理音频（例如 .mp3），跳过视频（如 .mp4）
    if (!song.url.toLowerCase().endsWith('.mp3')) return;

    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <p>${song.title}</p>
      <audio controls loop src="${song.url}"></audio>
    `;
    songList.appendChild(div);
  });

  // ✅ 加入视频播放（独立部分）
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video';
  videoContainer.innerHTML = `
    <h3>🎬 视频欣赏</h3>
    <video width="640" height="360" controls>
      <source src="public/mp3/社会.mp4" type="video/mp4">
      您的浏览器不支持 video 标签。
    </video>
  `;
  songList.appendChild(videoContainer);

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
