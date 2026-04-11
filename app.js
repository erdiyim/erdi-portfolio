// ==========================================
// -1. SAYFA YENİLEMEDE EN YUKARI + SCROLL KİLİDİ
// ==========================================
window.scrollTo(0, 0);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
document.body.style.overflow = 'hidden'; // Boot ekranı bitene kadar scroll kapalı

// ==========================================
// LENIS SMOOTH SCROLL
// ==========================================
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false
    });
    lenis.stop(); // Boot ekranı bitene kadar durdur

    function lenisRaf(time) {
        lenis.raf(time);
        requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);
}

// ==========================================
// MODAL FOCUS TRAP YARDIMCISI
// ==========================================
function focusTrapKur(modalEl) {
    const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    function handler(e) {
        if (e.key !== 'Tab') return;
        const focusable = modalEl.querySelectorAll(FOCUSABLE);
        if (focusable.length === 0) return;
        const ilk = focusable[0];
        const son = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === ilk) { e.preventDefault(); son.focus(); }
        } else {
            if (document.activeElement === son) { e.preventDefault(); ilk.focus(); }
        }
    }
    return {
        aktif: () => { document.addEventListener('keydown', handler); const f = modalEl.querySelector(FOCUSABLE); if (f) f.focus(); },
        deaktif: () => { document.removeEventListener('keydown', handler); }
    };
}

// ==========================================
// 0. DİL DESTEĞİ (TR/EN)
// ==========================================
const DilYoneticisi = (() => {
    let aktifDil = localStorage.getItem('dil') || 'tr';

    function uygula(dil) {
        aktifDil = dil;
        localStorage.setItem('dil', dil);
        document.documentElement.lang = dil;

        // data-tr / data-en attribute'lu tüm elementleri güncelle
        document.querySelectorAll('[data-tr][data-en]').forEach(el => {
            const metin = el.getAttribute(`data-${dil}`);
            if (metin) {
                // innerHTML kullan (span.vurgu gibi HTML içerik için)
                if (metin.includes('<') || metin.includes('&')) {
                    el.innerHTML = metin;
                } else {
                    el.textContent = metin;
                }
            }
        });

        // Butonlardaki .btn-icerik span'ları güncelle (ok simgesi korunacak)
        document.querySelectorAll('.btn[data-tr][data-en]').forEach(btn => {
            const icerikSpan = btn.querySelector('.btn-icerik');
            if (icerikSpan) {
                icerikSpan.textContent = btn.getAttribute(`data-${dil}`);
            }
        });

        // Form placeholder'ları güncelle
        document.querySelectorAll('[data-tr-ph][data-en-ph]').forEach(el => {
            el.placeholder = el.getAttribute(`data-${dil}-ph`);
        });

        // Dil butonlarını güncelle (hem desktop hem mobil)
        document.querySelectorAll('.dil-secim').forEach(s => {
            s.classList.toggle('aktif-dil', s.dataset.dil === dil);
        });
    }

    function dilDegistir() {
        uygula(aktifDil === 'tr' ? 'en' : 'tr');
    }

    function aktif() { return aktifDil; }

    // Sayfa yüklendiğinde localStorage'dan dili uygula
    function baslat() {
        // Butonları bağla
        const dilBtn = document.getElementById('dilBtn');
        const dilBtnMobil = document.getElementById('dilBtnMobil');
        if (dilBtn) dilBtn.addEventListener('click', dilDegistir);
        if (dilBtnMobil) dilBtnMobil.addEventListener('click', dilDegistir);

        // Başlangıç dilini uygula
        if (aktifDil !== 'tr') uygula(aktifDil);
    }

    return { uygula, dilDegistir, aktif, baslat };
})();

// ==========================================
// 0.5 TEMA DESTEĞİ (DARK/LIGHT)
// ==========================================
const TemaYoneticisi = (() => {
    let aktifTema = localStorage.getItem('tema') || 'dark';

    function uygula(tema) {
        aktifTema = tema;
        localStorage.setItem('tema', tema);
        // Geçiş sırasında tüm transitionları devre dışı bırak
        document.documentElement.classList.add('tema-gecis');
        document.documentElement.setAttribute('data-theme', tema);
        // Bir frame sonra transitionları geri aç
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('tema-gecis');
            });
        });
    }

    function degistir() {
        uygula(aktifTema === 'dark' ? 'light' : 'dark');
    }

    function baslat() {
        // Butonları bağla
        const temaBtn = document.getElementById('temaBtn');
        const temaBtnMobil = document.getElementById('temaBtnMobil');
        if (temaBtn) temaBtn.addEventListener('click', degistir);
        if (temaBtnMobil) temaBtnMobil.addEventListener('click', degistir);

        // Başlangıç temasını uygula
        uygula(aktifTema);
    }

    return { uygula, degistir, aktif: () => aktifTema, baslat };
})();

// Sayfa yüklenince dil ve tema sistemini başlat
document.addEventListener('DOMContentLoaded', () => { DilYoneticisi.baslat(); TemaYoneticisi.baslat(); });

// ==========================================
// 0.6 CANLI SAAT
// ==========================================
(() => {
    const saatEl = document.getElementById('saatDeger');
    if (!saatEl) return;

    function guncelle() {
        const simdi = new Date();
        const saat = simdi.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const gun = simdi.getDate();
        const aylar = DilYoneticisi.aktif() === 'tr'
            ? ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara']
            : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const ay = aylar[simdi.getMonth()];
        saatEl.textContent = `${saat} · ${gun} ${ay}`;
    }

    guncelle();
    setInterval(guncelle, 10000); // her 10 saniyede güncelle
})();

