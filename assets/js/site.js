/* Aarian Health — site.js
   Small, dependency-free progressive enhancement:
   - mobile nav toggle
   - sticky-header "scrolled" state
   - reveal-on-scroll (IntersectionObserver, with graceful fallback)
   The <html class="js"> flag is set inline in each page head so that,
   with JS disabled, .reveal content stays fully visible (see aarian.css). */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu after following an in-page/nav link on mobile
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Sticky header shadow ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var revealables = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !revealables.length) {
    // Fallback: just show everything.
    for (var i = 0; i < revealables.length; i++) revealables[i].classList.add("in");
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Current year in footers ---- */
  var y = document.querySelectorAll("[data-year]");
  for (var j = 0; j < y.length; j++) y[j].textContent = new Date().getFullYear();

  /* ---- Footer newsletter (Netlify form): inline thank-you ----
     Progressive enhancement: POST via fetch and swap in a thank-you.
     If fetch is unavailable or fails, fall back to the native submit
     (Netlify's own success page). */
  var nf = document.querySelector(".ft-news-form");
  if (nf && window.fetch) {
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = new URLSearchParams(new FormData(nf)).toString();
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function () {
          var thanks = nf.parentNode.querySelector(".ft-thanks");
          nf.hidden = true;
          if (thanks) thanks.hidden = false;
        })
        .catch(function () { nf.submit(); });
    });
  }
})();
