function openTab(tabName) {
  // Ocultar todas las pestañas
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach((tab) => {
    tab.classList.remove('active');
  });

  // Mostrar la pestaña seleccionada
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Actualizar las pestañas activas
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach((button) => {
    button.classList.remove('active');
    if (button.textContent.includes(tabName === 'liveChat' ? 'Chat en vivo' : 'Comentarios')) {
      button.classList.add('active');
    }
  });
}

// Función para manejar el envío de mensajes en el chat en vivo
function sendLiveChat() {
  const input = document.getElementById('liveChatInput');
  const message = input.value.trim();

  if (message) {
    // Crear el nuevo elemento de chat
    const chatArea = createMessageElement('Usuario', message, 'chat-area');

    // Añadir el nuevo mensaje al contenedor de chat
    const liveChatContainer = document.getElementById('liveChat');
    appendMessageToContainer(liveChatContainer, chatArea);
    
    // Limpiar el input
    input.value = '';
  }
}

// Función para manejar el envío de comentarios
function sendComment() {
  const input = document.getElementById('commentInput');
  const comment = input.value.trim();

  if (comment) {
    // Crear el nuevo elemento de comentario
    const commentBox = createMessageElement('Usuario', comment, 'comment-box');

    // Añadir el nuevo comentario al contenedor de comentarios
    const commentsContainer = document.getElementById('comments');
    appendMessageToContainer(commentsContainer, commentBox);
    
    // Limpiar el input
    input.value = '';
  }
}

// Función para crear un nuevo elemento de mensaje (chat o comentario)
function createMessageElement(username, message, className) {
  const messageElement = document.createElement('div');
  messageElement.className = className;
  messageElement.innerHTML = `
      <img src="usuario.png" alt="Foto de perfil" class="profile-image">
      <div>
          <strong>${username}:</strong>
          <p>${message}</p>
      </div>
  `;
  return messageElement;
}

// Función para añadir el mensaje al contenedor correspondiente
function appendMessageToContainer(container, messageElement) {
  const lastElement = container.querySelector('.input-area'); // Asegúrate de no insertar antes de la caja de input
  container.insertBefore(messageElement, lastElement);
}

