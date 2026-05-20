// -- Scroll Reveal --
(function () {
  var targets = '.caso-card,.industry-card,.os-layer,.fso-item,.lifecycle-step,.reference-item,.transparency-block,.research-card,.doctrine-item,.waitlist-stat,.counter-banner';
  var els = document.querySelectorAll(targets);
  els.forEach(function (el) { el.classList.add('reveal'); });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('visible'); }, i * 55);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(function (el) { obs.observe(el); });
})();

// -- Counter Animation --
(function () {
  function animCount(el, target, fmt) {
    var start = performance.now();
    (function loop(t) {
      var p = Math.min((t - start) / 1100, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(loop);
    })(start);
  }

  var obs2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var t = parseInt(el.dataset.counter);
      if (!isNaN(t)) animCount(el, t, function (v) {
        if (el.dataset.format === 'k') return v >= 1000 ? '~' + Math.round(v / 1000) + 'K+' : v;
        return (el.dataset.pad === '2' && v < 10) ? '0' + v : v;
      });
      obs2.unobserve(el);
    });
  }, { threshold: 0.6 });

  var cn = document.querySelector('.counter-number');
  if (cn) { cn.dataset.counter = '2'; cn.dataset.pad = '2'; obs2.observe(cn); }

  var stats = document.querySelectorAll('.counter-stat-num');
  if (stats[0]) { stats[0].dataset.counter = '12000'; stats[0].dataset.format = 'k'; obs2.observe(stats[0]); }
  if (stats[1]) { stats[1].dataset.counter = '7'; obs2.observe(stats[1]); }
  if (stats[2]) { stats[2].dataset.counter = '2'; obs2.observe(stats[2]); }

  var wstats = document.querySelectorAll('.waitlist-stat-value');
  if (wstats[0]) { wstats[0].dataset.counter = '9'; obs2.observe(wstats[0]); }
  if (wstats[2]) { wstats[2].dataset.counter = '7'; obs2.observe(wstats[2]); }
})();
