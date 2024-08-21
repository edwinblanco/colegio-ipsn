<script setup></script>

<template>
    <!-- Div para logotipos de redes sociales -->
    <div id="social-media">
        <a href="https://www.facebook.com" target="_blank" class="social-icon">
            <img src="https://cdn-icons-png.flaticon.com/256/124/124010.png" alt="Facebook" />
        </a>
        <a href="https://www.twitter.com" target="_blank" class="social-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/3938/3938028.png" alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" class="social-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" class="social-icon">
            <img src="https://cdn-icons-png.freepik.com/512/174/174857.png" alt="LinkedIn" />
        </a>
    </div>
</template>

<style scoped>
/* Estilos para el div de redes sociales */
#social-media {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff; /* Fondo opcional para mayor visibilidad */
    padding: 10px; /* Espaciado opcional */
    border-radius: 8px; /* Bordes redondeados opcional */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra opcional */
    z-index: 100; /* Asegura que esté sobre otros elementos */
}

.social-icon {
    margin-bottom: 10px; /* Espaciado entre iconos */
}

.social-icon img {
    width: 32px; /* Tamaño de los iconos */
    height: 32px;
    transition: opacity 0.3s; /* Transición opcional para efecto hover */
}

.social-icon img:hover {
    opacity: 0.7; /* Efecto hover opcional */
}

/* Estilos responsivos */
@media (max-width: 768px) {
    #social-media .social-icon {
        width: 25px;
        height: 25px;
        margin: 0 15;
        padding: 0px;
    }
}
</style>