// ==========================================
// 1. SİNEMATİK GİRİŞ MOTORU (Laptop)
// ==========================================
(() => {
    const acilisEkrani = document.getElementById('acilis-ekrani');
    const kodSatirlari = document.getElementById('kodSatirlari');
    const bootIpucu = document.getElementById('bootIpucu');
    const bootAltBilgi = document.getElementById('bootAltBilgi');
    const laptopKapak = document.getElementById('laptopKapak');
    const laptop = document.getElementById('laptop');
    const zoomGecis = document.getElementById('zoomGecis');
    const navbar = document.getElementById('navbar');

    const dil = DilYoneticisi.aktif();

    const bootMetinleri = {
        tr: {
            loglar: ['✓ Tüm sistemler çevrimiçi', '✓ Portfolio hazır'],
            yorum: '// Sistem hazır — Devam etmek için tıklayın',
            ipucu: 'Devam etmek için tıklayın veya ENTER tuşuna basın'
        },
        en: {
            loglar: ['✓ All systems online', '✓ Portfolio ready'],
            yorum: '// System ready — Click to continue',
            ipucu: 'Click to continue or press ENTER'
        }
    };
    const bt = bootMetinleri[dil];

    const kodlar = [
        '<span class="kod-comment">// ERDI_OS v3.0 — Portfolio Runtime</span>',
        '<span class="kod-keyword">import</span> <span class="kod-func">{ createApp }</span> <span class="kod-keyword">from</span> <span class="kod-string">\'erdi-framework\'</span>;',
        '<span class="kod-keyword">import</span> <span class="kod-func">Router</span> <span class="kod-keyword">from</span> <span class="kod-string">\'./core/router\'</span>;',
        '',
        '<span class="kod-keyword">const</span> <span class="kod-func">config</span> = {',
        '  name: <span class="kod-string">\'Erdi Öcal\'</span>,',
        '  role: <span class="kod-string">\'Full Stack Developer\'</span>,',
        '  stack: [<span class="kod-string">\'ASP.NET\'</span>, <span class="kod-string">\'React\'</span>, <span class="kod-string">\'TypeScript\'</span>],',
        '  location: <span class="kod-string">\'İstanbul, TR\'</span>,',
        '};',
        '',
        '<span class="kod-keyword">async function</span> <span class="kod-func">bootSystem</span>() {',
        '  <span class="kod-keyword">await</span> <span class="kod-func">loadModules</span>(<span class="kod-string">\'ui\'</span>, <span class="kod-string">\'api\'</span>, <span class="kod-string">\'db\'</span>);',
        '  <span class="kod-keyword">await</span> <span class="kod-func">connectDatabase</span>(<span class="kod-string">\'postgresql://erdi_db\'</span>);',
        '  <span class="kod-keyword">await</span> <span class="kod-func">initRouter</span>(Router);',
        '',
        `  console.<span class="kod-func">log</span>(<span class="kod-string">'${bt.loglar[0]}'</span>);`,
        `  console.<span class="kod-func">log</span>(<span class="kod-string">'${bt.loglar[1]}'</span>);`,
        '  <span class="kod-keyword">return</span> <span class="kod-func">createApp</span>(config);',
        '}',
        '',
        '<span class="kod-func">bootSystem</span>().<span class="kod-func">then</span>(app => {',
        '  app.<span class="kod-func">mount</span>(<span class="kod-string">\'#portfolio\'</span>);',
        `  <span class="kod-comment">${bt.yorum}</span>`,
        '});',
    ];

    const bootProgress = document.getElementById('bootProgress');
    let satirIndex = 0;
    let hazir = false;
    let girisYapildi = false;

    // Asset preload
    const assetler = [];
    const portre = new Image();
    portre.src = 'erdi-portrait.png';
    assetler.push(new Promise(r => { portre.onload = r; portre.onerror = r; }));
    if (document.fonts) assetler.push(document.fonts.ready);

    function ilerlemeGuncelle(yuzde) {
        if (bootProgress) bootProgress.style.width = yuzde + '%';
    }

    // 1. Laptop kapalı başlıyor, 800ms sonra açılmaya başlar
    setTimeout(() => {
        laptopKapak.classList.add('acik');
    }, 800);

    // 2. Kapak açıldıktan sonra kod yazmaya başla (açılma 1.8s)
    function satirEkle() {
        if (satirIndex >= kodlar.length) {
            ilerlemeGuncelle(85);
            Promise.all(assetler).then(() => {
                ilerlemeGuncelle(100);
                hazir = true;
                bootIpucu.innerHTML = bt.ipucu;
                bootIpucu.classList.add('hazir');
            });
            return;
        }
        const satirHTML = `<div><span class="kod-satir-numara">${String(satirIndex + 1).padStart(2, '0')}</span>${kodlar[satirIndex]}</div>`;
        kodSatirlari.innerHTML += satirHTML;
        satirIndex++;
        kodSatirlari.scrollTop = kodSatirlari.scrollHeight;
        ilerlemeGuncelle(Math.round((satirIndex / kodlar.length) * 80));
        const gecikme = kodlar[satirIndex - 1] === '' ? 80 : Math.random() * 60 + 40;
        setTimeout(satirEkle, gecikme);
    }
    // Kodlar kapak açılma ortasında başlasın
    setTimeout(satirEkle, 1800);

    // 3. Tıklayınca zoom — ekrana yaklaşma
    function girisYap() {
        if (!hazir || girisYapildi) return;
        girisYapildi = true;

        laptop.classList.add('zoom');

        if (typeof window._baslatAgirMotorlar === 'function') {
            window._baslatAgirMotorlar();
        }

        setTimeout(() => { zoomGecis.classList.add('aktif'); }, 900);

        setTimeout(() => {
            acilisEkrani.classList.add('kapaniyor');
            acilisEkrani.style.display = 'none';
            document.body.style.overflow = '';
            if (lenis) lenis.start();
            navbar.classList.add('gorunur');
            document.querySelectorAll('#ana-ekran .anim').forEach(el => el.classList.add('gorunur'));
            sayaclariBaslat();
        }, 1500);

        setTimeout(() => { zoomGecis.classList.remove('aktif'); }, 1900);
    }

    window.addEventListener('keydown', (e) => { if (e.key === 'Enter') girisYap(); });
    acilisEkrani.addEventListener('click', girisYap);
})();

// ==========================================
// 2. LETTER GLITCH MOTORU (Framer tarzı)
// ==========================================
// Lazy: boot bitene kadar başlamaz
window._agirMotorlar = window._agirMotorlar || [];
window._agirMotorlar.push(function glitchMotorBaslat() {
    // Mobilde glitch motorunu devre dışı bırak (performans)
    if (window.innerWidth < 768) return;
    const canvas = document.getElementById('glitchTuvali');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const CHAR_W = 10;
    const CHAR_H = 18;
    const GLITCH_SPEED = 50; // ms
    const GLITCH_AMOUNT = 0.06; // her güncelleme'de %6 harf değişir

    const lettersAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*(){}[]<>/=+;:'.split('');

    let cols, rows, grid;
    let animId;

    function randomChar() {
        return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    }

    // HSL → RGB dönüşümü (arka plan parçacıklarıyla senkron renk)
    function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) { r = g = b = l; } else {
            const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1/6) return p + (q - p) * 6 * t; if (t < 1/2) return q; if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p; };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    // Arka plan parçacıklarıyla aynı hue'yu kullanarak renk üret
    function randomColor() {
        // window.hue parçacık motorundan gelecek
        const currentHue = (window._particleHue || 170) % 360;
        const variants = [
            [currentHue, 100, 60],    // ana renk
            [currentHue, 80, 50],     // koyu
            [currentHue, 100, 70],    // açık
            [currentHue + 10, 90, 55],// hafif kayma
            [currentHue - 10, 85, 45],// ters kayma
            [currentHue, 60, 80],     // soluk/beyazımsı
            [currentHue, 100, 35],    // çok koyu
            [0, 0, 100],             // beyaz parlama
        ];
        const v = variants[Math.floor(Math.random() * variants.length)];
        return hslToRgb(v[0], v[1], v[2]);
    }
    function lerpColor(a, b, t) {
        return [
            Math.round(a[0] + (b[0] - a[0]) * t),
            Math.round(a[1] + (b[1] - a[1]) * t),
            Math.round(a[2] + (b[2] - a[2]) * t),
        ];
    }

    function initGrid() {
        const parent = canvas.parentElement;
        const w = parent.offsetWidth;
        const h = parent.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        cols = Math.ceil(w / CHAR_W);
        rows = Math.ceil(h / CHAR_H);

        grid = [];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                const color = randomColor();
                grid[i][j] = {
                    char: randomChar(),
                    color: [...color],
                    targetColor: [...color],
                };
            }
        }
    }

    function updateGlitch() {
        const total = cols * rows;
        const changeCount = Math.max(1, Math.floor(total * GLITCH_AMOUNT));

        for (let n = 0; n < changeCount; n++) {
            const r = Math.floor(Math.random() * rows);
            const c2 = Math.floor(Math.random() * cols);
            grid[r][c2].char = randomChar();
            grid[r][c2].targetColor = randomColor();
        }
    }

    function renderGrid() {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        // Siyah arka plan (harfler net görünsün)
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--renk-glitch-bg').trim() || '#050505';
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${CHAR_H - 4}px 'JetBrains Mono', 'Courier New', monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = grid[i][j];
                // Yumuşak renk geçişi
                cell.color = lerpColor(cell.color, cell.targetColor, 0.15);
                const [r, g, b] = cell.color;
                // Parlak ve net karakterler
                const brightness = (r + g + b) / (3 * 255);
                const alpha = 0.7 + brightness * 0.3;
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.fillText(cell.char, j * CHAR_W, i * CHAR_H);
            }
        }

        // Hafif vignette (kenarları biraz koyulaştır)
        const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.8);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.25)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    let lastGlitchTime = 0;
    const glitchCanvas = document.getElementById('glitchTuvali');
    function animate(timestamp) {
        animId = requestAnimationFrame(animate);

        // Viewport dışındaysa render atla
        if (glitchCanvas) {
            const rect = glitchCanvas.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        }

        if (timestamp - lastGlitchTime >= GLITCH_SPEED) {
            updateGlitch();
            lastGlitchTime = timestamp;
        }
        renderGrid();
    }

    initGrid();
    requestAnimationFrame(animate);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initGrid();
        }, 200);
    });
});

