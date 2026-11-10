// index.html'deki data-tr / data-en çevirilerinden İngilizce sayfayı (en/index.html) üretir.
// Arama motorları İngilizce içeriği ayrı bir adreste (/en/) görsün diye; elle düzenlenmez.
// Çalıştırma: npm run en   (commit öncesi kanca index.html değişince kendisi çalıştırır)

const fs = require('fs');
const path = require('path');
const { parseHTML } = require('linkedom');

const kok = path.join(__dirname, '..');
const kaynak = fs.readFileSync(path.join(kok, 'index.html'), 'utf8');
const { document } = parseHTML(kaynak);

// app.js'teki metniYaz ile aynı kural: HTML yalnızca gerçek etiket varsa
const HTML_ETIKETI = /<\/?(span|a|br|strong|em|b|i)\b/i;
function metniYaz(el, metin) {
    const icerik = [...el.children].find(c => c.classList.contains('btn-icerik'));
    if (icerik) { icerik.textContent = metin; return; }
    if (HTML_ETIKETI.test(metin)) { el.innerHTML = metin; return; }
    if (el.children.length) {
        const dugum = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
        if (dugum) {
            dugum.textContent = (dugum === el.firstChild ? '' : ' ') + metin;
            return;
        }
    }
    el.textContent = metin;
}

document.documentElement.setAttribute('lang', 'en');

// Görünen metinler
for (const el of document.querySelectorAll('[data-tr][data-en]')) {
    metniYaz(el, el.getAttribute('data-en'));
}

// Form yer tutucuları
for (const el of document.querySelectorAll('[data-en-ph]')) {
    el.setAttribute('placeholder', el.getAttribute('data-en-ph'));
}

// Head: başlık ve meta etiketleri (kaynakta data-en / data-en-content ile işaretli)
const baslik = document.querySelector('title[data-en]');
if (baslik) baslik.textContent = baslik.getAttribute('data-en');
for (const el of document.querySelectorAll('[data-en-content]')) {
    el.setAttribute('content', el.getAttribute('data-en-content'));
}
for (const el of document.querySelectorAll('[data-en-href]')) {
    el.setAttribute('href', el.getAttribute('data-en-href'));
}

// Dil düğmelerinde EN seçili görünsün
for (const s of document.querySelectorAll('.dil-secim')) {
    s.classList.toggle('aktif-dil', s.getAttribute('data-dil') === 'en');
}

let cikti = '<!DOCTYPE html>\n' + document.documentElement.outerHTML + '\n';
cikti = cikti.replace('<head>', '<head>\n    <!-- Bu dosya scripts/en-sayfa.js ile index.html\'den üretilir; elle düzenlemeyin. -->');

fs.mkdirSync(path.join(kok, 'en'), { recursive: true });
fs.writeFileSync(path.join(kok, 'en', 'index.html'), cikti);
console.log('en/index.html üretildi');
