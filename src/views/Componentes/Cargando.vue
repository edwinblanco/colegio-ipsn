<template>
    <div class="overlay">
        <div class="card flex justify-center">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>
    </div>
</template>
<style scoped>
    .overlay {
        position: fixed; /* Para que ocupe toda la pantalla */
        top: 0; /* Sin desplazamiento desde el borde superior */
        left: 0; /* Sin desplazamiento desde el borde izquierdo */
        width: 100vw; /* Ancho completo de la ventana */
        height: 100vh; /* Alto completo de la ventana */
        display: flex; /* Para centrar el contenido */
        justify-content: center; /* Centrar horizontalmente */
        align-items: center; /* Centrar verticalmente */
        z-index: 9999; /* Asegurarse de que esté en la parte superior */
        background-color: rgba(0, 0, 0, 0.13);
    }
    .card {
        background: none; /* Eliminar el fondo del card */
        border: none; /* Eliminar el borde del card (opcional) */
    }
</style>
