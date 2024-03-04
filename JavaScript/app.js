
/*----------------------------------------------Carrusel de imagenes---------------------------------------------------------*/
let currentIndex = 0;
const slider = document.getElementById('image-slider');
const images = document.querySelectorAll('.image');
const totalImages = images.length;
let intervalId;

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
    restartInterval();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
    restartInterval();
}

function updateSlider() {
    const newPosition = -currentIndex * 100 + 'vw';
    slider.style.transition = 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
    slider.style.transform = 'translateX(' + newPosition + ')';

    images.forEach((image, index) => {
        const opacityValue = (index === currentIndex) ? 1 : 0;
        image.style.opacity = opacityValue;
    });

    updateIndicators(); // Agregado para actualizar los indicadores al cambiar de imagen
}

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators-container');

    for (let i = 0; i < totalImages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.setAttribute('data-index', i);
        indicator.addEventListener('click', () => goToImage(i));
        indicatorsContainer.appendChild(indicator);
    }

    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToImage(index) {
    currentIndex = index;
    updateSlider();
    restartInterval();
}

function restartInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImage, 5000);
}

function stopInterval() {
    clearInterval(intervalId);
}

createIndicators(); // Llamado para crear los indicadores al inicio
intervalId = setInterval(nextImage, 5000);

/*---------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------Grupo de trabajo----------------------------------------------------------*/
function redireccionar(pagina) {
    window.location.href = pagina;
  }
/*---------------------------------------------------------------------------------------------------------------------------*/