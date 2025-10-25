// mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const toggleBtns = document.querySelectorAll('.nav-toggle');
  const navs = document.querySelectorAll('.nav');

  toggleBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      navs.forEach(n=> n.classList.toggle('active'));
    });
  });

  // smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          const top = el.offsetTop - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
  
  // mobile dropdown toggle for nav items with children
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', function(e){
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
      }
    });
  });
});
// ===== Hover effect for Services Page =====

// This ensures the script runs after the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const overlay = item.querySelector(".overlay");
      overlay.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      const overlay = item.querySelector(".overlay");
      overlay.classList.remove("active");
    });
  });
});

// main.js

// Toggle header/navbar appearance on scroll for pages that use either
// `.navbar` or `.site-header`. Use a small threshold so the header becomes
// solid (white) shortly after the user scrolls.
(function(){
  const elems = [];
  const navbar = document.querySelector('.navbar');
  const siteHeader = document.querySelector('.site-header');
  if (navbar) elems.push(navbar);
  if (siteHeader) elems.push(siteHeader);
  if (!elems.length) return;

  const threshold = 60; // px scrolled before switching to white

  const update = () => {
    if (window.scrollY > threshold) {
      elems.forEach(el => {
        el.classList.add('scrolled');
        el.classList.remove('transparent');
      });
    } else {
      elems.forEach(el => {
        el.classList.add('transparent');
        el.classList.remove('scrolled');
      });
    }
  };

  window.addEventListener('scroll', update);
  document.addEventListener('DOMContentLoaded', update);
})();

// Lightbox helper used by gallery and services cards
function openLightbox(src, title, desc) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const t = document.getElementById('lightbox-title');
  const d = document.getElementById('lightbox-desc');
  if (!lb || !img) return;
  img.src = src;
  if (t) t.textContent = title || '';
  if (d) d.textContent = desc || '';
  lb.style.display = 'block';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  lb.style.display = 'none';
  img.src = '';
}
// Handle dynamic design selection
document.addEventListener('DOMContentLoaded', function () {
  // Booking form elements may not exist on every page (e.g., faq.html).
  // Only wire up booking-related logic if the elements are present.
  const bookingType = document.getElementById("bookingType");
  const packageSection = document.getElementById("packageSection");
  const packageOptions = document.getElementById("packageOptions");

  if (!bookingType || !packageSection || !packageOptions) return; // nothing to do on this page

  const packageChoices = {
    bridal: ["Bridal Aura", "Sajawat", "Vine Mandala"],
    "semi-bridal": ["Nazakat", "suroor", "Boho Bloom"],
    party: ["Husn-e-ada", "Floral fantasy"],
    simple: ["Nature's Palette", "Lines of Grace"]
  };

  // When user selects booking type
  bookingType.addEventListener("change", function () {
    const selected = this.value;
    packageOptions.innerHTML = "";
    if (packageChoices[selected]) {
      packageSection.style.display = "block";
      packageChoices[selected].forEach(pkg => {
        const opt = document.createElement("option");
        opt.value = pkg.toLowerCase().replace(/\s+/g, "-");
        opt.textContent = pkg;
        packageOptions.appendChild(opt);
      });
    } else {
      packageSection.style.display = "none";
    }
  });
});
// FAQ toggle
document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const answer = item.querySelector(".faq-answer");
      const icon = button.querySelector(".icon");

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
          otherItem.querySelector(".icon").textContent = "+";
        }
      });

      // Toggle current FAQ
      if (item.classList.contains("open")) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
        icon.textContent = "+";
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
  });
});