// ==========================================
// 3. X-RAY HOVER EFEKTİ (FRAMER TARZI)
// ==========================================
(() => {
    const portreKapsayici = document.getElementById('portreKapsayici');
    const katmanNormal = document.getElementById('katmanNormal');
    if (!portreKapsayici || !katmanNormal) return;

    const REVEAL_RADIUS = 130; // px
    let isHovering = false;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let animFrame = null;

    function updateMask() {
        if (!isHovering) return;

        // Yumuşak takip (lerp)
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        // Yumuşak kenarlı delik (keskin değil, gradient geçiş)
        const mask = `radial-gradient(circle ${REVEAL_RADIUS}px at ${currentX}px ${currentY}px, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.8) 70%, black 85%)`;
        katmanNormal.style.webkitMaskImage = mask;
        katmanNormal.style.maskImage = mask;

        animFrame = requestAnimationFrame(updateMask);
    }

    portreKapsayici.addEventListener('mouseenter', () => {
        isHovering = true;
        katmanNormal.style.transition = 'none';
        animFrame = requestAnimationFrame(updateMask);
    });

    portreKapsayici.addEventListener('mousemove', (e) => {
        const rect = portreKapsayici.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    portreKapsayici.addEventListener('mouseleave', () => {
        isHovering = false;
        if (animFrame) cancelAnimationFrame(animFrame);

        // Fotoğrafı tekrar tam göster (küçülerek kapanış)
        let closeRadius = REVEAL_RADIUS;
        const closeX = currentX;
        const closeY = currentY;

        function closeAnim() {
            closeRadius -= 12;
            if (closeRadius <= 0) {
                katmanNormal.style.webkitMaskImage = 'none';
                katmanNormal.style.maskImage = 'none';
                return;
            }
            const mask = `radial-gradient(circle ${closeRadius}px at ${closeX}px ${closeY}px, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.8) 70%, black 85%)`;
            katmanNormal.style.webkitMaskImage = mask;
            katmanNormal.style.maskImage = mask;
            requestAnimationFrame(closeAnim);
        }
        requestAnimationFrame(closeAnim);
    });

    // Mobil dokunma desteği — yatay hareket X-ray açar, dikey scroll engellenmez
    let touchStartX = 0, touchStartY = 0, touchActive = false;

    portreKapsayici.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchActive = false;
    }, { passive: true });

    portreKapsayici.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const dx = Math.abs(touch.clientX - touchStartX);
        const dy = Math.abs(touch.clientY - touchStartY);

        // Sadece yatay hareket baskınsa X-ray aç (dikey scroll engellenmez)
        if (!touchActive && dx > 10 && dx > dy * 1.5) {
            touchActive = true;
        }

        if (touchActive) {
            const rect = portreKapsayici.getBoundingClientRect();
            mouseX = touch.clientX - rect.left;
            mouseY = touch.clientY - rect.top;
            if (!isHovering) {
                isHovering = true;
                katmanNormal.style.transition = 'none';
                animFrame = requestAnimationFrame(updateMask);
            }
        }
    }, { passive: true });

    portreKapsayici.addEventListener('touchend', () => {
        touchActive = false;
        isHovering = false;
        if (animFrame) cancelAnimationFrame(animFrame);
        // Küçülerek kapat
        let closeRadius = REVEAL_RADIUS;
        const closeX = currentX, closeY = currentY;
        function closeTouchAnim() {
            closeRadius -= 15;
            if (closeRadius <= 0) {
                katmanNormal.style.webkitMaskImage = 'none';
                katmanNormal.style.maskImage = 'none';
                return;
            }
            const mask = `radial-gradient(circle ${closeRadius}px at ${closeX}px ${closeY}px, transparent 0%, transparent 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.8) 70%, black 85%)`;
            katmanNormal.style.webkitMaskImage = mask;
            katmanNormal.style.maskImage = mask;
            requestAnimationFrame(closeTouchAnim);
        }
        requestAnimationFrame(closeTouchAnim);
    });
})();

// ==========================================
// 4. 3D AĞ & PARÇACIK MOTORU
// ==========================================
// Lazy: boot bitene kadar başlamaz
window._agirMotorlar.push(function parcacikMotorBaslat() {
// Mobilde parçacık motorunu devre dışı bırak (performans)
if (window.innerWidth < 768) return;
const tuval = document.getElementById('tuval');
const c = tuval.getContext('2d');
tuval.width = window.innerWidth;
tuval.height = window.innerHeight;

let fare = { x: null, y: null };
window.addEventListener('mousemove', (e) => { fare.x = e.x; fare.y = e.y; });
window.addEventListener('mouseout', () => { fare.x = undefined; fare.y = undefined; });

let hue = 170;
window._particleHue = hue;
const parcaciklar = [];
const PARCACIK_YOGUNLUK = 18000;
const BAGLANTI_MESAFE = 90;
const FARE_MESAFE = 150;

class Parcacik {
    constructor() {
        this.x = Math.random() * tuval.width;
        this.y = Math.random() * tuval.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.ovx = this.vx;
        this.ovy = this.vy;
        this.boyut = Math.random() * 1.8 + 0.5;
    }
    guncelle() {
        if (fare.x != null) {
            const dx = fare.x - this.x;
            const dy = fare.y - this.y;
            const dist = dx * dx + dy * dy;
            if (dist < FARE_MESAFE * FARE_MESAFE) {
                const d = Math.sqrt(dist);
                const f = (FARE_MESAFE - d) / FARE_MESAFE;
                this.vx += (dx / d) * f * 0.06;
                this.vy += (dy / d) * f * 0.06;
            } else {
                this.vx += (this.ovx - this.vx) * 0.06;
                this.vy += (this.ovy - this.vy) * 0.06;
            }
        } else {
            this.vx += (this.ovx - this.vx) * 0.06;
            this.vy += (this.ovy - this.vy) * 0.06;
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > tuval.width) { this.vx *= -1; this.ovx *= -1; }
        if (this.y < 0 || this.y > tuval.height) { this.vy *= -1; this.ovy *= -1; }
    }
}

function parcacikOlustur() {
    parcaciklar.length = 0;
    const count = (tuval.width * tuval.height) / PARCACIK_YOGUNLUK;
    for (let i = 0; i < count; i++) parcaciklar.push(new Parcacik());
}

let _hueFrame = 0;
function render() {
    requestAnimationFrame(render);
    c.clearRect(0, 0, tuval.width, tuval.height);
    hue += 0.12;
    window._particleHue = hue;
    // CSS custom property'yi her 5 frame'de güncelle (repaint azalt)
    if (++_hueFrame % 5 === 0) {
        document.documentElement.style.setProperty('--hue', hue);
    }

    const len = parcaciklar.length;
    c.fillStyle = `hsla(${hue}, 100%, 60%, 0.7)`;
    for (let i = 0; i < len; i++) {
        const p = parcaciklar[i];
        p.guncelle();
        c.beginPath();
        c.arc(p.x, p.y, p.boyut, 0, 6.28);
        c.fill();
    }

    const maxDist = BAGLANTI_MESAFE * BAGLANTI_MESAFE;
    c.lineWidth = 0.6;
    c.beginPath();
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const dx = parcaciklar[i].x - parcaciklar[j].x;
            if (dx > BAGLANTI_MESAFE || dx < -BAGLANTI_MESAFE) continue;
            const dy = parcaciklar[i].y - parcaciklar[j].y;
            if (dy > BAGLANTI_MESAFE || dy < -BAGLANTI_MESAFE) continue;
            const dist = dx * dx + dy * dy;
            if (dist < maxDist) {
                c.moveTo(parcaciklar[i].x, parcaciklar[i].y);
                c.lineTo(parcaciklar[j].x, parcaciklar[j].y);
            }
        }
    }
    c.strokeStyle = `hsla(${hue}, 80%, 50%, 0.15)`;
    c.stroke();

    if (fare.x != null) {
        c.lineWidth = 1;
        c.beginPath();
        for (let i = 0; i < len; i++) {
            const dx = fare.x - parcaciklar[i].x;
            const dy = fare.y - parcaciklar[i].y;
            const dist = dx * dx + dy * dy;
            if (dist < 40000) {
                c.moveTo(fare.x, fare.y);
                c.lineTo(parcaciklar[i].x, parcaciklar[i].y);
            }
        }
        c.strokeStyle = `hsla(${hue}, 100%, 70%, 0.3)`;
        c.stroke();
    }
}

window.addEventListener('resize', () => {
    tuval.width = innerWidth;
    tuval.height = innerHeight;
    parcacikOlustur();
});
parcacikOlustur();
render();
});

// Ağır motorları başlat (boot bitince çağrılır — sıralı, kasma önlenir)
window._baslatAgirMotorlar = function() {
    const motorlar = window._agirMotorlar || [];
    window._agirMotorlar = [];
    let i = 0;
    function siradaki() {
        if (i < motorlar.length) {
            motorlar[i++]();
            requestAnimationFrame(siradaki);
        }
    }
    requestAnimationFrame(siradaki);
};

// ==========================================
// 5. TYPING EFEKTİ
// ==========================================
const typingEl = document.getElementById('typing-text');
const cumleler = ["Full Stack Developer", "System Architect", "ASP.NET Core Developer", "Problem Solver", "UI/UX Enthusiast", "AI & Prompt Engineer"];
let ci = 0, hi = 0, sil = false;

