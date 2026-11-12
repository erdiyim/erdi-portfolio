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
    sonraki: 'lamina-garden',
    surec: 'pawn'
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
    sonraki: 'delete-ead-core',
    surec: 'lamina'
  }
];

// ---------- Kaydırmaya bağlı dönüşüm bölümleri ----------
const t = (tr, en) => `data-tr="${esc(tr)}" data-en="${esc(en)}"`;

const SUREC = {
  // La'mina: kalem eskizi → gerçek site
  lamina: {
    etiket: ['// süreç', '// process'],
    baslik: ['Fikirden yayına', 'From idea to launch'],
    adimlar: [['01 Eskiz', '01 Sketch'], ['02 Tasarım & kod', '02 Design & code'], ['03 Yayında', '03 Live']],
    altlar: [
      [['Eskiz:', 'Sketch:'], ['önce kâğıtta; hangi bölüm nerede, ziyaretçi nereye tıklayacak.', 'on paper first: where each section goes and where visitors will click.']],
      [['Tasarım & kod:', 'Design & code:'], ['eskiz parça parça gerçek siteye dönüşüyor.', 'the sketch turns into the real site, piece by piece.']],
      [['Yayında:', 'Live:'], ['laminagarden.net, rezervasyonlar WhatsApp’a düşüyor.', 'laminagarden.net, with bookings landing on WhatsApp.']]
    ],
    adresler: 'taslak.png|localhost:3000|laminagarden.net',
    boyut: '1440,810', merkez: '720,380', telefon: false,
    svg: () => `<svg viewBox="0 0 1440 810" role="img" aria-label="La'mina Garden sitesinin eskizden bitmiş hale dönüşümü">
  <defs>
    <filter id="surecKalem" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="g"/><feDisplacementMap in="SourceGraphic" in2="g" scale="4"/></filter>
    <filter id="surecKagit"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.37  0 0 0 0 0.32  0 0 0 0.09 0"/></filter>
    <filter id="surecYumusak" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="16"/></filter>
    <pattern id="surecIzgara" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#d9d3c5" stroke-width="1"/></pattern>
    <mask id="surecBoya" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="810"><rect width="1440" height="810" fill="#000"/><g class="surec-lekeler" filter="url(#surecYumusak)" fill="#fff"></g><rect class="surec-tam" width="1440" height="810" fill="#fff" opacity="0"/></mask>
  </defs>
  <rect width="1440" height="810" fill="#f5f1e8"/>
  <rect width="1440" height="810" fill="url(#surecIzgara)" opacity="0.55"/>
  <rect width="1440" height="810" filter="url(#surecKagit)"/>
  <g filter="url(#surecKalem)" fill="none" stroke="#3d3a35" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path class="ciz" pathLength="1" d="M118 0 C122 160 112 330 126 560"/>
    <path class="ciz" pathLength="1" d="M330 0 C326 140 338 300 322 470"/>
    <path class="ciz" pathLength="1" d="M1108 0 C1114 180 1100 360 1116 600"/>
    <path class="ciz" pathLength="1" d="M1185 60 C1180 220 1192 380 1178 560"/>
    <path class="ciz" pathLength="1" d="M1338 0 C1344 200 1332 420 1346 640"/>
    <path class="ciz" pathLength="1" d="M0 170 Q 360 70 720 150 T 1440 260"/>
    <path class="ciz" pathLength="1" d="M60 120 Q 420 220 760 120 Q 1060 40 1420 180"/>
    <path class="ciz" pathLength="1" d="M200 0 L 720 150 L 1160 0"/>
    <path class="ciz" pathLength="1" d="M0 560 C 300 552 520 566 760 556 S 1200 560 1440 552"/>
    <path class="ciz" pathLength="1" d="M190 810 L 420 548 L 562 548 L 712 810"/>
    <path class="ciz" pathLength="1" d="M250 810 L 440 580 L 548 580 L 660 810"/>
    <path class="ciz" pathLength="1" d="M20 520 L 300 500 M 30 560 L 290 540 M 20 600 L 260 585 M 10 650 L 220 640"/>
    <path class="ciz" pathLength="1" d="M820 560 L 1100 590 M 840 610 L 1140 650 M 860 660 L 1180 710 M 880 720 L 1240 780"/>
    <path class="ciz" pathLength="1" d="M1180 520 L 1430 540 M 1200 580 L 1440 610"/>
    <path class="ciz" pathLength="1" d="M380 40 q 9 -6 18 0 t 18 0 t 18 0 t 18 0 M 491 40 q 10 -6 20 0 t 20 0 t 20 0 t 20 0 M 612 40 q 9 -6 18 0 t 18 0 t 18 0 t 18 0 M 721 40 q 9 -6 18 0 t 18 0 t 18 0 t 18 0 M 831 40 q 8 -6 16 0 t 16 0 t 16 0 M 915 40 q 8 -6 15 0 t 15 0 M 981 40 q 9 -6 18 0 t 18 0 t 18 0"/>
    <rect class="ciz" pathLength="1" x="1065" y="20" width="120" height="38" rx="6"/>
    <rect class="ciz" pathLength="1" x="1250" y="23" width="50" height="32" rx="4"/>
    <rect class="ciz" pathLength="1" x="1231" y="90" width="188" height="108" rx="14"/>
    <path class="ciz" pathLength="1" d="M1256 150 a 12 12 0 0 1 22 -8 a 10 10 0 0 1 14 12 z M 1300 125 h 60 M 1300 155 h 90 M 1300 175 h 70"/>
    <rect class="ciz" pathLength="1" x="520" y="271" width="203" height="49" rx="24"/>
    <rect class="ciz" pathLength="1" x="730" y="276" width="191" height="42" rx="21"/>
    <path class="ciz" pathLength="1" d="M552 478 q 14 -7 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0"/>
    <path class="ciz" pathLength="1" d="M545 515 q 15 -7 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0 t 29 0"/>
    <rect class="ciz" pathLength="1" x="561" y="570" width="109" height="58" rx="6"/>
    <rect class="ciz" pathLength="1" x="688" y="571" width="190" height="57" rx="6"/>
  </g>
  <g fill="#3d3a35" font-family="Caveat, cursive" font-weight="700" text-anchor="middle">
    <text class="surec-yazi" x="225" y="50" font-size="34">La'mina Garden</text>
    <text class="surec-yazi" x="720" y="420" font-size="104">La'mina Garden</text>
    <text class="surec-yazi" x="1125" y="46" font-size="20">Rezervasyon</text>
    <text class="surec-yazi" x="615" y="606" font-size="24">Keşfet</text>
    <text class="surec-yazi" x="783" y="606" font-size="24">Rezervasyon Yap</text>
    <text class="surec-yazi" x="621" y="303" font-size="22">★ 4.8 Google</text>
    <text class="surec-yazi" x="825" y="304" font-size="22">Maltepe</text>
  </g>
  <g class="surec-not" font-family="Caveat, cursive" font-weight="500" font-size="27">
    <g fill="none" stroke="#d6453d" stroke-width="2" stroke-linecap="round">
      <path d="M380 76 L 1040 76 M 380 68 v 16 M 1040 68 v 16"/>
      <path d="M300 410 C 360 400 400 400 440 406 l -10 -8 m 10 8 l -10 8"/>
      <path d="M1010 620 C 960 640 920 630 892 610 l 4 12 m -4 -12 l 12 2"/>
      <path d="M1062 120 C 1020 100 1040 70 1090 62 l -10 -6 m 10 6 l -8 8"/>
      <path d="M1240 250 C 1260 230 1280 222 1300 206 l -12 2 m 12 -2 l -2 12"/>
    </g>
    <g fill="#d6453d" text-anchor="middle">
      <text x="710" y="104" ${t('menü · 7 bağlantı', 'menu · 7 links')}>menü · 7 bağlantı</text>
      <text x="180" y="400" ${t('hero başlığı', 'hero title')}>hero başlığı</text>
      <text x="1080" y="640" ${t('CTA → WhatsApp', 'CTA → WhatsApp')}>CTA → WhatsApp</text>
      <text x="960" y="140" ${t('rezervasyon butonu', 'booking button')}>rezervasyon butonu</text>
      <text x="1200" y="280" ${t('canlı hava durumu', 'live weather')}>canlı hava durumu</text>
    </g>
    <g fill="#2f6fd6" text-anchor="middle">
      <text x="470" y="720" ${t('havuz fotoğrafı', 'pool photo')}>havuz fotoğrafı</text>
      <text x="1300" y="790">1440 × 810</text>
    </g>
  </g>
  <image href="/img/projeler/lamina/ana-sayfa.jpg" width="1440" height="810" mask="url(#surecBoya)" preserveAspectRatio="xMidYMid slice"/>
</svg>`
  },

  // Pawn Shop: harap miras dükkân → Seviye 3 lüks dükkân
  pawn: {
    etiket: ['// dönüşüm', '// transformation'],
    baslik: ['Sefaletten zenginliğe', 'From rags to riches'],
    adimlar: [['01 Miras dükkân', '01 Inherited shop'], ['02 Pazarlık & yatırım', '02 Haggle & invest'], ['03 Seviye 3', '03 Level 3']],
    altlar: [
      [['Miras dükkân:', 'Inherited shop:'], ['çatlak duvarlar, örümcek ağı, karton kutudan bir tezgâh.', 'cracked walls, cobwebs and a cardboard box for a counter.']],
      [['Pazarlık & yatırım:', 'Haggle & invest:'], ['her kazanç dükkânı parça parça yeniliyor.', 'every deal renovates the shop, piece by piece.']],
      [['Seviye 3:', 'Level 3:'], ['altın çerçeveli duvarlar, neon tabela; şehrin lüks eşya merkezi.', 'gold-trimmed walls and a neon sign: the city’s luxury hub.']]
    ],
    adresler: 'Gün 4 · Sv 1|Gün 12 · Sv 2|Gün 25 · Sv 3',
    boyut: '1080,1060', merkez: '540,540', telefon: true,
    svg: () => `<svg viewBox="0 0 1080 1060" role="img" aria-label="Luxury Pawn Shop Simulator: harap dükkânın lüks dükkâna dönüşümü">
  <defs>
    <filter id="surecYumusak" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="16"/></filter>
    <mask id="surecBoya" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1060"><rect width="1080" height="1060" fill="#000"/><g class="surec-lekeler" filter="url(#surecYumusak)" fill="#fff"></g><rect class="surec-tam" width="1080" height="1060" fill="#fff" opacity="0"/></mask>
  </defs>
  <image href="/img/projeler/pawnshop/once.jpg" width="1080" height="1060" style="image-rendering: pixelated"/>
  <g class="surec-not" font-family="Caveat, cursive" font-weight="700" font-size="44">
    <g fill="none" stroke="#ff5a4f" stroke-width="4" stroke-linecap="round">
      <path d="M760 140 C 700 150 640 190 590 230 l 6 -16 m -6 16 l 17 -2"/>
      <path d="M200 190 C 280 220 360 250 430 295 l -6 -15 m 6 15 l -16 1"/>
      <path d="M180 790 C 240 770 300 740 345 710 l -16 2 m 16 -2 l -4 16"/>
      <path d="M900 870 C 880 790 900 750 930 710 l -15 6 m 15 -6 l 1 16"/>
    </g>
    <g fill="#ff5a4f" stroke="#1a1030" stroke-width="7" paint-order="stroke" stroke-linejoin="round">
      <text x="780" y="130" ${t('örümcek ağı', 'cobwebs')}>örümcek ağı</text>
      <text x="40" y="175" ${t('çatlak duvarlar', 'cracked walls')}>çatlak duvarlar</text>
      <text x="20" y="830" ${t('karton kutu tezgâh', 'cardboard counter')}>karton kutu tezgâh</text>
      <text x="740" y="920" ${t('sönük ışıklar', 'dim lights')}>sönük ışıklar</text>
    </g>
  </g>
  <image href="/img/projeler/pawnshop/sonra.jpg" width="1080" height="1060" mask="url(#surecBoya)" style="image-rendering: pixelated"/>
</svg>`
  }
};

