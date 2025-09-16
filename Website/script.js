const Update = () => {
    const element = document.getElementById("date");
    const date = new Date();
    element.innerText = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

setInterval(Update, 1000);
Update();

const toggleMenu = () => {
    document.getElementById("primaryNav").classList.toggle("hide");
};

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent = lastModified.toLocaleString();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();
if (today.getDay() === 1 || today.getDay() === 2) {
    document.getElementById("banner").style.display = "block";
} else {
    document.getElementById("banner").style.display = "none";
}

const images = document.querySelectorAll("[data-src]");

const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
        image.removeAttribute("data-src");
    };
};

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                loadImages(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, imgOptions);

    images.forEach((img) => {
        imgObserver.observe(img);
    });
} else {
    images.forEach((img) => {
        loadImages(img);
    });
}

const dateInput = document.getElementById("date-input");
const dateOutput = document.getElementById("date-output");

dateInput.addEventListener("change", (event) => {
    const selectedDate = new Date(event.target.value);
    if (!isNaN(selectedDate)) {
        dateOutput.textContent = selectedDate.toLocaleDateString("en-US", options);
    } else {
        dateOutput.textContent = "Invalid Date";
    }
});

const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Form submitted!");
});

const visitCountElement = document.getElementById("visit-count");
let visitCount = Number(localStorage.getItem("visitCount")) || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);
visitCountElement.textContent = `You have visited this site ${visitCount} time(s).`;