function typeMotor() {
    const s = cumleler[ci];
    if (!sil) {
        typingEl.textContent = s.substring(0, hi + 1);
        hi++;
        if (hi === s.length) { sil = true; setTimeout(typeMotor, 2200); return; }
        setTimeout(typeMotor, 65);
    } else {
        typingEl.textContent = s.substring(0, hi - 1);
        hi--;
        if (hi === 0) { sil = false; ci = (ci + 1) % cumleler.length; setTimeout(typeMotor, 400); return; }
        setTimeout(typeMotor, 30);
    }
}
setTimeout(typeMotor, 2500);

// ==========================================
// 6. NAVİGASYON
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobilMenu = document.getElementById('mobil-menu');

window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('aktif');
    mobilMenu.classList.toggle('aktif');
    document.body.style.overflow = mobilMenu.classList.contains('aktif') ? 'hidden' : '';
});

document.querySelectorAll('.mobil-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('aktif');
        mobilMenu.classList.remove('aktif');
        document.body.style.overflow = '';
    });
});

// ==========================================
// 7. ÇOK YÖNLÜ SCROLL REVEAL MOTORU
// ==========================================
const scrollObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('gorunur');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim').forEach(el => {
    if (!el.closest('#ana-ekran')) scrollObs.observe(el);
});

// ==========================================
// 8. PARALLAX MOTORU
// ==========================================
(() => {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (!parallaxEls.length) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxEls.forEach(el => {
            const speed = parseFloat(el.dataset.parallax);
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
})();

// ==========================================
// 9. İSTATİSTİK SAYACI
// ==========================================
function sayaclariBaslat() {
    document.querySelectorAll('.istatistik-sayi').forEach(sayi => {
        const hedef = parseInt(sayi.dataset.hedef);
        let val = 0;
        const iv = setInterval(() => {
            val++;
            sayi.textContent = val;
            if (val >= hedef) clearInterval(iv);
        }, 80);
    });
}

// ==========================================
// 9. SMOOTH SCROLL (navbar offset ile)
// ==========================================
// Sayfa geçiş animasyonu yöneticisi
const sayfaGecis = document.getElementById('sayfaGecis');
let gecisAktif = false;

function gecisIleScrollYap(hedef) {
    if (gecisAktif || !hedef) return;
    gecisAktif = true;

    const navbarYukseklik = document.getElementById('navbar').offsetHeight;

    // 1. Şeritleri aşağı indir (sahneyi kapat)
    sayfaGecis.classList.remove('cikis');
    sayfaGecis.classList.add('giris');

    // 2. Şeritler kapandıktan sonra (400ms + 4*60ms = ~640ms) anında scroll yap
    setTimeout(() => {
        const hedefPozisyon = hedef.getBoundingClientRect().top + window.scrollY - navbarYukseklik - 20;
        if (lenis) {
            lenis.scrollTo(hedefPozisyon, { immediate: true });
        } else {
            window.scrollTo(0, hedefPozisyon);
        }

        // 3. Kısa bekleme sonra şeritleri aç (sahneyi aç)
        setTimeout(() => {
            sayfaGecis.classList.remove('giris');
            sayfaGecis.classList.add('cikis');

            setTimeout(() => {
                sayfaGecis.classList.remove('cikis');
                gecisAktif = false;
            }, 650);
        }, 100);
    }, 550);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const hedef = document.querySelector(this.getAttribute('href'));
        if (!hedef) return;

        // Hedef zaten görünürdeyse geçiş animasyonu olmadan direkt scroll
        const rect = hedef.getBoundingClientRect();
        const gorunurMu = rect.top >= -100 && rect.top <= window.innerHeight * 0.5;

        if (gorunurMu) {
            const navbarYukseklik = document.getElementById('navbar').offsetHeight;
            const offset = -(navbarYukseklik + 20);
            if (lenis) {
                lenis.scrollTo(hedef, { offset });
            } else {
                const pos = hedef.getBoundingClientRect().top + window.scrollY - navbarYukseklik - 20;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        } else {
            gecisIleScrollYap(hedef);
        }
    });
});

// ==========================================
// 10. İLETİŞİM FORMU (EmailJS)
// ==========================================
(() => {
    // EmailJS başlat — SEN BUNU KENDİ HESABINLA DEĞİŞTİRMELİSİN
    // https://www.emailjs.com adresinden ücretsiz hesap aç
    // Service ID, Template ID ve Public Key'ini aşağıya yaz
    const EMAILJS_PUBLIC_KEY = 'Bo16beLb1nd0W-st5';
    const EMAILJS_SERVICE_ID = 'service_4akwrb6';
    const EMAILJS_TEMPLATE_ID = 'template_52zrbgs';

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const form = document.getElementById('iletisimFormu');
    const durumEl = document.getElementById('formDurum');
    const gonderBtn = document.getElementById('formGonderBtn');
    if (!form) return;

    const durumMetinleri = {
        tr: { gonderiliyor: 'Gönderiliyor...', basarili: 'Mesajınız gönderildi!', hata: 'Bir hata oluştu. Lütfen mail ile iletişime geçin.' },
        en: { gonderiliyor: 'Sending...', basarili: 'Your message has been sent!', hata: 'An error occurred. Please contact via email.' }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dil = DilYoneticisi.aktif();
        const mt = durumMetinleri[dil];

        // Honeypot spam kontrolü
        const honeypot = form.querySelector('[name="website"]');
        if (honeypot && honeypot.value) return;

        // EmailJS ayarlanmamışsa mailto fallback
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            const name = form.from_name.value;
            const email = form.from_email.value;
            const message = form.message.value;
            const subject = encodeURIComponent(`Portfolio İletişim: ${name}`);
            const body = encodeURIComponent(`Ad: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`);
            window.location.href = `mailto:erdi-ocal@hotmail.com?subject=${subject}&body=${body}`;
            durumEl.textContent = mt.basarili;
            durumEl.className = 'form-durum basarili';
            form.reset();
            if (typeof konfetiFirlat === 'function') konfetiFirlat();
            return;
        }

        // EmailJS ile gönder
        durumEl.textContent = mt.gonderiliyor;
        durumEl.className = 'form-durum';
        gonderBtn.disabled = true;
        const btnIcerik = gonderBtn.querySelector('.btn-icerik');
        const btnOk = gonderBtn.querySelector('.btn-ok');
        const orijinalMetin = btnIcerik ? btnIcerik.textContent : '';
        if (btnIcerik) btnIcerik.textContent = mt.gonderiliyor;
        if (btnOk) btnOk.style.display = 'none';
        gonderBtn.classList.add('yukleniyor');

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                durumEl.textContent = mt.basarili;
                durumEl.className = 'form-durum basarili';
                form.reset();
                if (typeof konfetiFirlat === 'function') konfetiFirlat();
            })
            .catch(() => {
                durumEl.textContent = mt.hata;
                durumEl.className = 'form-durum hata';
            })
            .finally(() => {
                gonderBtn.disabled = false;
                gonderBtn.classList.remove('yukleniyor');
                if (btnIcerik) btnIcerik.textContent = orijinalMetin;
                if (btnOk) btnOk.style.display = '';
            });
    });
})();

