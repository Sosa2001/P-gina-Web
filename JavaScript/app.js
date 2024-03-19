
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


/*-------------------------------------------------Videos index----------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('video');
  
    videos.forEach(function(video) {
      var previewTime = parseInt(video.dataset.previewTime);
      var firstPlay = true; // Bandera para controlar la primera reproducción
  
      if (!isNaN(previewTime)) {
        video.addEventListener('loadedmetadata', function() {
          video.currentTime = previewTime;
        });
  
        video.addEventListener('seeked', function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          video.nextElementSibling.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
        });
  
        // Agregamos un evento de clic para pausar/reproducir el video solo cuando se hace clic en la vista previa
        video.nextElementSibling.addEventListener('click', function(event) {
          event.stopPropagation(); // Evita que el clic se propague al video
  
          if (firstPlay) {
            video.currentTime = 0; // Reproduce desde el inicio la primera vez
            firstPlay = false; // Actualiza la bandera
          }
  
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
  
        // Agregamos un evento para controlar la primera reproducción cuando se presiona el botón de reproducción del video
        video.addEventListener('play', function() {
          if (firstPlay) {
            video.currentTime = 0; // Reproduce desde el inicio la primera vez
            firstPlay = false; // Actualiza la bandera
          }
        });
      }
    });
  });
  
/*---------------------------------------------------------------------------------------------------------------------------*/
