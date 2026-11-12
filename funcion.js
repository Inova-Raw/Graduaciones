
/* =====================================================
   INOVA RAW | JAVASCRIPT PROFESIONAL
   FOTOGRAFÍA Y VIDEO PROFESIONAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =================================================
       1. ELEMENTOS PRINCIPALES
    ================================================= */

    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");
    const heroButtons = document.querySelectorAll(".open-section");

    const galleryImages = document.querySelectorAll(".gallery-item img");

    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    const header = document.querySelector(".header");
    const currentYear = document.querySelector("#current-year");

    const cards = document.querySelectorAll(".card");


    /* =================================================
       2. CONFIGURACIÓN GENERAL
    ================================================= */

    const CONFIG = {
        brand: "INOVA RAW",
        photographer: "CÈSAR PORTILLO",
        whatsapp: "50373859232",
        defaultSection: "inicio"
    };


    /* =================================================
       3. NAVEGACIÓN ENTRE SECCIONES
    ================================================= */

    function showSection(sectionId) {

        const targetSection = document.getElementById(sectionId);

        if (
            !targetSection ||
            !targetSection.classList.contains("section")
        ) {
            console.warn(
                `INOVA RAW: NO EXISTE LA SECCIÓN "${sectionId}".`
            );
            return;
        }

        // OCULTAR TODAS LAS SECCIONES

        sections.forEach(section => {

            section.classList.remove("active-section");

            section.setAttribute("aria-hidden", "true");

        });


        // DESACTIVAR BOTONES DEL MENÚ

        navButtons.forEach(button => {

            button.classList.remove("active");

            button.removeAttribute("aria-current");

        });


        // MOSTRAR SECCIÓN SELECCIONADA

        targetSection.classList.add("active-section");

        targetSection.setAttribute("aria-hidden", "false");


        // ACTIVAR BOTÓN CORRESPONDIENTE

        const activeButton = document.querySelector(
            `.nav-btn[data-section="${sectionId}"]`
        );

        if (activeButton) {

            activeButton.classList.add("active");

            activeButton.setAttribute("aria-current", "page");

        }


        // CERRAR LIGHTBOX

        closeBox();


        // VOLVER AL INICIO DE LA PÁGINA

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    /* =================================================
       4. EVENTOS DEL MENÚ DE NAVEGACIÓN
    ================================================= */

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const sectionId = button.dataset.section;

            if (sectionId) {

                showSection(sectionId);

            }

        });

    });


    /* =================================================
       5. BOTONES DE LA PORTADA
    ================================================= */

    heroButtons.forEach(button => {

        button.addEventListener("click", () => {

            const sectionId = button.dataset.open;

            if (sectionId) {

                showSection(sectionId);

            }

        });

    });


    /* =================================================
       6. LIGHTBOX - ABRIR FOTOGRAFÍAS
    ================================================= */

    function openLightbox(image) {

        if (!lightbox || !lightboxImg || !image) {
            return;
        }

        const imageSource = image.currentSrc || image.src;

        if (!imageSource) {
            return;
        }

        lightboxImg.src = imageSource;

        lightboxImg.alt = image.alt || "FOTOGRAFÍA DE INOVA RAW";

        lightbox.classList.add("active-lightbox");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (closeLightbox) {

            closeLightbox.focus();

        }

    }


    galleryImages.forEach(image => {

        // PERMITIR CLIC EN LAS FOTOGRAFÍAS

        image.style.cursor = "pointer";

        // ACCESIBILIDAD

        image.setAttribute("tabindex", "0");

        image.setAttribute("role", "button");

        image.setAttribute(
            "aria-label",
            "AMPLIAR " + (image.alt || "FOTOGRAFÍA")
        );


        image.addEventListener("click", () => {

            openLightbox(image);

        });


        // ABRIR CON ENTER O ESPACIO

        image.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLightbox(image);

            }

        });

    });


    /* =================================================
       7. LIGHTBOX - CERRAR FOTOGRAFÍAS
    ================================================= */

    function closeBox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active-lightbox");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (lightboxImg) {

            lightboxImg.removeAttribute("src");

            lightboxImg.alt = "";

        }

    }


    if (closeLightbox) {

        closeLightbox.addEventListener("click", closeBox);

    }


    /* =================================================
       8. CERRAR LIGHTBOX AL HACER CLIC FUERA
    ================================================= */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                closeBox();

            }

        });

    }


    /* =================================================
       9. CERRAR LIGHTBOX CON ESCAPE
    ================================================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox?.classList.contains("active-lightbox")
        ) {

            closeBox();

        }

    });


    /* =================================================
       10. AÑO AUTOMÁTICO DEL FOOTER
    ================================================= */

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =================================================
       11. EFECTO DEL HEADER AL DESPLAZARSE
    ================================================= */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    }


    window.addEventListener("scroll", updateHeader, {

        passive: true

    });

    updateHeader();


    /* =================================================
       12. ANIMACIÓN DE TARJETAS DE PAQUETES
    ================================================= */

    if ("IntersectionObserver" in window) {

        const cardObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("card-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


        cards.forEach(card => {

            card.classList.add("card-animated");

            cardObserver.observe(card);

        });

    } else {

        cards.forEach(card => {

            card.classList.add("card-visible");

        });

    }


    /* =================================================
       13. COMPROBACIÓN DE CARGA DE FOTOGRAFÍAS
    ================================================= */

    galleryImages.forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "INOVA RAW: NO SE PUDO CARGAR LA IMAGEN:",
                image.src
            );

            image.classList.add("image-error");

        });


        image.addEventListener("load", () => {

            image.classList.remove("image-error");

        });


        // COMPROBAR IMÁGENES QUE YA TERMINARON DE CARGAR

        if (image.complete && image.naturalWidth === 0) {

            image.classList.add("image-error");

        }

    });


    /* =================================================
       14. PROTECCIÓN DEL MENÚ CONTEXTUAL
    ================================================= */

    document.querySelectorAll(
        ".gallery-item img, .about-image img"
    ).forEach(image => {

        image.addEventListener("contextmenu", event => {

            event.preventDefault();

        });

    });


    /* =================================================
       15. EVITAR ARRASTRAR FOTOGRAFÍAS
    ================================================= */

    document.querySelectorAll("img").forEach(image => {

        image.setAttribute("draggable", "false");

        image.addEventListener("dragstart", event => {

            event.preventDefault();

        });

    });


    /* =================================================
       16. VALIDACIÓN DE ENLACES DE WHATSAPP
    ================================================= */

    document.querySelectorAll(
        ".contract-btn, .contact-whatsapp"
    ).forEach(link => {

        const href = link.getAttribute("href");

        if (!href || !href.includes("wa.me/")) {

            console.warn(
                "INOVA RAW: REVISA EL ENLACE DE WHATSAPP:",
                link
            );

        }

    });


    /* =================================================
       17. VALIDACIÓN DE BOTONES DE NAVEGACIÓN
    ================================================= */

    const validSections = [
        "inicio",
        "sobre",
        "galeria",
        "paquetes",
        "contacto"
    ];

    navButtons.forEach(button => {

        const sectionId = button.dataset.section;

        if (!validSections.includes(sectionId)) {

            console.warn(
                "INOVA RAW: BOTÓN DE NAVEGACIÓN NO VÁLIDO:",
                button
            );

        }

    });


    /* =================================================
       18. INICIALIZAR SITIO WEB
    ================================================= */

    showSection(CONFIG.defaultSection);


    /* =================================================
       19. MENSAJES DE CONSOLA
    ================================================= */

    console.log(

        `%c ${CONFIG.brand} `,

        "background:#d6b13d;color:#050505;font-size:18px;font-weight:800;padding:10px 20px;border-radius:5px;"

    );


    console.log(

        `%c FOTOGRAFÍA Y VIDEO PROFESIONAL | ${CONFIG.photographer}`,

        "color:#d6b13d;font-size:12px;font-weight:bold;"

    );


    console.log(

        "%c SITIO WEB CARGADO CORRECTAMENTE.",

        "color:#22c55e;font-size:12px;"

    );


});