// ==========================================
// 11. 3D TİLT KART EFEKTİ
// ==========================================
(() => {
    const kartlar = document.querySelectorAll('.proje-kart');
    const MAX_TILT = 12; // derece

    kartlar.forEach(kart => {
        kart.addEventListener('mousemove', (e) => {
            const rect = kart.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * MAX_TILT;
            const rotateX = ((centerY - y) / centerY) * MAX_TILT;

            kart.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Işık yansıması pozisyonu
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            kart.style.setProperty('--mouse-x', percentX + '%');
            kart.style.setProperty('--mouse-y', percentY + '%');
        });

        kart.addEventListener('mouseleave', () => {
            kart.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
})();

// 12. CUSTOM CURSOR — kaldırıldı (normal mouse kullanılıyor)

// ==========================================
// 13. BLOG MODAL SİSTEMİ
// ==========================================
(() => {
    const overlay = document.getElementById('blogModalOverlay');
    const modal = document.getElementById('blogModal');
    const baslikEl = document.getElementById('blogModalBaslik');
    const kategoriEl = document.getElementById('blogModalKategori');
    const tarihEl = document.getElementById('blogModalTarih');
    const etiketlerEl = document.getElementById('blogModalEtiketler');
    const icerikEl = document.getElementById('blogModalIcerik');
    const kapatBtn = document.getElementById('blogModalKapat');
    if (!overlay) return;
    const blogFocusTrap = focusTrapKur(modal);

    const dil = () => DilYoneticisi.aktif();

    // Blog yazıları veritabanı
    const yazilar = {
        'react-vs-vanilla': {
            tr: {
                baslik: 'React vs Vanilla JS: Ne Zaman Hangisi?',
                kategori: 'Frontend',
                tarih: 'Mart 2026',
                etiketler: ['React', 'JavaScript', 'Performans'],
                icerik: `
                    <h3>Giriş</h3>
                    <p>Modern web dünyasında framework seçimi, projenin geleceğini belirleyen en kritik kararlardan biri. Her projeye React eklemek refleks haline geldi ama <strong>gerçekten her zaman doğru seçim mi?</strong></p>

                    <h3>Vanilla JS Ne Zaman Parlıyor?</h3>
                    <p>Bazı senaryolarda saf JavaScript, framework'lerden çok daha iyi performans gösterir:</p>
                    <ul>
                        <li><strong>Statik portfolyo siteleri</strong> — Bu site gibi! DOM manipülasyonu az, animasyonlar CSS + Canvas ile yapılıyor.</li>
                        <li><strong>Landing page'ler</strong> — Tek sayfalık tanıtım siteleri için 45KB'lık React bundle gereksiz.</li>
                        <li><strong>Küçük widget'lar</strong> — Embed edilecek hafif bileşenler.</li>
                        <li><strong>Performans kritik uygulamalar</strong> — Her milisaniyenin önemli olduğu yerler.</li>
                    </ul>
                    <pre>// Vanilla JS ile basit bir toggle
document.querySelector('.btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});</pre>

                    <h3>React Ne Zaman Şart?</h3>
                    <p>React'in gücü karmaşık state yönetimi ve bileşen tekrarı gerektiren projelerde ortaya çıkar:</p>
                    <ul>
                        <li><strong>Dashboard'lar</strong> — Gerçek zamanlı veri, tablolar, grafikler.</li>
                        <li><strong>E-ticaret</strong> — Sepet, filtreleme, ödeme akışı gibi iç içe state'ler.</li>
                        <li><strong>SaaS uygulamaları</strong> — Çok sayfalı, rol bazlı, API yoğun projeler.</li>
                        <li><strong>Takım projeleri</strong> — Component-based mimari, ekip içi tutarlılığı artırır.</li>
                    </ul>

                    <h3>Karar Matrisi</h3>
                    <p>Projenize karar verirken şu sorulara cevap arayın:</p>
                    <ul>
                        <li>Sayfada kaç bağımsız state var? → <strong>3'ten azsa:</strong> Vanilla yeterli.</li>
                        <li>Bileşen tekrarı var mı? → <strong>Evet:</strong> React mantıklı.</li>
                        <li>SEO kritik mi? → <strong>Evet:</strong> Next.js veya SSG düşünün.</li>
                        <li>Bundle boyutu önemli mi? → <strong>Evet:</strong> Vanilla veya Preact.</li>
                    </ul>

                    <h3>Sonuç</h3>
                    <p>Doğru araç, projeye göre değişir. <strong>Bu portfolyo sitesi saf JavaScript ile yazıldı</strong> — particle engine, X-ray efekti, 3D kartlar, tüm animasyonlar framework'süz. Sonuç: 0 dependency, anında yükleme, tam kontrol.</p>
                `
            },
            en: {
                baslik: 'React vs Vanilla JS: When to Use Which?',
                kategori: 'Frontend',
                tarih: 'March 2026',
                etiketler: ['React', 'JavaScript', 'Performance'],
                icerik: `
                    <h3>Introduction</h3>
                    <p>In the modern web world, choosing a framework is one of the most critical decisions that shapes a project's future. Adding React to every project has become a reflex, but <strong>is it always the right choice?</strong></p>

                    <h3>When Does Vanilla JS Shine?</h3>
                    <p>In certain scenarios, pure JavaScript outperforms frameworks significantly:</p>
                    <ul>
                        <li><strong>Static portfolio sites</strong> — Like this one! Minimal DOM manipulation, animations via CSS + Canvas.</li>
                        <li><strong>Landing pages</strong> — A 45KB React bundle is overkill for single-page promos.</li>
                        <li><strong>Small widgets</strong> — Lightweight embeddable components.</li>
                        <li><strong>Performance-critical apps</strong> — Where every millisecond counts.</li>
                    </ul>
                    <pre>// Simple toggle with Vanilla JS
document.querySelector('.btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});</pre>

                    <h3>When Is React Essential?</h3>
                    <p>React's power emerges in projects requiring complex state management and component reuse:</p>
                    <ul>
                        <li><strong>Dashboards</strong> — Real-time data, tables, charts.</li>
                        <li><strong>E-commerce</strong> — Cart, filtering, payment flows with nested states.</li>
                        <li><strong>SaaS applications</strong> — Multi-page, role-based, API-heavy projects.</li>
                        <li><strong>Team projects</strong> — Component-based architecture ensures team consistency.</li>
                    </ul>

                    <h3>Decision Matrix</h3>
                    <p>Ask these questions when deciding:</p>
                    <ul>
                        <li>How many independent states on the page? → <strong>Less than 3:</strong> Vanilla is enough.</li>
                        <li>Component reuse needed? → <strong>Yes:</strong> React makes sense.</li>
                        <li>Is SEO critical? → <strong>Yes:</strong> Consider Next.js or SSG.</li>
                        <li>Does bundle size matter? → <strong>Yes:</strong> Vanilla or Preact.</li>
                    </ul>

                    <h3>Conclusion</h3>
                    <p>The right tool depends on the project. <strong>This portfolio was built with pure JavaScript</strong> — particle engine, X-ray effect, 3D cards, all animations without any framework. Result: 0 dependencies, instant loading, full control.</p>
                `
            }
        },
        'css-xray-efekti': {
            tr: {
                baslik: 'CSS Mask ile X-Ray Efekti Nasıl Yapılır?',
                kategori: 'CSS',
                tarih: 'Şubat 2026',
                etiketler: ['CSS', 'Canvas', 'Animasyon'],
                icerik: `
                    <h3>Perde Arkası</h3>
                    <p>Bu portfolyödeki fotoğraf hover efekti, <strong>Framer'ın ünlü X-Ray bileşeninden</strong> ilham alıyor. Fare ile fotoğrafın üzerine geldiğinizde, bir daire içinde kod matrisi görünür. İşte bu efektin nasıl çalıştığı.</p>

                    <h3>Katmanlı Mimari</h3>
                    <p>Efekt 4 katmandan oluşuyor:</p>
                    <ol>
                        <li><strong>Glitch Canvas (z-index: 1)</strong> — Rastgele harf ve sembollerle dolu bir canvas. Renkleri particle network ile senkronize.</li>
                        <li><strong>CRT Overlay (z-index: 2)</strong> — Eski monitör tarama çizgileri efekti.</li>
                        <li><strong>CRT Flicker (z-index: 3)</strong> — Titreşim animasyonu.</li>
                        <li><strong>Normal Fotoğraf (z-index: 5)</strong> — En üstte, mask ile delik açılıyor.</li>
                    </ol>

                    <h3>Sihirli Kısım: CSS Mask</h3>
                    <p>Fotoğrafın altındaki kodu göstermek için <code>mask-image</code> ile bir delik açıyoruz:</p>
                    <pre>// Mouse pozisyonunda radial-gradient mask
const mask = \`radial-gradient(
    circle 130px at \${x}px \${y}px,
    transparent 0%, transparent 35%,
    rgba(0,0,0,0.4) 55%,
    rgba(0,0,0,0.8) 70%,
    black 85%
)\`;
element.style.maskImage = mask;</pre>
                    <p><code>transparent</code> kısımlar deliği oluşturur, <code>black</code> kısımlar fotoğrafı gösterir. Gradient geçişi sayesinde kenarlar yumuşak.</p>

                    <h3>Silüet Maskeleme</h3>
                    <p>Glitch canvas'ın fotoğraf dışına taşmaması için PNG silüet kullanılıyor:</p>
                    <pre>.glitch-katman, .crt-overlay {
    mask-image: url('erdi-portrait.png');
    mask-size: contain;
    mask-position: bottom center;
    mask-repeat: no-repeat;
}</pre>

                    <h3>Renk Senkronizasyonu</h3>
                    <p>Glitch harfleri, arka plan particle ağının rengini takip eder. <code>window._particleHue</code> değişkeni üzerinden HSL renk paylaşılır ve <code>hslToRgb</code> ile canvas'a uygulanır.</p>

                    <h3>Sonuç</h3>
                    <p>Sıfır framework, sıfır kütüphane — sadece <strong>CSS mask-image + Canvas API + matematiksel renk interpolasyonu</strong>. Efektin tamamı ~120 satır JavaScript.</p>
                `
            },
            en: {
                baslik: 'How to Create an X-Ray Effect with CSS Mask?',
                kategori: 'CSS',
                tarih: 'February 2026',
                etiketler: ['CSS', 'Canvas', 'Animation'],
                icerik: `
                    <h3>Behind the Scenes</h3>
                    <p>The photo hover effect in this portfolio is inspired by <strong>Framer's famous X-Ray component</strong>. When you hover over the photo, a code matrix appears within a circle. Here's how it works.</p>

                    <h3>Layered Architecture</h3>
                    <p>The effect consists of 4 layers:</p>
                    <ol>
                        <li><strong>Glitch Canvas (z-index: 1)</strong> — A canvas filled with random letters and symbols. Colors synced with the particle network.</li>
                        <li><strong>CRT Overlay (z-index: 2)</strong> — Old monitor scan line effect.</li>
                        <li><strong>CRT Flicker (z-index: 3)</strong> — Flicker animation.</li>
                        <li><strong>Normal Photo (z-index: 5)</strong> — On top, with a hole opened via mask.</li>
                    </ol>

                    <h3>The Magic: CSS Mask</h3>
                    <p>To reveal the code beneath the photo, we create a hole using <code>mask-image</code>:</p>
                    <pre>// Radial-gradient mask at mouse position
const mask = \`radial-gradient(
    circle 130px at \${x}px \${y}px,
    transparent 0%, transparent 35%,
    rgba(0,0,0,0.4) 55%,
    rgba(0,0,0,0.8) 70%,
    black 85%
)\`;
element.style.maskImage = mask;</pre>
                    <p><code>transparent</code> areas create the hole, <code>black</code> areas show the photo. Gradient transitions create soft edges.</p>

                    <h3>Silhouette Masking</h3>
                    <p>To prevent the glitch canvas from spilling outside the photo, a PNG silhouette is used:</p>
                    <pre>.glitch-layer, .crt-overlay {
    mask-image: url('erdi-portrait.png');
    mask-size: contain;
    mask-position: bottom center;
    mask-repeat: no-repeat;
}</pre>

                    <h3>Color Synchronization</h3>
                    <p>Glitch characters follow the background particle network's color. The HSL color is shared via <code>window._particleHue</code> and applied to the canvas using <code>hslToRgb</code>.</p>

                    <h3>Conclusion</h3>
                    <p>Zero frameworks, zero libraries — just <strong>CSS mask-image + Canvas API + mathematical color interpolation</strong>. The entire effect is ~120 lines of JavaScript.</p>
                `
            }
        },
        'vercel-deploy': {
            tr: {
                baslik: 'Vercel ile Ücretsiz Deploy: Adım Adım Rehber',
                kategori: 'DevOps',
                tarih: 'Aralık 2025',
                etiketler: ['Vercel', 'CI/CD', 'GitHub'],
                icerik: `
                    <h3>Neden Vercel?</h3>
                    <p>Statik siteler ve frontend projeleri için Vercel, <strong>en hızlı ve en kolay deploy çözümü</strong>. Ücretsiz plan: sınırsız deploy, HTTPS, global CDN, custom domain.</p>

                    <h3>Adım 1: GitHub Deposu Hazırla</h3>
                    <p>Projenizi GitHub'a push'layın. Vercel, repo'nuzu doğrudan okuyacak:</p>
                    <pre>git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/user/repo.git
git push -u origin main</pre>

                    <h3>Adım 2: Vercel'e Bağlan</h3>
                    <p><strong>vercel.com</strong>'a gidin ve GitHub hesabınızla giriş yapın. "New Project" butonuna tıklayıp repo'nuzu seçin.</p>
                    <ul>
                        <li><strong>Framework Preset:</strong> "Other" (statik site için)</li>
                        <li><strong>Build Command:</strong> Boş bırakın</li>
                        <li><strong>Output Directory:</strong> <code>./</code> (root)</li>
                    </ul>

                    <h3>Adım 3: Custom Domain</h3>
                    <p>Vercel dashboard'da "Domains" sekmesine gidin. Domain'inizi ekleyin ve DNS ayarlarını yapın:</p>
                    <pre>Tip: A     | Ad: @    | Değer: 76.76.21.21
Tip: CNAME | Ad: www  | Değer: cname.vercel-dns.com</pre>
                    <p>DNS yayılımı genellikle 10 dakika ile 24 saat arasında sürer. Vercel otomatik olarak <strong>SSL sertifikası</strong> oluşturur.</p>

                    <h3>Adım 4: Otomatik CI/CD</h3>
                    <p>Artık her <code>git push</code> otomatik deploy tetikler:</p>
                    <ol>
                        <li>Kod'u değiştirin</li>
                        <li><code>git add . && git commit -m "update" && git push</code></li>
                        <li>Vercel otomatik build + deploy yapar (~15 saniye)</li>
                        <li>Preview URL ile test edin, sonra production'a promote edin</li>
                    </ol>

                    <h3>Bonus: Environment Variables</h3>
                    <p>API key'ler gibi hassas değerler için Vercel dashboard'daki "Environment Variables" bölümünü kullanın. Asla repo'ya commit etmeyin!</p>

                    <h3>Sonuç</h3>
                    <p>Bu portfolyo sitesi tam olarak bu yöntemle deploy edildi: <strong>GitHub push → Vercel otomatik build → erdiocal.com'da canlı</strong>. Toplam maliyet: 0₺.</p>
                `
            },
            en: {
                baslik: 'Free Deployment with Vercel: Step-by-Step Guide',
                kategori: 'DevOps',
                tarih: 'December 2025',
                etiketler: ['Vercel', 'CI/CD', 'GitHub'],
                icerik: `
                    <h3>Why Vercel?</h3>
                    <p>For static sites and frontend projects, Vercel is the <strong>fastest and easiest deploy solution</strong>. Free plan: unlimited deploys, HTTPS, global CDN, custom domain.</p>

                    <h3>Step 1: Prepare GitHub Repository</h3>
                    <p>Push your project to GitHub. Vercel will read your repo directly:</p>
                    <pre>git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/user/repo.git
git push -u origin main</pre>

                    <h3>Step 2: Connect to Vercel</h3>
                    <p>Go to <strong>vercel.com</strong> and sign in with your GitHub account. Click "New Project" and select your repo.</p>
                    <ul>
                        <li><strong>Framework Preset:</strong> "Other" (for static sites)</li>
                        <li><strong>Build Command:</strong> Leave empty</li>
                        <li><strong>Output Directory:</strong> <code>./</code> (root)</li>
                    </ul>

                    <h3>Step 3: Custom Domain</h3>
                    <p>Go to "Domains" tab in Vercel dashboard. Add your domain and configure DNS:</p>
                    <pre>Type: A     | Name: @   | Value: 76.76.21.21
Type: CNAME | Name: www | Value: cname.vercel-dns.com</pre>
                    <p>DNS propagation typically takes 10 minutes to 24 hours. Vercel automatically generates an <strong>SSL certificate</strong>.</p>

                    <h3>Step 4: Automatic CI/CD</h3>
                    <p>Now every <code>git push</code> triggers an automatic deploy:</p>
                    <ol>
                        <li>Make your changes</li>
                        <li><code>git add . && git commit -m "update" && git push</code></li>
                        <li>Vercel auto-builds and deploys (~15 seconds)</li>
                        <li>Test with preview URL, then promote to production</li>
                    </ol>

                    <h3>Bonus: Environment Variables</h3>
                    <p>For sensitive values like API keys, use the "Environment Variables" section in Vercel dashboard. Never commit them to the repo!</p>

                    <h3>Conclusion</h3>
                    <p>This portfolio site was deployed exactly this way: <strong>GitHub push → Vercel auto-build → live on erdiocal.com</strong>. Total cost: $0.</p>
                `
            }
        }
    };

    function modalAc(blogId) {
        const d = dil();
        const yazi = yazilar[blogId];
        if (!yazi || !yazi[d]) return;
        const data = yazi[d];

        baslikEl.textContent = data.baslik;
        kategoriEl.textContent = data.kategori;
        tarihEl.textContent = data.tarih;
        etiketlerEl.innerHTML = data.etiketler.map(e => `<span>${e}</span>`).join('');
        icerikEl.innerHTML = data.icerik;

        overlay.classList.add('aktif');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        blogFocusTrap.aktif();
    }

    function modalKapat() {
        overlay.classList.remove('aktif');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
        blogFocusTrap.deaktif();
    }

    // Kart tıklama
    document.querySelectorAll('.blog-kart').forEach(kart => {
        // "Oku →" butonuna tıklama
        const okuBtn = kart.querySelector('.blog-oku');
        if (okuBtn) {
            okuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const blogId = kart.dataset.blog;
                if (blogId) modalAc(blogId);
            });
        }
        // Kart'ın kendisine tıklama
        kart.style.cursor = 'pointer';
        kart.addEventListener('click', () => {
            const blogId = kart.dataset.blog;
            if (blogId) modalAc(blogId);
        });
    });

    // Kapatma
    kapatBtn.addEventListener('click', modalKapat);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modalKapat();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('aktif')) modalKapat();
    });
})();

