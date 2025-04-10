document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.split-section');
    const container = document.querySelector('.split-container');
    const swipeIndicator = document.querySelector('.swipe-indicator');

    // Animación de entrada
    sections.forEach(section => {
        section.classList.add('animate');
    });

    // Actualizar el texto del indicador de deslizamiento al deslizar
    container.addEventListener('scroll', () => {
        const scrollPosition = container.scrollLeft;
        const sectionWidth = container.clientWidth;

        // Determinar qué sección está visible
        const activeIndex = Math.round(scrollPosition / sectionWidth);

        // Actualizar el texto del indicador de deslizamiento
        if (activeIndex === 0) {
            swipeIndicator.innerHTML = 'Desliza para mi Portafolio <i class="fas fa-arrow-right"></i>';
        } else {
            swipeIndicator.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a TechSoluciones';
        }
    });

    // Hacer que TechSoluciones sea la sección inicial
    container.scrollLeft = 0;
});