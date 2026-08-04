// ===============================
// Smooth Scroll for Learn More
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});


// ===============================
// Active Navbar Link
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 100;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// ===============================
// Contact Form
// ===============================

const form = document.querySelector("form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});


// ===============================
// Animated Statistics
// ===============================

const stats = document.querySelectorAll(".stat h2");

stats.forEach(stat=>{

    const target = parseInt(stat.innerText);

    if(isNaN(target)) return;

    let count = 0;

    const speed = target / 100;

    const update = ()=>{

        count += speed;

        if(count < target){

            stat.innerText = Math.ceil(count);

            requestAnimationFrame(update);

        }

        else{

            stat.innerText = target + "+";

        }

    };

    update();

});


// ===============================
// Fade Animation
// ===============================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".feature-card,.step,.stat").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});