// ==========================================
// 14. PROJE DETAY MODAL SİSTEMİ
// ==========================================
(() => {
    const overlay = document.getElementById('projeModalOverlay');
    const baslikEl = document.getElementById('projeModalBaslik');
    const numaraEl = document.getElementById('projeModalNumara');
    const etiketlerEl = document.getElementById('projeModalEtiketler');
    const icerikEl = document.getElementById('projeModalIcerik');
    const kapatBtn = document.getElementById('projeModalKapat');
    const projeModal = document.getElementById('projeModal');
    if (!overlay) return;
    const projeFocusTrap = focusTrapKur(projeModal);

    const dil = () => DilYoneticisi.aktif();

    const projeler = {
        erdihub: {
            numara: '01',
            etiketler: ['JavaScript', 'HTML/CSS', 'TMDB API', 'UI/UX', 'Responsive'],
            tr: {
                baslik: 'Netflix Klonu',
                icerik: `
                    <h3>Problem</h3>
                    <p>Modern bir yayın platformu arayüzü oluşturmak — kullanıcı profil yönetimi, dinamik içerik listeleme ve responsive tasarım gerektiren kapsamlı bir frontend projesi.</p>
                    <h3>Çözüm</h3>
                    <ul>
                        <li>TMDB API entegrasyonu ile gerçek film/dizi verileri</li>
                        <li>Kullanıcı profil seçim ekranı (Netflix deneyimi)</li>
                        <li>Kategori bazlı dinamik içerik kaydırma (carousel)</li>
                        <li>Film detay sayfaları ve trailer önizleme</li>
                        <li>Tam responsive tasarım — mobil, tablet, masaüstü</li>
                    </ul>
                    <h3>Sonuç</h3>
                    <p>Vanilla JavaScript ile sıfır framework kullanarak, Netflix'in temel kullanıcı deneyimini başarıyla yeniden oluşturduk. API yönetimi, state management ve karmaşık UI pattern'ları konusunda derin deneyim kazandık.</p>
                `
            },
            en: {
                baslik: 'Netflix Clone',
                icerik: `
                    <h3>Problem</h3>
                    <p>Building a modern streaming platform interface — a comprehensive frontend project requiring user profile management, dynamic content listing, and responsive design.</p>
                    <h3>Solution</h3>
                    <ul>
                        <li>TMDB API integration for real movie/show data</li>
                        <li>User profile selection screen (Netflix experience)</li>
                        <li>Category-based dynamic content carousels</li>
                        <li>Movie detail pages and trailer previews</li>
                        <li>Fully responsive design — mobile, tablet, desktop</li>
                    </ul>
                    <h3>Result</h3>
                    <p>Successfully recreated Netflix's core UX using Vanilla JavaScript with zero frameworks. Gained deep experience in API management, state management, and complex UI patterns.</p>
                `
            }
        },
        qrmenu: {
            numara: '02',
            etiketler: ['ASP.NET Core', 'Bootstrap', 'SQL Server', 'REST API', 'QR Code'],
            tr: {
                baslik: 'QR Menü Sistemi',
                icerik: `
                    <h3>Problem</h3>
                    <p>Restoran zincirlerinin pandemi sonrası temassız menü ihtiyacı. Basılı menü maliyetleri yüksek, güncelleme süreci yavaş ve hijyen endişeleri mevcut.</p>
                    <h3>Çözüm</h3>
                    <ul>
                        <li>ASP.NET Core MVC ile admin paneli — menü CRUD işlemleri</li>
                        <li>Dinamik QR kod oluşturma (masa bazlı)</li>
                        <li>Kategori yönetimi, fiyat güncelleme, stok takibi</li>
                        <li>Mobil-öncelikli müşteri arayüzü</li>
                        <li>Çoklu restoran desteği (multi-tenant mimari)</li>
                    </ul>
                    <h3>Sonuç</h3>
                    <p>Shaperon Works olarak basılı menü maliyetlerini sıfıra indirdik. Menü güncellemeleri anlık yapılabilir hale geldi. Sipariş hızı %50 arttı. Sistem şu anda aktif olarak kullanılmakta.</p>
                `
            },
            en: {
                baslik: 'QR Menu System',
                icerik: `
                    <h3>Problem</h3>
                    <p>Restaurant chains' post-pandemic need for contactless menus. High printed menu costs, slow update process, and hygiene concerns.</p>
                    <h3>Solution</h3>
                    <ul>
                        <li>ASP.NET Core MVC admin panel — menu CRUD operations</li>
                        <li>Dynamic QR code generation (table-based)</li>
                        <li>Category management, price updates, stock tracking</li>
                        <li>Mobile-first customer interface</li>
                        <li>Multi-restaurant support (multi-tenant architecture)</li>
                    </ul>
                    <h3>Result</h3>
                    <p>As Shaperon Works, we reduced printed menu costs to zero. Menu updates became instant. Order speed increased by 50%. System is currently in active use.</p>
                `
            }
        },
        haliflex: {
            numara: '03',
            etiketler: ['HTML/CSS', 'JavaScript', 'SEO', 'WhatsApp API', 'Responsive'],
            tr: {
                baslik: 'Halıflex — Kurumsal Web Sitesi',
                icerik: `
                    <h3>Problem</h3>
                    <p>Bir işletmenin dijital varlığı yoktu. Müşteriler işletmeyi bulmakta zorlanıyor, sipariş süreci tamamen telefonla yürütülüyordu.</p>
                    <h3>Çözüm</h3>
                    <ul>
                        <li>SEO odaklı kurumsal web sitesi tasarımı</li>
                        <li>WhatsApp Business API ile tek tıkla iletişim</li>
                        <li>Google Maps entegrasyonu ve SEO optimizasyonu</li>
                        <li>Hizmet katalogu ve fiyat listesi modülleri</li>
                        <li>Mobil uyumlu tasarım (müşterilerin %80'i mobil)</li>
                    </ul>
                    <h3>Sonuç</h3>
                    <p>Shaperon Works olarak müşterinin dijital varlığını sıfırdan oluşturduk. Müşteri talepleri gözle görülür şekilde arttı. WhatsApp entegrasyonu sayesinde iletişim süreci hızlandı. Bu proje, kurumsal web sitesi oluşturma kapasitemizin kanıtı oldu.</p>
                `
            },
            en: {
                baslik: 'Halıflex — Corporate Website',
                icerik: `
                    <h3>Problem</h3>
                    <p>A business had no digital presence. Customers struggled to find the business, and orders were handled entirely by phone.</p>
                    <h3>Solution</h3>
                    <ul>
                        <li>SEO-focused corporate website design</li>
                        <li>One-click contact via WhatsApp Business API</li>
                        <li>Google Maps integration and SEO optimization</li>
                        <li>Service catalog and pricing modules</li>
                        <li>Mobile-responsive design (80% of customers are mobile)</li>
                    </ul>
                    <h3>Result</h3>
                    <p>As Shaperon Works, we built the client's digital presence from scratch. Customer inquiries increased visibly. Communication sped up thanks to WhatsApp integration. This project proved our capability to create corporate websites.</p>
                `
            }
        }
    };

    function projeModalAc(projeId) {
        const d = dil();
        const proje = projeler[projeId];
        if (!proje || !proje[d]) return;
        const data = proje[d];

        numaraEl.textContent = proje.numara;
        baslikEl.textContent = data.baslik;
        etiketlerEl.innerHTML = proje.etiketler.map(e => `<span>${e}</span>`).join('');
        icerikEl.innerHTML = data.icerik;

        overlay.classList.add('aktif');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        projeFocusTrap.aktif();
    }

    function projeModalKapat() {
        overlay.classList.remove('aktif');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
        projeFocusTrap.deaktif();
    }

    document.querySelectorAll('.proje-kart').forEach(kart => {
        kart.style.cursor = 'pointer';
        kart.addEventListener('click', () => {
            const projeId = kart.dataset.proje;
            if (projeId) projeModalAc(projeId);
        });
    });

    kapatBtn.addEventListener('click', projeModalKapat);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) projeModalKapat();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('aktif')) projeModalKapat();
    });
})();

