// Script para mostrar más comentarios
document.getElementById("load-more").addEventListener("click", function() {
    const extraReviews = document.querySelector(".extra-reviews");
    extraReviews.style.display = extraReviews.style.display === "block" ? "none" : "block";
    this.textContent = extraReviews.style.display === "block" ? "Ver menos comentarios" : "Ver más comentarios";
  });
  