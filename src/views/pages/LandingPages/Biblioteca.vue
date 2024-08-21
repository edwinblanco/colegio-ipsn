<script setup></script>

<template>
    <div id="catalogo-recursos" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Catálogo de Libros y Recursos Disponibles</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Catálogo 1 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v12H4V4zm0 14v-2h16v2H4zm0-4h16v2H4v-2zm0-4h16v2H4v-2z" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Libros de Texto</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Accede a nuestra base de datos de libros de texto disponibles en la biblioteca para todas las materias y niveles.</p>
                    </div>
                </div>
                <!-- Tarjeta de Catálogo 2 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5H4v14h16V5zM4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Revistas Académicas</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Consulta nuestra colección de revistas académicas y científicas para investigaciones y trabajos.</p>
                    </div>
                </div>
                <!-- Tarjeta de Catálogo 3 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V2H4v20h16V4h-8zm-2 6H6v2h4v-2zm0 4H6v2h4v-2zm8-4h-4v2h4v-2zm0 4h-4v2h4v-2z" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Materiales Adicionales</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Explora otros recursos disponibles como guías, manuales y materiales de referencia.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="horarios-biblioteca" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Horarios de la Biblioteca</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Horarios 1 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Lunes a Viernes</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">8:00 AM - 6:00 PM</p>
                    </div>
                </div>
                <!-- Tarjeta de Horarios 2 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Sábados</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">9:00 AM - 1:00 PM</p>
                    </div>
                </div>
                <!-- Tarjeta de Horarios 3 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Domingos</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Cerrado</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="recursos-en-linea" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Recursos en Línea</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tarjeta de Recurso 1 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Bases de Datos</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Enlaces a bases de datos académicas y científicas para investigaciones y estudios avanzados.</p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 2 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Ebooks</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Accede a una amplia colección de libros electrónicos disponibles para su lectura en línea.</p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 3 -->
                <div class="group relative overflow-hidden rounded-lg shadow-lg bg-white p-6 flex items-center space-x-4 transition-transform duration-300 hover:bg-green-50 hover:shadow-xl">
                    <div class="flex-shrink-0">
                        <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18m-6-6h12m-6-6h6M6 6h12" /></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Artículos y Revistas</h3>
                        <p class="font-normal text-xl leading-normal text-green-600">Explora artículos y revistas en línea sobre una variedad de temas académicos y de interés general.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
