const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('.image-open').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.img;
    if (!src || !lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.showModal();
  });
});
lightbox?.querySelector('.close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

const quiz = document.querySelector('[data-quiz]');
if (quiz) {
  const result = quiz.querySelector('.quiz-result');
  quiz.querySelectorAll('.question').forEach(q => {
    q.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        q.querySelectorAll('button').forEach(b => b.classList.remove('correct','wrong'));
        const ok = btn.dataset.choice === q.dataset.answer;
        btn.classList.add(ok ? 'correct' : 'wrong');
        const answered = [...quiz.querySelectorAll('.question')].filter(x => x.querySelector('.correct,.wrong')).length;
        const score = [...quiz.querySelectorAll('.question')].filter(x => x.querySelector('.correct')).length;
        if (result) result.textContent = answered === 3 ? `Risultato: ${score}/3. ${score === 3 ? 'Percorso acquisito.' : 'Rivedi le sezioni collegate agli errori.'}` : '';
      });
    });
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.warn));
}
