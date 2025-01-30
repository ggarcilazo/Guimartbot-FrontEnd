let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

document.addEventListener("DOMContentLoaded", function () {
   const gradientBackground = document.createElement('div');
   gradientBackground.classList.add('gradient-background');
   document.body.appendChild(gradientBackground);

   const applyColorPalette = (age) => {
       let backgroundColor, color, inputBackgroundColor, buttonColor, buttonHoverColor, gradientColors;

       if (age >= 5 && age <= 8) {
           backgroundColor = "#FFDDC1"; 
           color = "#333";
           inputBackgroundColor = "#FFF9C4";
           buttonColor = "#FFAB40";
           buttonHoverColor = "#FF9800";
           gradientColors = ['#FFDDC1', '#FFAB40']; 
       } else if (age >= 9 && age <= 18) {
           backgroundColor = "#A2DFF7"; 
           color = "#333";
           inputBackgroundColor = "#B3E5FC";
           buttonColor = "#29B6F6";
           buttonHoverColor = "#03A9F4";
           gradientColors = ['#A2DFF7', '#29B6F6']; 
       } else if (age >= 19 && age <= 30) {
           backgroundColor = "#C2E6A4";
           color = "#333";
           inputBackgroundColor = "#E8F5E9";
           buttonColor = "#66BB6A";
           buttonHoverColor = "#43A047";
           gradientColors = ['#C2E6A4', '#66BB6A'];
       }

       
       document.body.style.backgroundColor = backgroundColor;
       document.body.style.color = color;

       
       gradientBackground.style.background = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;

       
       const inputs = document.querySelectorAll("input.box");
       inputs.forEach(input => {
           input.style.backgroundColor = inputBackgroundColor;
           input.style.color = color;
       });

       
       const buttons = document.querySelectorAll(".btn");
       buttons.forEach(button => {
           button.style.backgroundColor = buttonColor;
           button.style.color = "#fff"; 
           button.style.border = "none"; 
           button.onmouseover = function () {
               this.style.backgroundColor = buttonHoverColor; 
           };
           button.onmouseout = function () {
               this.style.backgroundColor = buttonColor; 
           };
       });
   };

   const onMouseMove = (e) => {
       const { clientX: mouseX, clientY: mouseY } = e;
       const { innerWidth, innerHeight } = window;
       
       
       const red = Math.round((mouseX / innerWidth) * 255);
       const green = Math.round((mouseY / innerHeight) * 255);
       const blue = Math.round(200); 

      
       gradientBackground.style.background = `linear-gradient(135deg, rgba(${red}, ${green}, ${blue}, 0.7), rgba(${255 - red}, ${255 - green}, 255, 0.7))`;
   };
   document.addEventListener('mousemove', onMouseMove);
   const saveAge = (age) => {
       localStorage.setItem("userAge", age);
   };
   const getAge = () => {
       return localStorage.getItem("userAge");
   };
   const userAge = getAge();
   if (userAge) {
       applyColorPalette(parseInt(userAge));
   }

   const loginForm = document.querySelector("form[action='']"); 
   if (loginForm) {
       loginForm.addEventListener("submit", function (event) {
           event.preventDefault(); 
           const ageInput = loginForm.querySelector("input[name='edad']");
           const age = parseInt(ageInput.value);
           saveAge(age); 
           applyColorPalette(age); 
           window.location.href = "home.html"; 
       });
   }

  
   const registerForm = document.querySelector("form[action='']"); 
   if (registerForm) {
       registerForm.addEventListener("submit", function (event) {
           event.preventDefault(); 
           const ageInput = registerForm.querySelector("input[name='age']");
           const age = parseInt(ageInput.value);
           saveAge(age); 
           applyColorPalette(age); 
           window.location.href = "home.html"; 
       });
   }
});