function surecHtml(ad) {
  const s = SUREC[ad];
  if (!s) return '';
  const adimlar = s.adimlar.map(a => `<span class="surec-adim"><i></i><span ${t(a[0], a[1])}>${esc(a[0])}</span></span>`).join('');
  const altlar = s.altlar.map((a, i) => `<span data-adim="${i}"${i ? ' hidden' : ''}><strong ${t(a[0][0], a[0][1])}>${esc(a[0][0])}</strong> <span ${t(a[1][0], a[1][1])}>${esc(a[1][0])}</span></span>`).join('');
  const ilkAdres = s.adresler.split('|')[0];
  return `<section class="surec" data-surec data-boyut="${s.boyut}" data-merkez="${s.merkez}" data-adresler="${esc(s.adresler)}">
<div class="surec-sahne">
<div class="surec-ust"><p class="etiket" ${t(s.etiket[0], s.etiket[1])}>${esc(s.etiket[0])}</p><h2 ${t(s.baslik[0], s.baslik[1])}>${esc(s.baslik[0])}</h2></div>
<div class="surec-adimlar">${adimlar}</div>
<div class="surec-pencere${s.telefon ? ' telefon' : ''}"><div class="surec-pencere-ust"><span></span><span></span><span></span><div class="surec-adres">${esc(ilkAdres)}</div></div>
${s.svg()}
</div>
<p class="surec-alt">${altlar}</p>
</div>
</section>`;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Sayfa sırası: [TR üst][EN üst] → dönüşüm bölümü (tek, iki dilli) → [TR alt][EN alt]
function birlestir(v) {
  const tr = blok(v, 'tr').split('<!--SUREC-tr-->');
  const en = blok(v, 'en').split('<!--SUREC-en-->');
  return [tr[0], en[0], v.surec ? surecHtml(v.surec) : '', tr[1], en[1]].join('\n');
}

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
</div>
<!--SUREC-${d}-->
<div data-blok="${d}"${d === 'en' ? ' hidden' : ''}>
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700${v.surec ? '&family=Caveat:wght@500;700' : ''}&display=swap" rel="stylesheet">
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
${birlestir(v)}
    </main>
    <footer><a href="/">www.erdiocal.com</a> · &copy; ${new Date().getFullYear()} Erdi Öcal</footer>
    <script src="/projeler/vaka.js"></script>${v.surec ? '\n    <script src="/projeler/surec.js"></script>' : ''}
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
