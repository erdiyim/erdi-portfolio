// Vaka sayfalarındaki kaydırmaya bağlı dönüşüm bölümü (tools/vaka-sayfalari.js üretir)
// 0.00–0.32 eskiz çizilir / "önce" hali + notlar · 0.36–0.86 "sonra" hali boyanarak açılır · 0.86–1 bitti
(function () {
    var bolum = document.querySelector('[data-surec]');
    if (!bolum) return;
    var pencere = bolum.querySelector('.surec-pencere');
    var adres = bolum.querySelector('.surec-adres');
    var adresler = (bolum.getAttribute('data-adresler') || '').split('|');
    var adimlar = bolum.querySelectorAll('.surec-adim');
    var altlar = bolum.querySelectorAll('.surec-alt [data-adim]');
    var cizgiler = Array.prototype.slice.call(bolum.querySelectorAll('.ciz'));
    var yazilar = Array.prototype.slice.call(bolum.querySelectorAll('.surec-yazi'));
    var notlar = bolum.querySelector('.surec-not');
    var lekeGrubu = bolum.querySelector('.surec-lekeler');
    var tamDolgu = bolum.querySelector('.surec-tam');
    var boyut = bolum.getAttribute('data-boyut').split(',').map(Number);
    var merkez = bolum.getAttribute('data-merkez').split(',').map(Number);
    var NS = 'http://www.w3.org/2000/svg';

    // Boya lekeleri: merkezden dışa, sabit tohumla hafif rastgele sırayla
    var tohum = 7;
    function rast() { tohum = (tohum * 9301 + 49297) % 233280; return tohum / 233280; }
    var lekeler = [];
    var adim = 105, yaricap = Math.max(boyut[0], boyut[1]) * 0.36;
    for (var y = -40; y <= boyut[1] + 50; y += adim) {
        for (var x = -40; x <= boyut[0] + 40; x += adim) {
            var px = x + (rast() - 0.5) * 50, py = y + (rast() - 0.5) * 50;
            var uzaklik = Math.hypot((px - merkez[0]) / (boyut[0] > boyut[1] ? 1.6 : 1), py - merkez[1]) / yaricap;
            var c = document.createElementNS(NS, 'circle');
            c.setAttribute('cx', px.toFixed(0)); c.setAttribute('cy', py.toFixed(0)); c.setAttribute('r', '0');
            lekeGrubu.appendChild(c);
            lekeler.push({ el: c, gecikme: Math.min(1, uzaklik * 0.75 + rast() * 0.3), maks: 120 + rast() * 60 });
        }
    }

    function sinirla(v) { return Math.max(0, Math.min(1, v)); }
    function yumusat(v) { v = sinirla(v); return v * v * (3 - 2 * v); }

    var sonP = -1, sonAdim = -1;
    function guncelle(zorla) {
        var r = bolum.getBoundingClientRect();
        var toplam = bolum.offsetHeight - window.innerHeight;
        if (toplam <= 0) return;
        var p = sinirla(-r.top / toplam);
        if (!zorla && Math.abs(p - sonP) < 0.0005) return;
        sonP = p;

        var cizim = sinirla(p / 0.32);
        cizgiler.forEach(function (el, i) {
            el.style.setProperty('--c', yumusat((cizim - (i / cizgiler.length) * 0.7) / 0.3).toFixed(3));
        });
        yazilar.forEach(function (el, i) { el.style.setProperty('--c', yumusat((cizim - 0.45 - i * 0.05) / 0.3).toFixed(3)); });

        var boya = sinirla((p - 0.36) / 0.5);
        if (notlar) notlar.style.setProperty('--n', (yumusat((cizim - (cizgiler.length ? 0.75 : 0.25)) / 0.25) * (1 - yumusat(boya / 0.45))).toFixed(3));
        lekeler.forEach(function (l) {
            l.el.setAttribute('r', (l.maks * yumusat((boya - l.gecikme * 0.72) / 0.28)).toFixed(1));
        });
        tamDolgu.setAttribute('opacity', yumusat((boya - 0.85) / 0.15).toFixed(3));

        var son = yumusat((p - 0.86) / 0.14);
        pencere.style.setProperty('--olcek', (0.96 + son * 0.04).toFixed(4));
        pencere.style.setProperty('--parilti', son.toFixed(3));

        var a = p < 0.36 ? 0 : (p < 0.86 ? 1 : 2);
        if (a !== sonAdim) {
            sonAdim = a;
            adimlar.forEach(function (el, i) { el.classList.toggle('aktif', i === a); });
            altlar.forEach(function (el) { el.hidden = Number(el.getAttribute('data-adim')) !== a; });
            if (adres && adresler[a]) adres.textContent = adresler[a];
        }
    }

    var bekliyor = false;
    window.addEventListener('scroll', function () {
        if (bekliyor) return;
        bekliyor = true;
        requestAnimationFrame(function () { bekliyor = false; guncelle(false); });
    }, { passive: true });
    window.addEventListener('resize', function () { guncelle(true); });
    guncelle(true);
})();
