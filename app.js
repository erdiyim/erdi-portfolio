// ==========================================
// -1. SAYFA YENİLEMEDE EN YUKARI + SCROLL KİLİDİ
// ==========================================
window.scrollTo(0, 0);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
document.body.style.overflow = 'hidden'; // Boot ekranı bitene kadar scroll kapalı

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
// 1. SİNEMATİK GİRİŞ MOTORU
// ==========================================
(() => {
    const acilisEkrani = document.getElementById('acilis-ekrani');
    const kodSatirlari = document.getElementById('kodSatirlari');
    const bootIpucu = document.getElementById('bootIpucu');
    const monitorCerceve = document.querySelector('.monitor-cerceve');
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

    let satirIndex = 0;
    let hazir = false;
    let girisYapildi = false;

    function satirEkle() {
        if (satirIndex >= kodlar.length) {
            hazir = true;
            bootIpucu.innerHTML = bt.ipucu;
            bootIpucu.classList.add('hazir');
            return;
        }
        const satirHTML = `<div><span class="kod-satir-numara">${String(satirIndex + 1).padStart(2, '0')}</span>${kodlar[satirIndex]}</div>`;
        kodSatirlari.innerHTML += satirHTML;
        satirIndex++;
        kodSatirlari.scrollTop = kodSatirlari.scrollHeight;
        const gecikme = kodlar[satirIndex - 1] === '' ? 80 : Math.random() * 60 + 40;
        setTimeout(satirEkle, gecikme);
    }
    setTimeout(satirEkle, 600);

    function girisYap() {
        if (!hazir || girisYapildi) return;
        girisYapildi = true;

        monitorCerceve.classList.add('zoom');

        setTimeout(() => { zoomGecis.classList.add('aktif'); }, 500);

        setTimeout(() => {
            acilisEkrani.classList.add('kapaniyor');
            acilisEkrani.style.display = 'none';
            document.body.style.overflow = ''; // Scroll kilidini aç
            navbar.classList.add('gorunur');
            document.querySelectorAll('#ana-ekran .anim').forEach(el => el.classList.add('gorunur'));
            sayaclariBaslat();
        }, 1100);

        setTimeout(() => { zoomGecis.classList.remove('aktif'); }, 1300);
    }

    window.addEventListener('keydown', (e) => { if (e.key === 'Enter') girisYap(); });
    acilisEkrani.addEventListener('click', girisYap);
})();

// ==========================================
// 2. LETTER GLITCH MOTORU (Framer tarzı)
// ==========================================
(() => {
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
    function animate(timestamp) {
        animId = requestAnimationFrame(animate);

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
})();

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
const PARCACIK_YOGUNLUK = 12000;
const BAGLANTI_MESAFE = 120;
const FARE_MESAFE = 180;

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

function render() {
    requestAnimationFrame(render);
    c.clearRect(0, 0, tuval.width, tuval.height);
    hue += 0.12;
    window._particleHue = hue;
    document.documentElement.style.setProperty('--hue', hue);

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
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const dx = parcaciklar[i].x - parcaciklar[j].x;
            if (dx > BAGLANTI_MESAFE || dx < -BAGLANTI_MESAFE) continue;
            const dy = parcaciklar[i].y - parcaciklar[j].y;
            if (dy > BAGLANTI_MESAFE || dy < -BAGLANTI_MESAFE) continue;
            const dist = dx * dx + dy * dy;
            if (dist < maxDist) {
                const alpha = (1 - dist / maxDist) * 0.3;
                c.strokeStyle = `hsla(${hue}, 80%, 50%, ${alpha})`;
                c.lineWidth = 0.6;
                c.beginPath();
                c.moveTo(parcaciklar[i].x, parcaciklar[i].y);
                c.lineTo(parcaciklar[j].x, parcaciklar[j].y);
                c.stroke();
            }
        }
    }

    if (fare.x != null) {
        for (let i = 0; i < len; i++) {
            const dx = fare.x - parcaciklar[i].x;
            const dy = fare.y - parcaciklar[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                c.strokeStyle = `hsla(${hue}, 100%, 70%, ${(1 - dist / 200) * 0.5})`;
                c.lineWidth = 1;
                c.beginPath();
                c.moveTo(fare.x, fare.y);
                c.lineTo(parcaciklar[i].x, parcaciklar[i].y);
                c.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    tuval.width = innerWidth;
    tuval.height = innerHeight;
    parcacikOlustur();
});
parcacikOlustur();
render();

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

window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });

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
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const hedef = document.querySelector(this.getAttribute('href'));
        if (hedef) {
            const navbarYukseklik = document.getElementById('navbar').offsetHeight;
            const hedefPozisyon = hedef.getBoundingClientRect().top + window.scrollY - navbarYukseklik - 20;
            window.scrollTo({ top: hedefPozisyon, behavior: 'smooth' });
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
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // emailjs.com > Account > Public Key
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // emailjs.com > Email Services
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // emailjs.com > Email Templates

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
            return;
        }

        // EmailJS ile gönder
        durumEl.textContent = mt.gonderiliyor;
        durumEl.className = 'form-durum';
        gonderBtn.disabled = true;

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                durumEl.textContent = mt.basarili;
                durumEl.className = 'form-durum basarili';
                form.reset();
            })
            .catch(() => {
                durumEl.textContent = mt.hata;
                durumEl.className = 'form-durum hata';
            })
            .finally(() => { gonderBtn.disabled = false; });
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

// ==========================================
// 12. CURSOR TRAIL (IŞIK İZİ) EFEKTİ
// ==========================================
(() => {
    // Mobil cihazlarda çalışmasın
    if (window.matchMedia('(hover: none)').matches) return;

    const TRAIL_COUNT = 8;
    const trails = [];

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'cursor-trail';
        document.body.appendChild(el);
        trails.push({ el, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        const currentHue = (window._particleHue || 170) % 360;

        trails.forEach((trail, i) => {
            // Her iz farklı gecikmeyle takip eder
            const speed = 0.15 - (i * 0.012);
            trail.x += (mouseX - trail.x) * speed;
            trail.y += (mouseY - trail.y) * speed;

            const scale = 1 - (i / TRAIL_COUNT) * 0.7;
            const opacity = (1 - i / TRAIL_COUNT) * 0.5;

            trail.el.style.transform = `translate(${trail.x - 9}px, ${trail.y - 9}px) scale(${scale})`;
            trail.el.style.opacity = opacity;
            trail.el.style.background = `radial-gradient(circle, hsla(${currentHue}, 100%, 65%, 0.9), hsla(${currentHue}, 100%, 50%, 0) 70%)`;
        });

        requestAnimationFrame(animateTrail);
    }
    requestAnimationFrame(animateTrail);
})();

// ==========================================
// 13. SAĞ TIK & DEVTOOLS KORUMASI
// ==========================================
(() => {
    // Sağ tık engelle
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U engelle
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') { e.preventDefault(); return; }
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) { e.preventDefault(); return; }
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) { e.preventDefault(); return; }
    });
})();
