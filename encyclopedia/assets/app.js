// Paoniapedia client: live search suggestions + random article.
(function () {
  var INDEX = null;

  function loadIndex(cb) {
    if (INDEX) return cb(INDEX);
    fetch(base() + "search.json")
      .then(function (r) { return r.json(); })
      .then(function (d) { INDEX = d; cb(d); })
      .catch(function () { cb([]); });
  }

  // Pages live in the site root; assets referenced relative. base() = "" (same dir).
  function base() { return ""; }

  function score(page, q) {
    var t = page.title.toLowerCase();
    if (t === q) return 100;
    if (t.indexOf(q) === 0) return 80;
    if (t.indexOf(q) !== -1) return 60;
    if ((page.description || "").toLowerCase().indexOf(q) !== -1) return 30;
    if ((page.keywords || "").toLowerCase().indexOf(q) !== -1) return 20;
    return 0;
  }

  function initSearch() {
    var input = document.getElementById("searchInput");
    var box = document.getElementById("suggest");
    if (!input || !box) return;

    function render(q) {
      q = q.trim().toLowerCase();
      if (q.length < 2) { box.style.display = "none"; return; }
      loadIndex(function (idx) {
        var hits = idx
          .map(function (p) { return { p: p, s: score(p, q) }; })
          .filter(function (x) { return x.s > 0; })
          .sort(function (a, b) { return b.s - a.s || a.p.title.length - b.p.title.length; })
          .slice(0, 8);
        if (!hits.length) { box.style.display = "none"; return; }
        box.innerHTML = hits.map(function (x) {
          return '<a href="' + x.p.slug + '.html"><b>' + esc(x.p.title) + "</b>" +
            (x.p.description ? "<small>" + esc(x.p.description) + "</small>" : "") + "</a>";
        }).join("");
        box.style.display = "block";
      });
    }

    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("focus", function () { render(input.value); });
    document.addEventListener("click", function (e) {
      if (e.target !== input && !box.contains(e.target)) box.style.display = "none";
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = box.querySelector("a");
        if (first) { window.location = first.getAttribute("href"); }
      }
    });
  }

  function initRandom() {
    var links = document.querySelectorAll(".random-article");
    if (!links.length) return;
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        loadIndex(function (idx) {
          if (!idx.length) return;
          // Deterministic-free: pick from time-based index without Math.random dependency concerns.
          var i = (new Date().getTime() + (window.performance ? Math.floor(performance.now()) : 0)) % idx.length;
          window.location = idx[i].slug + ".html";
        });
      });
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  if (document.readyState !== "loading") { initSearch(); initRandom(); }
  else document.addEventListener("DOMContentLoaded", function () { initSearch(); initRandom(); });
})();
