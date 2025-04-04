document.addEventListener("DOMContentLoaded", function () {
    // Inicializar AOS
    AOS.init({
        once: true,
        duration: 1000,
    });

    // Botón flotante
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Eventos para modal
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    // Abrir modal
    cards.forEach(card => {
        card.addEventListener('click', function() { 
            openModal(this); 
        });
        
        // Para dispositivos táctiles
        card.addEventListener('touchstart', function(e) { 
            if (!modal.classList.contains('show')) {
                e.preventDefault();
                openModal(this);
            }
        }, { passive: false });
    });

    // Cerrar modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
        closeButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            closeModal();
        }, { passive: false });
    }

    // Cerrar al hacer clic/tocar fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('touchstart', function(event) {
        if (event.target === modal) {
            event.preventDefault();
            closeModal();
        }
    }, { passive: false });

    // Funciones mejoradas
    function openModal(card) {
        const modalImage = document.getElementById("modal-image");
        const modalName = document.getElementById("modal-name");
        const modalDescription = document.getElementById("modal-description");
        const modalSocial1 = document.getElementById("modal-social-1");
        const modalSocial2 = document.getElementById("modal-social-2");

        // Obtener datos
        const image = card.getAttribute("data-image");
        const name = card.querySelector("h3").textContent;
        const description = card.getAttribute("data-description");
        const type = card.getAttribute("data-type");

        // Actualizar modal
        modalImage.src = image;
        modalName.textContent = name;
        modalDescription.textContent = description;

        // Configurar botones sociales
        if (type === "producer") {
            const social1 = card.getAttribute("data-social-1");
            const social2 = card.getAttribute("data-social-2");
            modalSocial1.href = social1;
            modalSocial2.href = social2;
            modalSocial2.style.display = "inline-block";
        } else {
            const social = card.getAttribute("data-social");
            modalSocial1.href = social;
            modalSocial2.style.display = "none";
        }

        // Mostrar modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Bloquear scroll de fondo
    }

    function closeModal() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restaurar scroll
    }
});