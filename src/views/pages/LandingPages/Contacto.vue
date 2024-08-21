<script setup></script>

<template>
    <div id="contact-info" class="relative flex flex-col items-center text-center pt-6 px-6 lg:px-20 overflow-hidden" style="min-height: 65vh">
        <div class="relative flex flex-col md:flex-row items-stretch mx-6 md:mx-20 mt-0 md:mt-6 z-20">
            <!-- Información de contacto -->
            <div class="flex flex-col w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg flex-grow mr-5">
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6">Información de Contacto</h2>
                <p class="font-normal text-2xl leading-normal text-green-600">Puedes ponerte en contacto con nosotros a través de los siguientes medios. Estamos aquí para responder tus preguntas y ayudarte con lo que necesites.</p>
                <div class="mt-8">
                    <p class="text-xl font-semibold text-green-800">Teléfono:</p>
                    <p class="text-lg text-green-600">+57 123 456 789</p>
                </div>
                <div class="mt-4">
                    <p class="text-xl font-semibold text-green-800">Correo Electrónico:</p>
                    <p class="text-lg text-green-600">contacto@ipsnb.edu.co</p>
                </div>
                <div class="mt-4">
                    <p class="text-xl font-semibold text-green-800">Dirección:</p>
                    <p class="text-lg text-green-600">Calle 123 #45-67, Norte de Bucaramanga</p>
                </div>
            </div>

            <!-- Formulario de contacto -->
            <div class="flex flex-col w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg mt-8 md:mt-0 flex-grow">
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6">Envíanos un Mensaje</h2>
                <form>
                    <div class="mb-4">
                        <label for="name" class="block text-xl font-semibold text-green-800">Nombre:</label>
                        <input type="text" id="name" class="w-full p-3 border border-green-300 rounded-lg" placeholder="Tu nombre" required />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-xl font-semibold text-green-800">Correo Electrónico:</label>
                        <input type="email" id="email" class="w-full p-3 border border-green-300 rounded-lg" placeholder="Tu correo electrónico" required />
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-xl font-semibold text-green-800">Mensaje:</label>
                        <textarea id="message" class="w-full p-3 border border-green-300 rounded-lg" rows="4" placeholder="Tu mensaje" required></textarea>
                    </div>
                    <button type="submit" class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300">Enviar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
