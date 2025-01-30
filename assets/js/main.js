// Variable Declaration

    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

// Login button function
loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "hsl(235, 70%, 60%)";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius= "0 30% 20% 0";
})

// Register button function
registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "hsl(235, 70%, 60%)";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius= "0 20% 30% 0";
})


// Manejo del formulario de registro
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Registro exitoso');
            window.location.href = '/login.html'; // Redirige al login
        } else {
            alert(result.error || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar el registro');
    }
});

// Seleccionar los campos de usuario y contraseña en el formulario de login
const usernameInput = document.querySelector('#loginForm input[name="username"]');
const passwordInput = document.querySelector('#loginForm input[name="password"]');
const roleKeyFieldLogin = document.getElementById('roleKeyFieldLogin');

// Función para verificar si los valores de usuario y contraseña son "Admin"
function checkAdminCredentials() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Mostrar el campo Role Key si ambos valores son "Admin"
    if (username === 'Admin' && password === 'Admin') {
        roleKeyFieldLogin.style.display = 'block';
    } else {
        roleKeyFieldLogin.style.display = 'none';
    }
}

// Agregar eventos de escucha para verificar cada vez que cambien los valores de usuario y contraseña
usernameInput.addEventListener('input', checkAdminCredentials);
passwordInput.addEventListener('input', checkAdminCredentials);

// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = this.querySelector('input[name="username"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const roleKey = this.querySelector('input[name="roleKey"]') ? this.querySelector('input[name="roleKey"]').value : null;

    const data = { username, password };
    
    // Agregar roleKey al objeto data si es visible y tiene valor
    if (roleKeyFieldLogin.style.display === 'block' && roleKey) {
        data.roleKey = roleKey;
    }

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            // Redirigir según la URL proporcionada por el servidor
            window.location.href = result.redirectUrl;
        } else {
            alert(result.error || 'Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar el inicio de sesión');
    }
});
