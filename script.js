const DURATION = 60;
const scenes = [...document.querySelectorAll('.scene')];
const caption = document.querySelector('#caption');
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress');
const seek = document.querySelector('#seek');
const playButton = document.querySelector('#play');
const soundButton = document.querySelector('#sound');
const video = document.querySelector('#video');
const flash = document.querySelector('#flash');
const startScreen = document.querySelector('#startScreen');

const timeline = [
  { start: 0, end: 5, text: 'Sabah uyandın ve banka hesabında yanlışlıkla 100 milyon TL gördün. Para artık senin mi?' },
  { start: 5, end: 13, text: 'İlk düşüncen muhtemelen şu: Harcasam ne olur?' },
  { start: 13, end: 23, text: 'Ama hesabında görünmesi, o paranın sana ait olduğu anlamına gelmez. Banka hatalı işlemi fark ettiğinde parayı geri isteyebilir.' },
  { start: 23, end: 35, text: 'Paranın sana ait olmadığını bildiğin hâlde harcamak veya başka hesaba göndermek ise işi çok daha ciddi hâle getirebilir.' },
  { start: 35, end: 47, text: 'Banka paranın iadesini talep edebilir ve olayın şartlarına göre hukuki süreç de başlayabilir.' },
  { start: 47, end: 56, text: 'Bu yüzden böyle bir şey olursa en güvenlisi paraya dokunmamak ve hemen bankaya bildirmek.' },
  { start: 56, end: 60, text: 'Yani maalesef… hesabına yanlışlıkla gelen 100 milyon TL, seni bir gecede milyoner yapmaz.' }
];

let currentTime = 0;
let playing = false;
let muted = false;
let startedAt = 0;
let frame;
let sceneIndex = 0;

function formatTime(seconds) {
  return `00:${String(Math.min(59, Math.floor(seconds))).padStart(2, '0')}`;
}

function render(time, force = false) {
  const nextIndex = Math.min(timeline.length - 1, timeline.findIndex(item => time >= item.start && time < item.end));
  const index = nextIndex < 0 ? timeline.length - 1 : nextIndex;
  if (force || index !== sceneIndex) {
    sceneIndex = index;
    scenes.forEach((scene, i) => {
      scene.classList.toggle('active', i === index);
      if (i === index) {
        scene.style.animation = 'none';
        scene.offsetHeight;
        scene.style.animation = '';
      }
    });
    flash.classList.remove('go');
    flash.offsetHeight;
    flash.classList.add('go');
    if (playing && !force) speak(time);
  }
  caption.textContent = timeline[index].text;
  counter.textContent = formatTime(time);
  progress.style.width = `${(time / DURATION) * 100}%`;
  seek.value = time;
  const callSeconds = document.querySelector('#callSeconds');
  callSeconds.textContent = String(Math.max(1, Math.floor(time - 46))).padStart(2, '0');
}

function tick(now) {
  if (!playing) return;
  currentTime = Math.min(DURATION, (now - startedAt) / 1000);
  render(currentTime);
  if (currentTime >= DURATION) {
    pause();
    playButton.textContent = '↻ Tekrar';
    return;
  }
  frame = requestAnimationFrame(tick);
}

function speak(fromTime = 0) {
  if (muted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const item = timeline.find(part => fromTime >= part.start && fromTime < part.end) || timeline[0];
  if (!('SpeechSynthesisUtterance' in window)) return;
  const utterance = new SpeechSynthesisUtterance(item.text);
  utterance.lang = 'tr-TR';
  utterance.rate = 1.08;
  utterance.pitch = 1.02;
  const voice = window.speechSynthesis.getVoices().find(candidate => candidate.lang.startsWith('tr'));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function play() {
  if (currentTime >= DURATION) currentTime = 0;
  playing = true;
  startedAt = performance.now() - currentTime * 1000;
  playButton.textContent = 'Ⅱ Duraklat';
  speak(currentTime);
  frame = requestAnimationFrame(tick);
}

function pause() {
  playing = false;
  cancelAnimationFrame(frame);
  window.speechSynthesis?.cancel();
  if (currentTime < DURATION) playButton.textContent = '▶ Devam';
}

startScreen.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  play();
});
playButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  playing ? pause() : play();
});
soundButton.addEventListener('click', () => {
  muted = !muted;
  soundButton.textContent = muted ? '🔇' : '🔊';
  if (muted) window.speechSynthesis?.cancel(); else if (playing) speak(currentTime);
});
seek.addEventListener('input', event => {
  currentTime = Number(event.target.value);
  if (playing) startedAt = performance.now() - currentTime * 1000;
  window.speechSynthesis?.cancel();
  render(currentTime, true);
});
seek.addEventListener('change', () => { if (playing) speak(currentTime); });
document.querySelector('#fullscreen').addEventListener('click', () => video.requestFullscreen?.());
document.addEventListener('keydown', event => {
  if (event.code === 'Space') { event.preventDefault(); playing ? pause() : play(); }
  if (event.code === 'ArrowRight') { currentTime = Math.min(DURATION, currentTime + 2); render(currentTime, true); }
  if (event.code === 'ArrowLeft') { currentTime = Math.max(0, currentTime - 2); render(currentTime, true); }
});

render(0, true);
