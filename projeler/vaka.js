// Vaka çalışması sayfaları: dil (TR/EN) ana siteyle ortak hatırlanır
(function () {
    var btn = document.getElementById('dilBtn');
    function uygula(d) {
        document.documentElement.lang = d;
        document.querySelectorAll('[data-blok]').forEach(function (el) { el.hidden = el.getAttribute('data-blok') !== d; });
        document.querySelectorAll('[data-tr]').forEach(function (el) { el.textContent = el.getAttribute('data-' + d); });
        var baslik = document.querySelector('meta[name="baslik-' + d + '"]');
        if (baslik) document.title = baslik.content;
        btn.innerHTML = d === 'tr' ? '<b>TR</b> | EN' : 'TR | <b>EN</b>';
        try { localStorage.setItem('dil', d); } catch (e) {}
    }
    var dil = 'tr';
    try { dil = localStorage.getItem('dil') === 'en' ? 'en' : 'tr'; } catch (e) {}
    if (dil !== 'tr') uygula(dil);
    btn.addEventListener('click', function () { uygula(document.documentElement.lang === 'tr' ? 'en' : 'tr'); });
})();