// ==========================================
// 15. MANYETİK BUTON EFEKTİ
// ==========================================
(() => {
    // Dokunmatik cihazlarda devre dışı
    if ('ontouchstart' in window) return;

    const selektor = '.btn, .nav-link, .nav-link-ozel, .footer-sosyal a, .blog-oku, .tema-btn, .dil-btn';
    const KUVVET = 0.35;   // ne kadar çekilsin (0-1)
    const MESAFE = 60;     // px — tetikleme mesafesi

    function bagla(el) {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const merkezX = rect.left + rect.width / 2;
            const merkezY = rect.top + rect.height / 2;
            const dx = e.clientX - merkezX;
            const dy = e.clientY - merkezY;

            el.style.transform = `translate(${dx * KUVVET}px, ${dy * KUVVET}px) scale(1.05)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    document.querySelectorAll(selektor).forEach(bagla);

    // Dinamik eklenen elementler için MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;
                if (node.matches && node.matches(selektor)) bagla(node);
                if (node.querySelectorAll) {
                    node.querySelectorAll(selektor).forEach(bagla);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

// ==========================================
// 15. SCROLL PROGRESS BAR
// ==========================================
(() => {
    const bar = document.getElementById('scrollIlerleme');
    if (!bar) return;

    function guncelle() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const yuzde = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = yuzde + '%';
    }

    window.addEventListener('scroll', guncelle, { passive: true });
    guncelle();
})();

// ==========================================
// 15.5. HERO SCROLL INDICATOR
// ==========================================
(() => {
    const ind = document.getElementById('scrollIndicator');
    if (!ind) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            ind.classList.add('gizli');
        } else {
            ind.classList.remove('gizli');
        }
    }, { passive: true });
})();

// ==========================================
// 15.6. YUKARI ÇIK BUTONU
// ==========================================
(() => {
    const btn = document.getElementById('yukariBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('gorunur');
        } else {
            btn.classList.remove('gorunur');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
})();

// ==========================================
// 16. TEXT SCRAMBLE EFEKTİ
// ==========================================
(() => {
    if ('ontouchstart' in window) return;

    const KARAKTERLER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>/';
    const HIZI = 40;       // ms per frame
    const ADIM = 3;        // her frame'de kaç harf çözülsün

    function scramble(el) {
        const orijinal = el.getAttribute('data-scramble-orijinal') || el.textContent;
        if (!el.getAttribute('data-scramble-orijinal')) {
            el.setAttribute('data-scramble-orijinal', orijinal);
        }

        let cozulen = 0;
        const uzunluk = orijinal.length;

        const interval = setInterval(() => {
            let sonuc = '';
            for (let i = 0; i < uzunluk; i++) {
                if (orijinal[i] === ' ') {
                    sonuc += ' ';
                } else if (i < cozulen) {
                    sonuc += orijinal[i];
                } else {
                    sonuc += KARAKTERLER[Math.floor(Math.random() * KARAKTERLER.length)];
                }
            }
            el.textContent = sonuc;
            cozulen += ADIM;

            if (cozulen >= uzunluk) {
                clearInterval(interval);
                el.textContent = orijinal;
            }
        }, HIZI);
    }

    // Bölüm başlıklarına uygula
    document.querySelectorAll('.bolum-baslik').forEach(el => {
        el.addEventListener('mouseenter', () => scramble(el));
    });

    // Nav linklere uygula
    document.querySelectorAll('.nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => scramble(el));
    });
})();

// ==========================================
// 17. KONFETİ EFEKTİ (FORM BAŞARI)
// ==========================================
function konfetiFirlat() {
    const renkler = ['#00ffcc', '#00b894', '#fff', '#ffd700', '#ff6b6b', '#a29bfe', '#fd79a8'];
    const PARCA_SAYISI = 50;

    for (let i = 0; i < PARCA_SAYISI; i++) {
        const parca = document.createElement('div');
        parca.className = 'konfeti-parca';
        parca.style.left = Math.random() * 100 + 'vw';
        parca.style.top = '-10px';
        parca.style.backgroundColor = renkler[Math.floor(Math.random() * renkler.length)];
        parca.style.width = (Math.random() * 8 + 5) + 'px';
        parca.style.height = (Math.random() * 8 + 5) + 'px';
        parca.style.animationDelay = (Math.random() * 0.8) + 's';
        parca.style.animationDuration = (Math.random() * 1 + 1) + 's';
        document.body.appendChild(parca);

        setTimeout(() => parca.remove(), 2500);
    }
}

// ==========================================
// 19. EASTER EGG — KONAMI CODE
// ==========================================
(() => {
    const kod = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let adim = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === kod[adim]) {
            adim++;
            if (adim === kod.length) {
                adim = 0;
                easterEggCalistir();
            }
        } else {
            adim = 0;
        }
    });

    function easterEggCalistir() {
        // Matrix efekti — ekranda yeşil karakterler yağsın
        if (typeof konfetiFirlat === 'function') konfetiFirlat();

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;';
        document.body.appendChild(overlay);

        const chars = 'アイウエオカキクケコサシスセソタチツテト01';
        for (let i = 0; i < 40; i++) {
            const col = document.createElement('div');
            col.style.cssText = `position:absolute;top:-100%;left:${Math.random()*100}vw;font-family:var(--font-kod);font-size:${12+Math.random()*14}px;color:#00ffcc;opacity:${0.3+Math.random()*0.5};writing-mode:vertical-rl;animation:matrixFall ${2+Math.random()*3}s linear ${Math.random()*2}s forwards;white-space:nowrap;`;
            let txt = '';
            for (let j = 0; j < 20; j++) txt += chars[Math.floor(Math.random()*chars.length)];
            col.textContent = txt;
            overlay.appendChild(col);
        }

        setTimeout(() => overlay.remove(), 6000);
    }

    // CSS animasyonu ekle
    if (!document.getElementById('easterEggStyle')) {
        const s = document.createElement('style');
        s.id = 'easterEggStyle';
        s.textContent = '@keyframes matrixFall{0%{top:-20%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:110%;opacity:0}}';
        document.head.appendChild(s);
    }
})();

