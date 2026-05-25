const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";

html.setAttribute("data-theme", savedTheme);

updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");

  const next = current === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", next);

  localStorage.setItem("theme", next);

  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "ri-sun-line" : "ri-moon-line";
}

const hamburger = document.getElementById("hamburger");

const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-link[data-section]");

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top <= 100) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === current);
  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true,
});

const navbar = document.getElementById("navbar");

window.addEventListener(
  "scroll",
  () => {
    navbar.style.boxShadow =
      window.scrollY > 20 ? "0 2px 20px rgba(0,0,0,0.15)" : "";
  },
  {
    passive: true,
  }
);

const texts = [
  "Software Engineer",
  "Full Stack Developer",
  "MERN Developer",
  "AI Research Enthusiast",
];

let idx = 0;

const rotEl = document.getElementById("rotatingText");

function rotateText() {
  rotEl.classList.add("exit");

  setTimeout(() => {
    idx = (idx + 1) % texts.length;

    rotEl.textContent = texts[idx];

    rotEl.classList.remove("exit");

    rotEl.classList.add("enter");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rotEl.classList.remove("enter");
      });
    });
  }, 300);
}

setInterval(rotateText, 2600);

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

reveals.forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contactForm");

const submitBtn = document.getElementById("submitBtn");

const btnText = document.getElementById("btnText");

const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    submitBtn.disabled = true;

    btnText.textContent = "Opening WhatsApp...";

    formStatus.textContent = "";

    formStatus.className = "form-status";

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    const whatsappMessage = `Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}`;

    const whatsappURL = `https://wa.me/919304748651?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");

    formStatus.textContent = "✓ Redirecting to WhatsApp";

    formStatus.classList.add("success");

    contactForm.reset();

    submitBtn.disabled = false;

    btnText.textContent = "Send Message";
  });
}

const progressBar = document.querySelector(".scroll-progress");

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

    if (window.scrollY > 500) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  },
  {
    passive: true,
  }
);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
