
/* =========================================================
   INOVA RAW | JAVASCRIPT PROFESIONAL
   FOTOGRAFÍA Y VIDEO PROFESIONAL
   DESARROLLADO PARA INOVA RAW
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       1. CONFIGURACIÓN GENERAL
    ===================================================== */

    const CONFIG = {

        brand: "INOVA RAW",

        photographer: "CÈSAR PORTILLO",

        whatsapp: "50373859232",

        defaultSection: "inicio",

        validSections: [
            "inicio",
            "sobre",
            "galeria",
            "paquetes"
        ]

    };


    /* =====================================================
       2. ELEMENTOS DEL DOCUMENTO
    ===================================================== */

    const navButtons = document.querySelectorAll(".nav-btn");

    const sections = document.querySelectorAll(".section");

    const heroButtons = document.querySelectorAll(".open-section");

    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    const lightbox = document.querySelector(".lightbox");

    const lightboxImg = document.querySelector(".lightbox-img");

    const closeLightbox = document.querySelector(".close-lightbox");

    const header = document.querySelector(".header");

    const currentYear = document.querySelector("#current-year");

    const cards = document.querySelectorAll(".card");

    const packageButtons = document.querySelectorAll(".contract-btn");


    /* =====================================================
       3. NAVEGACIÓN ENTRE SECCIONES
    ===================================================== */

    function showSection(sectionId) {

        const targetSection = document.getElementById(sectionId);

        if (
            !targetSection ||
            !CONFIG.validSections.includes(sectionId) ||
            !targetSection.classList.contains("section")
        ) {

            console.warn(
                "INOVA RAW: SECCIÓN NO ENCONTRADA:",
                sectionId
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


        // ACTIVAR BOTÓN DEL MENÚ

        const activeButton = document.querySelector(
            `.nav-btn[data-section="${sectionId}"]`
        );

        if (activeButton) {

            activeButton.classList.add("active");

            activeButton.setAttribute("aria-current", "page");

        }


        // CERRAR LIGHTBOX

        closeBox();


        // SUBIR AL INICIO

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    /* =====================================================
       4. EVENTOS DEL MENÚ
    ===================================================== */

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const sectionId = button.dataset.section;

            if (sectionId) {

                showSection(sectionId);

            }

        });

    });


    /* =====================================================
       5. BOTONES DE LA PORTADA
    ===================================================== */

    heroButtons.forEach(button => {

        button.addEventListener("click", () => {

            const sectionId = button.dataset.open;

            if (sectionId) {

                showSection(sectionId);

            }

        });

    });


    /* =====================================================
       6. LIGHTBOX - ABRIR FOTOGRAFÍAS
    ===================================================== */

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


    /* =====================================================
       7. EVENTOS DE LA GALERÍA
    ===================================================== */

    galleryImages.forEach(image => {

        image.style.cursor = "pointer";

        image.setAttribute("tabindex", "0");

        image.setAttribute("role", "button");

        image.setAttribute(
            "aria-label",
            "AMPLIAR " + (image.alt || "FOTOGRAFÍA")
        );


        // ABRIR CON CLIC

        image.addEventListener("click", () => {

            openLightbox(image);

        });


        // ABRIR CON TECLADO

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


    /* =====================================================
       8. LIGHTBOX - CERRAR FOTOGRAFÍAS
    ===================================================== */

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


    // BOTÓN CERRAR

    if (closeLightbox) {

        closeLightbox.addEventListener("click", closeBox);

    }


    /* =====================================================
       9. CERRAR LIGHTBOX AL HACER CLIC FUERA
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                closeBox();

            }

        });

    }


    /* =====================================================
       10. CERRAR LIGHTBOX CON ESCAPE
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox?.classList.contains("active-lightbox")
        ) {

            closeBox();

        }

    });


    /* =====================================================
       11. GENERADOR AUTOMÁTICO DE MENSAJES WHATSAPP
    ===================================================== */

    function generateWhatsAppMessage(card) {

        if (!card) {

            return "";

        }

        const packageName = card.querySelector("h3");

        const packagePrice = card.querySelector("h4");

        const packageItems = card.querySelectorAll("ul li");


        if (!packageName || !packagePrice) {

            console.warn(
                "INOVA RAW: FALTAN DATOS EN UNA TARJETA DE PAQUETE."
            );

            return "";

        }


        // NOMBRE DEL PAQUETE

        const name = packageName.textContent.trim();

        const price = packagePrice.textContent.trim();


        // SERVICIOS INCLUIDOS

        const services = Array.from(packageItems)

            .map(item => item.textContent.trim())

            .filter(Boolean);


        // CONSTRUIR MENSAJE

        let message =

            "HOLA, QUIERO CONTRATAR EL " +
            name +
            " DE GRADUACIÓN.\n\n";


        message += "INCLUYE:\n";


        services.forEach(service => {

            message += "- " + service + "\n";

        });


        message += "\nPRECIO: " + price;


        // CONVERTIR TODO A MAYÚSCULAS

        return message.toLocaleUpperCase("es-SV");

    }


    /* =====================================================
       12. CONFIGURAR BOTONES DE CONTRATACIÓN
    ===================================================== */

    packageButtons.forEach(button => {

        const card = button.closest(".card");

        if (!card) {

            return;

        }


        const message = generateWhatsAppMessage(card);

        if (!message) {

            return;

        }


        // GENERAR ENLACE AUTOMÁTICO

        const whatsappURL =

            "https://wa.me/" +
            CONFIG.whatsapp +
            "?text=" +
            encodeURIComponent(message);


        button.setAttribute("href", whatsappURL);

        button.setAttribute("target", "_blank");

        button.setAttribute("rel", "noopener noreferrer");


        const packageName = card.querySelector("h3");

        if (packageName) {

            button.setAttribute(
                "aria-label",
                "CONTRATAR " + packageName.textContent.trim()
            );

        }

    });


    /* =====================================================
       13. AÑO AUTOMÁTICO DEL FOOTER
    ===================================================== */

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =====================================================
       14. EFECTO DEL HEADER AL DESPLAZARSE
    ===================================================== */

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


    /* =====================================================
       15. ANIMACIONES DE LAS TARJETAS
    ===================================================== */

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


    /* =====================================================
       16. COMPROBACIÓN DE CARGA DE FOTOGRAFÍAS
    ===================================================== */

    galleryImages.forEach(image => {


        // ERROR AL CARGAR

        image.addEventListener("error", () => {

            console.warn(
                "INOVA RAW: NO SE PUDO CARGAR LA IMAGEN:",
                image.src
            );

            image.classList.add("image-error");

        });


        // CARGA CORRECTA

        image.addEventListener("load", () => {

            image.classList.remove("image-error");

        });


        // COMPROBAR IMÁGENES YA CARGADAS

        if (image.complete && image.naturalWidth === 0) {

            image.classList.add("image-error");

        }

    });


    /* =====================================================
       17. PROTECCIÓN DEL MENÚ CONTEXTUAL
    ===================================================== */

    document.querySelectorAll(

        ".gallery-item img, .about-image img"

    ).forEach(image => {

        image.addEventListener("contextmenu", event => {

            event.preventDefault();

        });

    });


    /* =====================================================
       18. EVITAR ARRASTRAR FOTOGRAFÍAS
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.setAttribute("draggable", "false");

        image.addEventListener("dragstart", event => {

            event.preventDefault();

        });

    });


    /* =====================================================
       19. VALIDACIÓN DE ENLACES DE WHATSAPP
    ===================================================== */

    packageButtons.forEach(link => {

        const href = link.getAttribute("href");

        if (!href || !href.includes("wa.me/" + CONFIG.whatsapp)) {

            console.warn(

                "INOVA RAW: REVISA EL ENLACE DE WHATSAPP:",

                link

            );

        }

    });


    /* =====================================================
       20. VALIDACIÓN DEL MENÚ DE NAVEGACIÓN
    ===================================================== */

    navButtons.forEach(button => {

        const sectionId = button.dataset.section;

        if (!CONFIG.validSections.includes(sectionId)) {

            console.warn(

                "INOVA RAW: BOTÓN DE NAVEGACIÓN NO VÁLIDO:",

                button

            );

        }

    });


    /* =====================================================
       21. VALIDAR TARJETAS DE PAQUETES
    ===================================================== */

    cards.forEach((card, index) => {

        const name = card.querySelector("h3");

        const price = card.querySelector("h4");

        const list = card.querySelector("ul");

        const button = card.querySelector(".contract-btn");


        if (!name || !price || !list || !button) {

            console.warn(

                "INOVA RAW: TARJETA DE PAQUETE INCOMPLETA:",

                index + 1

            );

        }

    });


    /* =====================================================
       22. INICIALIZAR SITIO WEB
    ===================================================== */

    showSection(CONFIG.defaultSection);


    /* =====================================================
       23. MENSAJES DE CONSOLA
    ===================================================== */

    console.log(

        `%c ${CONFIG.brand} `,

        "background:#d6b13d;color:#050505;font-size:18px;font-weight:800;padding:10px 20px;border-radius:5px;"

    );


    console.log(

        `%c FOTOGRAFÍA Y VIDEO PROFESIONAL | ${CONFIG.photographer}`,

        "color:#d6b13d;font-size:12px;font-weight:bold;"

    );


    console.log(

        "%c PAQUETES DE GRADUACIÓN CONFIGURADOS CORRECTAMENTE.",

        "color:#22c55e;font-size:12px;font-weight:bold;"

    );


    console.log(

        "%c WHATSAPP: +503 7385-9232",

        "color:#22c55e;font-size:12px;font-weight:bold;"

    );


    console.log(

        "%c SITIO WEB CARGADO CORRECTAMENTE.",

        "color:#22c55e;font-size:12px;font-weight:bold;"

    );


});
