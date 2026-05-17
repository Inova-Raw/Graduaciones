document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // VARIABLES
    // =========================================

    const navButtons =
    document.querySelectorAll('.nav-btn');

    const sections =
    document.querySelectorAll('.section');

    const heroButtons =
    document.querySelectorAll('.open-section');

    const packageTabs =
    document.querySelectorAll('.package-tab');

    const packageContents =
    document.querySelectorAll('.package-content');

    const whatsappButtons =
    document.querySelectorAll('.whatsapp-btn');

    const galleryImages =
    document.querySelectorAll('.gallery-item img');

    const lightbox =
    document.querySelector('.lightbox');

    const lightboxImg =
    document.querySelector('.lightbox-img');

    const closeLightbox =
    document.querySelector('.close-lightbox');



    // =========================================
    // SHOW SECTION
    // =========================================

    function showSection(id){

        sections.forEach(section => {

            section.classList.remove('active-section');

        });

        navButtons.forEach(button => {

            button.classList.remove('active');

        });

        const activeSection =
        document.getElementById(id);

        if(activeSection){

            activeSection.classList.add('active-section');

        }

        const activeButton =
        document.querySelector(`[data-section="${id}"]`);

        if(activeButton){

            activeButton.classList.add('active');

        }

        window.scrollTo({

            top: 0,
            behavior: 'smooth'

        });

    }



    // =========================================
    // NAVIGATION
    // =========================================

    navButtons.forEach(button => {

        button.addEventListener('click', () => {

            const section =
            button.dataset.section;

            showSection(section);

        });

    });



    // =========================================
    // HERO BUTTONS
    // =========================================

    heroButtons.forEach(button => {

        button.addEventListener('click', () => {

            const section =
            button.dataset.open;

            showSection(section);

        });

    });



    // =========================================
    // PACKAGE TABS
    // =========================================

    packageTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            packageTabs.forEach(btn => {

                btn.classList.remove('active-tab');

            });

            packageContents.forEach(content => {

                content.classList.remove('active-package');

            });

            tab.classList.add('active-tab');

            const target =
            document.getElementById(tab.dataset.package);

            if(target){

                target.classList.add('active-package');

            }

        });

    });



    // =========================================
    // WHATSAPP
    // =========================================

    whatsappButtons.forEach(button => {

        button.addEventListener('click', () => {

            const card =
            button.closest('.card');

            const packageName =
            card.querySelector('h3').innerText;

            const packagePrice =
            card.querySelector('h4').innerText;

            const packageItems =
            card.querySelectorAll('ul li');

            let details = "";

            packageItems.forEach(item => {

                details += `• ${item.innerText}\n`;

            });

            const message =

`Hola 👋

Quiero contratar este paquete:

📸 ${packageName}

💵 Precio: ${packagePrice}

📋 Detalles:
${details}

Gracias 👌
Quedo pendiente de disponibilidad.`;

            const url =
`https://wa.me/50379096995?text=${encodeURIComponent(message)}`;

            window.open(url, '_blank');

        });

    });



    // =========================================
    // LIGHTBOX OPEN
    // =========================================

    galleryImages.forEach(image => {

        image.addEventListener('click', () => {

            lightbox.classList.add('active-lightbox');

            lightboxImg.src = image.src;

            document.body.style.overflow = "hidden";

        });

    });



    // =========================================
    // CLOSE LIGHTBOX
    // =========================================

    function closeBox(){

        lightbox.classList.remove('active-lightbox');

        document.body.style.overflow = "auto";

    }

    closeLightbox.addEventListener('click', closeBox);



    // =========================================
    // CLOSE OUTSIDE
    // =========================================

    lightbox.addEventListener('click', (e) => {

        if(e.target === lightbox){

            closeBox();

        }

    });



    // =========================================
    // ESC CLOSE
    // =========================================

    document.addEventListener('keydown', (e) => {

        if(e.key === "Escape"){

            closeBox();

        }

    });



    // =========================================
    // CARD ANIMATION
    // =========================================

    const cards =
    document.querySelectorAll('.card');

    const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0px)";

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
        "translateY(40px)";

        card.style.transition =
        ".6s ease";

        observer.observe(card);

    });



    // =========================================
    // IMAGE PRELOAD
    // =========================================

    window.addEventListener('load', () => {

        galleryImages.forEach(img => {

            const image = new Image();

            image.src = img.src;

        });

    });



    // =========================================
    // BLOCK RIGHT CLICK
    // =========================================

    document.querySelectorAll('img').forEach(img => {

        img.addEventListener('contextmenu', (e) => {

            e.preventDefault();

        });

    });



    // =========================================
    // IMAGE HOVER EFFECT
    // =========================================

    galleryImages.forEach(img => {

        img.addEventListener('mouseenter', () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener('mouseleave', () => {

            img.style.transform = "scale(1)";

        });

    });



    // =========================================
    // ACTIVE START
    // =========================================

    showSection('inicio');



    // =========================================
    // SCROLL HEADER EFFECT
    // =========================================

    window.addEventListener('scroll', () => {

        const header =
        document.querySelector('.header');

        if(window.scrollY > 50){

            header.style.background =
            "rgba(0,0,0,0.95)";

            header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.4)";

        }
        else{

            header.style.background =
            "rgba(0,0,0,0.8)";

            header.style.boxShadow =
            "none";

        }

    });



    // =========================================
    // BUTTON EFFECT
    // =========================================

    const allButtons =
    document.querySelectorAll('button');

    allButtons.forEach(button => {

        button.addEventListener('mouseenter', () => {

            button.style.transform =
            "translateY(-3px)";

        });

        button.addEventListener('mouseleave', () => {

            button.style.transform =
            "translateY(0px)";

        });

    });



    // =========================================
    // CONSOLE
    // =========================================

    console.log("CLICKEO FOTOGRAFÍA CARGADO");

});