// ==========================================
// 20. COOKIE BANNER & GA KONTROL
// ==========================================
(() => {
    const banner = document.getElementById('cookieBanner');
    const kabulBtn = document.getElementById('cookieKabul');
    const reddetBtn = document.getElementById('cookieReddet');
    if (!banner) return;

    const tercih = localStorage.getItem('cookie-tercih');

    if (!tercih) {
        // İlk ziyaret — banner göster
        banner.style.display = 'flex';
    } else if (tercih === 'kabul') {
        // Daha önce kabul etti — GA çalışsın
        gaBaslat();
    }
    // 'reddet' ise hiçbir şey yapma

    kabulBtn?.addEventListener('click', () => {
        localStorage.setItem('cookie-tercih', 'kabul');
        banner.style.display = 'none';
        gaBaslat();
    });

    reddetBtn?.addEventListener('click', () => {
        localStorage.setItem('cookie-tercih', 'reddet');
        banner.style.display = 'none';
        gaDeaktif();
    });

    function gaBaslat() {
        // GA zaten head'de yüklü, opt-out'u kaldır
        window['ga-disable-G-VGZ26N6CFE'] = false;
    }

    function gaDeaktif() {
        // GA'yı devre dışı bırak
        window['ga-disable-G-VGZ26N6CFE'] = true;
    }
})();
