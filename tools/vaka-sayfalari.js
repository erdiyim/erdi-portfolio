// Vaka çalışması sayfalarını üretir: /projeler/<slug>/index.html
// Kullanım (proje kökünden): node tools/vaka-sayfalari.js
// İçerik bu dosyadaki VAKALAR listesinde; değiştirip tekrar çalıştırmak yeterli.
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const SITE = 'https://www.erdiocal.com';

const VAKALAR = [
  {
    slug: 'delete-ead-core',
    baslik: 'Delete: E.A.D Core',
    kategori: { tr: 'Oyun · Pazarlama & Finans', en: 'Game · Marketing & Finance' },
    ozet: {
      tr: "Shaperon Works'ün ilk Steam oyunu. 1–4 oyunculu online co-op korku oyununun pazarlamasını, tanıtım videolarını ve finans tarafını yürütüyorum.",
      en: "Shaperon Works' first Steam game. I run the marketing, the trailers and the finance side of this 1–4 player online co-op horror game."
    },
    meta: [
      { e: { tr: 'Rol', en: 'Role' }, d: { tr: 'Pazarlama, finans, oyun testi', en: 'Marketing, finance, playtesting' } },
      { e: { tr: 'Stüdyo', en: 'Studio' }, d: { tr: 'Shaperon Works', en: 'Shaperon Works' } },
      { e: { tr: 'Platform', en: 'Platform' }, d: { tr: 'Steam (PC)', en: 'Steam (PC)' } },
      { e: { tr: 'Çıkış', en: 'Release' }, d: { tr: 'Q4 2026', en: 'Q4 2026' } }
    ],
    butonlar: [
      { href: 'https://store.steampowered.com/app/4892710/Delete_EAD_Core/', dis: true, dolu: true, m: { tr: "Steam'de İstek Listesine Ekle →", en: 'Wishlist on Steam →' } }
    ],
    kapak: { src: '/img/projeler/delete-ead-core.webp', oran: '4 / 1', w: 1600, h: 400,
      alt: { tr: 'Delete: E.A.D Core kapak görseli ve oyun içi ekran görüntüsü', en: 'Delete: E.A.D Core key art and in-game screenshot' } },
    bolumler: [
      { b: { tr: 'Oyun', en: 'The Game' }, h: {
        tr: `<p>2010'dan beri terk edilmiş bir yeraltı veri imha tesisinde geçen, 1–4 oyunculu online co-op hayatta kalma korku oyunu. Oyuncular veri disklerini bulup doğru sistemlerde imha ediyor; her oyuncunun kendine özgü bir yeteneği var.</p>
<ul><li>1–4 oyunculu online co-op</li><li>Steam Başarımları, Steam Cloud ve istatistik desteği</li><li>31 dilde arayüz ve altyazı</li><li>Türkçe ve İngilizce tam seslendirme</li></ul>`,
        en: `<p>A 1–4 player online co-op survival horror game set in an underground data-destruction facility abandoned since 2010. Players find data disks and destroy them in the right systems; each player has a unique ability.</p>
<ul><li>1–4 player online co-op</li><li>Steam Achievements, Steam Cloud and stats</li><li>Interface and subtitles in 31 languages</li><li>Full Turkish and English voice-over</li></ul>` } },
      { b: { tr: 'Rolüm', en: 'My Role' }, h: {
        tr: `<p>Ekip oyunu geliştirirken ben işin ticari tarafındayım:</p>
<ul><li><strong>Steam mağaza sayfası:</strong> oyunun nasıl anlatılacağı, görseller ve sayfa metinleri</li><li><strong>Fragman ve tanıtım videoları:</strong> kurgu ve yayın planı</li><li><strong>Sosyal medya ve duyurular:</strong> içerik takvimi</li><li><strong>Finans:</strong> bütçe ve harcama planlaması</li><li><strong>Oyun testi:</strong> geliştirme sürecinde oyunu oynayıp ekibe geri bildirim vermek</li></ul>`,
        en: `<p>While the team builds the game, I handle the business side:</p>
<ul><li><strong>Steam store page:</strong> how the game is pitched, the visuals and the copy</li><li><strong>Trailers:</strong> editing and the release plan</li><li><strong>Social media and announcements:</strong> the content calendar</li><li><strong>Finance:</strong> budget and spending plan</li><li><strong>Playtesting:</strong> playing builds during development and giving the team feedback</li></ul>` } },
      { b: { tr: 'Yaklaşım', en: 'Approach' }, h: {
        tr: `<p>Steam'de bir oyunun çıkış günündeki görünürlüğü büyük ölçüde çıkıştan önce topladığı istek listesi (wishlist) sayısına bağlı. Bu yüzden mağaza sayfası, fragmanlar ve duyuru takvimi tek bir hedefe göre planlanıyor: çıkışa kadar istek listesini büyütmek.</p>`,
        en: `<p>On Steam, a game's visibility at launch depends heavily on how many wishlists it collects beforehand. So the store page, the trailers and the announcement calendar all serve one goal: growing the wishlist count until launch.</p>` } },
      { b: { tr: 'Durum', en: 'Status' }, h: {
        tr: `<p>Geliştirme sürüyor, çıkış <strong>Q4 2026</strong> için planlanıyor. Steam sayfası yayında; oyunu şimdiden istek listene ekleyebilirsin.</p>`,
        en: `<p>Development is ongoing, with launch planned for <strong>Q4 2026</strong>. The Steam page is live, so you can already add the game to your wishlist.</p>` } }
    ],
    sonraki: 'luxury-pawn-shop'
  },
  {
    slug: 'luxury-pawn-shop',
    baslik: 'Luxury Pawn Shop Simulator',
    kategori: { tr: 'Mobil Oyun · Kişisel Proje', en: 'Mobile Game · Personal Project' },
    ozet: {
      tr: 'Babadan kalan küçük bir rehinci dükkânını şehrin lüks eşya merkezine dönüştürdüğün, izometrik piksel art bir mobil tycoon oyunu. Tasarımından koduna kadar kendim geliştiriyorum.',
      en: "An isometric pixel art mobile tycoon game where you turn the small pawn shop you inherited from your father into the city's luxury goods hub. I design and build it myself, from the economy to the code."
    },
    meta: [
      { e: { tr: 'Rol', en: 'Role' }, d: { tr: 'Oyun tasarımı, geliştirme', en: 'Game design, development' } },
      { e: { tr: 'Platform', en: 'Platform' }, d: { tr: 'iOS · Android', en: 'iOS · Android' } },
      { e: { tr: 'Araçlar', en: 'Tools' }, d: { tr: 'Unity, C#, Analytics, Remote Config', en: 'Unity, C#, Analytics, Remote Config' } },
      { e: { tr: 'Durum', en: 'Status' }, d: { tr: 'Geliştirme aşamasında', en: 'In development' } }
    ],
    butonlar: [
      { href: '/privacy/', m: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' } },
      { href: '/support/', m: { tr: 'Destek Sayfası', en: 'Support Page' } }
    ],
    kapak: { src: '/img/projeler/pawnshop/kapak.jpg', oran: '2 / 1', w: 1600, h: 800,
      alt: { tr: 'Luxury Pawn Shop Simulator: harita, pazarlık ve ev ekranları', en: 'Luxury Pawn Shop Simulator: map, haggling and home screens' } },
    bolumler: [
      { b: { tr: 'Fikir', en: 'The Idea' }, h: {
        tr: `<p>Sefaletten zenginliğe bir hikâye: babadan kalan, örümcek ağlı küçük bir dükkânla başlıyorsun. Her gün kapıdan giren müşteriler saat, mücevher ve antika getiriyor; neyin gerçek, neyin blöf olduğuna karar verip pazarlık ediyorsun. Kazandıkça dükkân büyüyor, eve koleksiyon kuruyor ve şehirde itibar kazanıyorsun.</p>`,
        en: `<p>A rags-to-riches story: you start with a small, cobwebbed shop left by your father. Every day customers walk in with watches, jewellery and antiques; you decide what is real and what is a bluff, and you haggle. As you earn, the shop grows, you build a collection at home and gain a reputation in the city.</p>` } },
      { b: { tr: 'Oyun Döngüsü', en: 'Core Loop' }, h: {
        tr: `<ul><li><strong>Pazarlık:</strong> müşterinin sabır çubuğu ve teklif kaydırıcısıyla; ikna hamleleri ve blöf yakalama</li><li><strong>Ekspertiz:</strong> kutu, kasa arkası ve seri numarasıyla ürünün orijinalliğini kontrol etme</li><li><strong>Hayatta kalma ekonomisi:</strong> mesai saatleri, düzenli faturalar, iflas riski ve rastgele krizler</li><li><strong>İlerleme:</strong> dükkân seviyeleri, evdeki koleksiyon, pasaj yatırımları ve harita</li><li><strong>Günlük içerik:</strong> Günün Kasası ve festivaller</li></ul>`,
        en: `<ul><li><strong>Haggling:</strong> a customer patience bar and an offer slider, with persuasion moves and bluff catching</li><li><strong>Appraisal:</strong> checking authenticity through the box, the case back and the serial number</li><li><strong>Survival economy:</strong> opening hours, regular bills, bankruptcy risk and random crises</li><li><strong>Progression:</strong> shop levels, a collection at home, arcade investments and a city map</li><li><strong>Daily content:</strong> the Daily Vault and festivals</li></ul>` } },
      { b: { tr: 'Ne Yaptım', en: 'What I Built' }, h: {
        tr: `<ul><li>Unity ve C# ile oyun mantığı ve arayüz</li><li>Oyun ekonomisi ve gelir modeli: uygulama içi satın alma (reklamsız sürüm, hız paketi) ve ödüllü reklam</li><li>Unity Analytics ile ilk oturum akışını ve ekonomi dengesini ölçme</li><li>Remote Config ile güncelleme yayınlamadan denge ayarı</li><li>Çok dilli arayüz ve paylaşım kartları</li><li>Mağaza hazırlığı: App Store ekran görüntüleri, bu sitede yayında olan gizlilik ve destek sayfaları</li></ul>`,
        en: `<ul><li>Game logic and UI in Unity and C#</li><li>Economy and revenue model: in-app purchases (ad-free, speed pack) and rewarded ads</li><li>Measuring first-session flow and economy balance with Unity Analytics</li><li>Tuning balance without shipping an update via Remote Config</li><li>Multilingual UI and share cards</li><li>Store prep: App Store screenshots plus the privacy and support pages live on this site</li></ul>` } },
      { b: { tr: 'Ekranlar', en: 'Screens' }, galeri: { tip: 'telefon', gorseller: [
        { src: '/img/projeler/pawnshop/dukkan.png', w: 516, h: 1010, alt: { tr: 'Dükkân: izometrik rehinci dükkânı ve şehir', en: 'Shop: the isometric pawn shop and the city' } },
        { src: '/img/projeler/pawnshop/pazarlik.png', w: 516, h: 1010, alt: { tr: 'Pazarlık: sabır çubuğu, ekspertiz araçları ve teklif', en: 'Haggling: patience bar, appraisal tools and the offer' } },
        { src: '/img/projeler/pawnshop/harita.png', w: 516, h: 1010, alt: { tr: 'Harita: dükkân, ev, depo ve şehir binaları', en: 'Map: shop, home, storage and city buildings' } },
        { src: '/img/projeler/pawnshop/envanter.png', w: 516, h: 1010, alt: { tr: 'Envanter: vitrin ve kasadaki ürünler', en: 'Inventory: showcase and stock' } },
        { src: '/img/projeler/pawnshop/yatirimlar.png', w: 516, h: 1010, alt: { tr: 'Pasaj yatırımları: her sabah itibar getiren yatırımlar', en: 'Arcade investments: daily reputation boosts' } },
        { src: '/img/projeler/pawnshop/ev.png', w: 516, h: 1010, alt: { tr: 'Ev: koleksiyon ve sergi', en: 'Home: collection and display' } }
      ] } },
      { b: { tr: 'Durum', en: 'Status' }, h: {
        tr: `<p>Geliştirme sürüyor; App Store ve Google Play çıkışı için hazırlık aşamasında. Oyunun <a href="/privacy/">gizlilik politikası</a> ve <a href="/support/">destek sayfası</a> bu sitede yayında.</p>`,
        en: `<p>Development is ongoing and the game is being prepared for the App Store and Google Play. Its <a href="/privacy/">privacy policy</a> and <a href="/support/">support page</a> are live on this site.</p>` } }
    ],
    sonraki: 'lamina-garden'
  },
  {
    slug: 'lamina-garden',
    baslik: "La'mina Garden",
    kategori: { tr: 'Web Sitesi · Müşteri Projesi', en: 'Website · Client Project' },
    ozet: {
      tr: "İstanbul Maltepe'de doğanın içinde bir etkinlik mekânı için; rezervasyonu WhatsApp'a bağlayan, mekânın kendisinin güncelleyebildiği, iki dilli ve SEO uyumlu bir web sitesi.",
      en: 'A bilingual, SEO-ready website for a nature event venue in Maltepe, Istanbul: bookings go straight to WhatsApp and the venue can update the content itself.'
    },
    meta: [
      { e: { tr: 'Rol', en: 'Role' }, d: { tr: 'Tasarım, geliştirme, SEO', en: 'Design, development, SEO' } },
      { e: { tr: 'Müşteri', en: 'Client' }, d: { tr: "La'mina Garden, Maltepe", en: "La'mina Garden, Maltepe" } },
      { e: { tr: 'Kapsam', en: 'Scope' }, d: { tr: 'Web sitesi + yönetim paneli', en: 'Website + admin panel' } },
      { e: { tr: 'Araçlar', en: 'Tools' }, d: { tr: 'HTML/CSS/JS, Firebase, PWA', en: 'HTML/CSS/JS, Firebase, PWA' } }
    ],
    butonlar: [
      { href: 'https://www.laminagarden.net', dis: true, dolu: true, m: { tr: 'Siteyi Ziyaret Et →', en: 'Visit the Website →' } }
    ],
    kapak: { src: '/img/projeler/lamina/ana-sayfa.jpg', oran: '16 / 9', w: 1440, h: 810,
      alt: { tr: "La'mina Garden web sitesinin ana sayfası: orman içinde havuzlu etkinlik alanı", en: "La'mina Garden homepage: an event venue with a pool in the forest" } },
    bolumler: [
      { b: { tr: 'Hedef', en: 'The Goal' }, h: {
        tr: `<p>Mekânın internette kolayca bulunması, ziyaretçinin birkaç saniyede mekânı görüp rezervasyon talebi bırakabilmesi ve sık değişen fotoğraf ve etkinliklerin her seferinde bir geliştiriciye ihtiyaç duymadan güncellenebilmesi.</p>`,
        en: `<p>Make the venue easy to find online, let visitors see the place and request a booking within seconds, and let the venue update its photos and events without needing a developer every time.</p>` } },
      { b: { tr: 'Neler Yaptım', en: 'What I Built' }, h: {
        tr: `<ul><li><strong>Tek tıkla WhatsApp rezervasyonu:</strong> talepler doğrudan işletmenin telefonuna düşüyor</li><li><strong>Yönetim paneli:</strong> Firebase tabanlı; fotoğraf, etkinlik, yorum ve ayarlar işletme tarafından yönetiliyor</li><li><strong>İçerik:</strong> hizmetler, etkinlikler, galeri, yorumlar ve SSS bölümleri</li><li><strong>Türkçe / İngilizce</strong> dil desteği</li><li><strong>SEO:</strong> yerel işletme yapılandırılmış verisi (schema.org), site haritası ve hızlı yükleme</li><li><strong>KVKK uyumlu çerez onayı</strong> ve ana ekrana eklenebilen PWA yapısı</li></ul>`,
        en: `<ul><li><strong>One-tap WhatsApp booking:</strong> requests land straight on the venue's phone</li><li><strong>Admin panel:</strong> Firebase-based; the venue manages photos, events, reviews and settings</li><li><strong>Content:</strong> services, events, gallery, reviews and FAQ sections</li><li><strong>Turkish / English</strong> language support</li><li><strong>SEO:</strong> local business structured data (schema.org), sitemap and fast loading</li><li><strong>GDPR/KVKK-compliant cookie consent</strong> and an installable PWA</li></ul>` } },
      { b: { tr: 'Sonuç', en: 'Outcome' }, h: {
        tr: `<blockquote class="alinti">“Rezervasyon taleplerimiz site yayınlandıktan sonra gözle görülür biçimde arttı.”<cite>La'mina Garden, işletme sahibi</cite></blockquote>`,
        en: `<blockquote class="alinti">“Booking inquiries visibly increased after the site launched.”<cite>La'mina Garden, business owner</cite></blockquote>` } }
    ],
    sonraki: 'delete-ead-core'
  }
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function blok(v, d) {
  const meta = v.meta.map(m => `<div><dt>${esc(m.e[d])}</dt><dd>${esc(m.d[d])}</dd></div>`).join('');
  const butonlar = v.butonlar.map(b => `<a class="btn ${b.dolu ? 'btn-dolu' : 'btn-cerceve'}" href="${esc(b.href)}"${b.dis ? ' target="_blank" rel="noopener"' : ''}>${esc(b.m[d])}</a>`).join('');
  const bolumler = v.bolumler.map((b, i) => {
    let ic = b.h ? b.h[d] : '';
    if (b.galeri) {
      ic += `<div class="galeri galeri-${b.galeri.tip}">` + b.galeri.gorseller.map(g =>
        `<figure><img src="${g.src}" alt="${esc(g.alt[d])}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async"><figcaption>${esc(g.alt[d])}</figcaption></figure>`).join('') + `</div>`;
    }
    return `<section class="bolum"><h2><small>${String(i + 1).padStart(2, '0')}</small>${esc(b.b[d])}</h2><div class="icerik">${ic}</div></section>`;
  }).join('\n');
  const s = VAKALAR.find(x => x.slug === v.sonraki);
  return `<div data-blok="${d}"${d === 'en' ? ' hidden' : ''}>
<p class="etiket">${esc(v.kategori[d])}</p>
<h1>${esc(v.baslik)}</h1>
<p class="ozet">${esc(v.ozet[d])}</p>
<dl class="meta">${meta}</dl>
<div class="butonlar">${butonlar}</div>
<div class="kapak" style="aspect-ratio: ${v.kapak.oran}"><img src="${v.kapak.src}" alt="${esc(v.kapak.alt[d])}" width="${v.kapak.w}" height="${v.kapak.h}"${d === 'tr' ? ' fetchpriority="high"' : ' loading="lazy"'}></div>
${bolumler}
<a class="sonraki" href="/projeler/${s.slug}/"><span>${d === 'tr' ? 'Sonraki proje' : 'Next project'}</span><strong>${esc(s.baslik)} <i>→</i></strong></a>
</div>`;
}

function sayfa(v) {
  const url = `${SITE}/projeler/${v.slug}/`;
  const gorsel = SITE + v.kapak.src;
  const bTr = `${v.baslik} | Erdi Öcal`;
  const bEn = `${v.baslik} | Erdi Öcal`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: v.baslik, description: v.ozet.tr,
    url, image: gorsel, inLanguage: 'tr',
    creator: { '@type': 'Person', name: 'Erdi Öcal', url: SITE + '/' }
  };
  return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(bTr)}</title>
    <meta name="baslik-tr" content="${esc(bTr)}">
    <meta name="baslik-en" content="${esc(bEn)}">
    <meta name="description" content="${esc(v.ozet.tr)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(bTr)}">
    <meta property="og:description" content="${esc(v.ozet.tr)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${gorsel}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(bTr)}">
    <meta name="twitter:description" content="${esc(v.ozet.tr)}">
    <meta name="twitter:image" content="${gorsel}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/projeler/vaka.css">
    <script>try { if (localStorage.getItem('tema') === 'light') document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {}</script>
    <script type="application/ld+json">
${JSON.stringify(ld, null, 4).replace(/^/gm, '    ')}
    </script>
</head>
<body>
    <header class="ust">
        <a href="/" class="logo">E<span>.</span>Öcal</a>
        <div class="ust-sag">
            <a href="/#projeler" class="geri" data-tr="← Tüm projeler" data-en="← All projects">← Tüm projeler</a>
            <button class="dil" id="dilBtn" aria-label="Dil Değiştir / Change language"><b>TR</b> | EN</button>
        </div>
    </header>
    <main class="vaka">
${blok(v, 'tr')}
${blok(v, 'en')}
    </main>
    <footer><a href="/">www.erdiocal.com</a> · &copy; ${new Date().getFullYear()} Erdi Öcal</footer>
    <script src="/projeler/vaka.js"></script>
</body>
</html>
`;
}

for (const v of VAKALAR) {
  const klasor = path.join(KOK, 'projeler', v.slug);
  fs.mkdirSync(klasor, { recursive: true });
  fs.writeFileSync(path.join(klasor, 'index.html'), sayfa(v), 'utf8');
  console.log('yazıldı: projeler/' + v.slug + '/index.html');
}
