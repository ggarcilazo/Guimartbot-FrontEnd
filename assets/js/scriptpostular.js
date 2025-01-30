// Selección de elementos
const quizButton = document.getElementById("quiz-button");
const videoSection = document.getElementById("video-section");
const formSection = document.getElementById("form-section");
const certificateSection = document.getElementById("certificate-section");
const applicationSection = document.getElementById("application-section");

const courseVideo = document.getElementById("course-video");
const quizForm = document.getElementById("quiz-form");
const generateCertificateBtn = document.getElementById("generate-certificate-btn");
const nameInput = document.getElementById("name-input");
const certificatePreview = document.getElementById("certificate-preview");
const downloadCertificateBtn = document.getElementById("download-certificate-btn");

const applicationForm = document.getElementById("application-form");

// Inicialización
let videoWatched = false;

// Función para habilitar el botón después de ver el video 5 segundos
function enableQuizButton() {
  const player = new YT.Player(courseVideo, {
    events: {
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          setTimeout(() => {
            if (!videoWatched) {
              videoWatched = true;
              quizButton.disabled = false;
            }
          }, 5000); // Esperar 5 segundos
        }
      }
    }
  });
}

// Función para mostrar la sección
function showSection(section) {
  document.querySelectorAll(".section").forEach((sec) => {
    sec.classList.remove("active");
  });
  section.classList.add("active");
}

// Manejo del flujo

// Paso 1: Ir al formulario de cuestionario al presionar el botón
quizButton.addEventListener("click", () => {
  showSection(formSection);
});

// Paso 2: Manejar el envío del cuestionario
quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showSection(certificateSection);
});

// Paso 3: Generar el certificado
generateCertificateBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  // Crear el certificado dinámico
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const certificateImage = new Image();

  // Cargar la imagen local
  certificateImage.src = "assets/images/PARA EL VIDEO.jpg"; // Ruta local de la imagen

  certificateImage.onload = () => {
    canvas.width = certificateImage.width;
    canvas.height = certificateImage.height;

    // Dibujar la imagen base
    context.drawImage(certificateImage, 0, 0);

    // Estilizar el texto
    context.font = "100px Arial"; // Cambia el tamaño y la fuente según desees
    context.fillStyle = "#000"; // Cambia el color del texto
    context.textAlign = "center";

    // Colocar el nombre en el centro del certificado
    context.fillText(name, canvas.width / 2, canvas.height / 2);

    // Mostrar la vista previa
    const dataURL = canvas.toDataURL();
    certificatePreview.src = dataURL;
    certificatePreview.style.display = "block"; // Asegúrate de que se muestre

    // Habilitar la descarga
    downloadCertificateBtn.style.display = "block"; // Asegúrate de que el botón se muestre
    downloadCertificateBtn.disabled = false; // Habilitar el botón de descarga
    downloadCertificateBtn.onclick = () => {
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `certificado_${name}.png`; // Establecer el nombre del archivo
      link.click();

      // Navegar a la sección de aplicación después de descargar
      showSection(applicationSection);
    };
  };

  certificateImage.onerror = () => {
    alert("No se pudo cargar la imagen del certificado.");
  };
});

// Paso 5: Manejar la postulación
applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validar selección de área de estudio y documentos
  const studyArea = document.getElementById("study-area").value;
  const identityDoc = document.getElementById("identity-doc").files.length;
  const certificateDoc = document.getElementById("certificate-doc").files.length;

  if (!studyArea) {
    alert("Por favor, selecciona un área de estudio.");
    return;
  }
  if (identityDoc === 0 || certificateDoc === 0) {
    alert("Por favor, adjunta todos los documentos requeridos.");
    return;
  }

  alert("Postulación enviada exitosamente. Regresando al inicio.");
  location.reload(); // Recargar la página para volver al video
});

// Inicializar la funcionalidad del video al cargar la página
window.onload = () => {
  enableQuizButton();
};
