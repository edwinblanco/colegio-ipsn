<script setup></script>

<template>
    <a href="#" class="scroll-to-top" title="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 9l-7-7-7 7"></path>
            <path d="M12 4v16"></path>
        </svg>
    </a>
</template>

<style scoped>
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    border: 2px solid #00ac46;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 8px;
    cursor: pointer;
    transition:
        background-color 0.3s,
        box-shadow 0.3s,
        transform 0.3s;
    text-align: center;
    z-index: 1000;
}

.scroll-to-top:hover {
    background-color: #00ac453f;
    color: #ffffff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: scale(1.1);
}

.icon {
    width: 24px;
    height: 24px;
    stroke: #00ac46;
}

.icon path {
    stroke-width: 2;
}
</style>
