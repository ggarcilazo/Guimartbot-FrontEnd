
    function showCards(option) {
        const ganarContent = document.getElementById('ganar-content');
        const canjearContent = document.getElementById('canjear-content');

        // Oculta ambos contenidos
        ganarContent.style.display = 'none';
        canjearContent.style.display = 'none';

        // Muestra el contenido seleccionado
        if (option === 'ganar') {
            ganarContent.style.display = 'flex'; // Cambiar a 'flex' para mantener el diseño responsivo
            setActiveButton('Ganar');
        } else if (option === 'canjear') {
            canjearContent.style.display = 'flex'; // Cambiar a 'flex'
            setActiveButton('Canjear');
        }
    }

    function setActiveButton(activeOption) {
        const buttons = document.querySelectorAll('.age-btn');

        // Restablece el estado activo para todos los botones
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Añade la clase activa al botón seleccionado
        const activeButton = Array.from(buttons).find(btn => btn.innerText === activeOption);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    // Configura el estado inicial al cargar la página
    window.onload = function() {
        showCards('ganar'); // Muestra el contenido de "Ganar" por defecto al cargar
    };


    


    /*CARGA AUTOMITA*/
    let currentCardIndex = 3; // Comenzar a mostrar desde la cuarta tarjeta

    // Función para mostrar las tarjetas
    function showCards(option) {
        const ganarContent = document.getElementById('ganar-content');
        const canjearContent = document.getElementById('canjear-content');
    
        // Oculta ambos contenidos
        ganarContent.style.display = 'none';
        canjearContent.style.display = 'none';
    
        // Muestra el contenido seleccionado
        if (option === 'ganar') {
            ganarContent.style.display = 'flex'; // Cambiar a 'flex' para mantener el diseño responsivo
            setActiveButton('Ganar');
        } else if (option === 'canjear') {
            canjearContent.style.display = 'flex'; // Cambiar a 'flex'
            setActiveButton('Canjear');
            resetCanjear(); // Llamar a resetCanjear cada vez que ingresas a Canjear
        }
    }
    
    // Función para establecer el botón activo
    function setActiveButton(activeOption) {
        const buttons = document.querySelectorAll('.age-btn');
    
        // Restablece el estado activo para todos los botones
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
    
        // Añade la clase activa al botón seleccionado
        const activeButton = Array.from(buttons).find(btn => btn.innerText === activeOption);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    // Configura el estado inicial al cargar la página
    window.onload = function() {
        showCards('ganar'); // Muestra el contenido de "Ganar" por defecto al cargar
    };
    
    // Función para cargar más tarjetas
    function loadMore() {
        const cards = document.querySelectorAll("#canjear-content .card");
        let visibleCount = 0;
    
        // Muestra las siguientes tres tarjetas ocultas
        for (let i = currentCardIndex; i < cards.length && visibleCount < 3; i++) {
            if (cards[i].style.display === "none") {
                cards[i].style.display = "block"; // Cambia a "block" para mostrar la tarjeta
                currentCardIndex++; // Incrementa el índice actual
                visibleCount++;
            }
        }
    
        // Si ya no hay más tarjetas para mostrar, oculta el botón
        if (currentCardIndex >= cards.length) {
            document.getElementById("load-more").style.display = "none";
        }
    }
    
    // Función para restablecer las tarjetas al entrar en la sección "Canjear"
    function resetCanjear() {
        const cards = document.querySelectorAll("#canjear-content .card");
        currentCardIndex = 3; // Reiniciar el índice
    
        // Ocultar todas las tarjetas después de la tercera
        for (let i = 3; i < cards.length; i++) {
            cards[i].style.display = "none"; // Oculta tarjetas adicionales
        }
    
        // Mostrar solo las primeras tres tarjetas
        for (let i = 0; i < 3; i++) {
            if (cards[i]) {
                cards[i].style.display = "block"; // Muestra las primeras tres tarjetas
            }
        }
    
        // Asegurarse de que el botón "Cargar más" esté visible
        document.getElementById("load-more").style.display = "block";
    }
    
    // Función que se llama al entrar en "Canjear"
    function enterCanjear() {
        showCards('canjear'); // Muestra la sección "Canjear"
    }
    