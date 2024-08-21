<script setup></script>

<template>
    <div id="info-recursos-padres" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-50">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Información y Recursos para Padres</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Recurso 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 4h14v2H5V4zm0 4h14v2H5V8zm0 4h14v2H5v-2zm0 4h14v2H5v-2z" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Guías de Apoyo</h3>
                        <p class="font-normal text-lg text-green-600">Encuentra guías útiles para apoyar a tus hijos en su educación. Incluye consejos prácticos sobre cómo crear un ambiente de estudio en casa y cómo motivar a tus hijos.</p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Recursos en Línea</h3>
                        <p class="font-normal text-lg text-green-600">
                            Accede a recursos digitales que te ayudarán a seguir el progreso académico de tus hijos y a apoyar su aprendizaje. Incluye enlaces a plataformas educativas y herramientas útiles.
                        </p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v8l6 4V8l-6-4z" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Colaboración Escuela-Hogar</h3>
                        <p class="font-normal text-lg text-green-600">
                            Aprende cómo colaborar de manera efectiva con la escuela para apoyar el aprendizaje de tus hijos. Incluye estrategias para comunicarte con los maestros y participar en actividades escolares.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="boletin-informativo" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Boletín Informativo</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Boletín 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H3v16h18V4zm-1 15H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V9h16v2z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Edición Actual</h3>
                        <p class="font-normal text-lg text-green-700">Lee la última edición de nuestro boletín informativo, que incluye noticias recientes del colegio, actualizaciones de eventos y otra información importante para los padres.</p>
                    </div>
                </div>
                <!-- Tarjeta de Boletín 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H3v16h18V4zm-1 15H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V9h16v2z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Archivo de Boletines</h3>
                        <p class="font-normal text-lg text-green-700">Accede a nuestro archivo de boletines anteriores para revisar actualizaciones pasadas y mantenerte al tanto de la evolución de nuestras actividades escolares.</p>
                    </div>
                </div>
                <!-- Tarjeta de Boletín 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H3v16h18V4zm-1 15H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V9h16v2z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Suscríbete</h3>
                        <p class="font-normal text-lg text-green-700">Suscríbete para recibir el boletín informativo directamente en tu correo electrónico y no te pierdas ninguna actualización importante del colegio.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="reuniones-eventos-padres" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-200">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Reuniones y Eventos para Padres</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Evento 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Reunión de Padres</h3>
                        <p class="font-normal text-lg text-green-800">Participa en nuestras reuniones de padres para discutir el progreso de los estudiantes y colaborar en la planificación escolar. ¡Tu participación es crucial!</p>
                    </div>
                </div>
                <!-- Tarjeta de Evento 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Conferencia de Educación</h3>
                        <p class="font-normal text-lg text-green-800">Asiste a nuestras conferencias sobre educación para obtener información valiosa y estrategias para apoyar el aprendizaje de tus hijos en casa.</p>
                    </div>
                </div>
                <!-- Tarjeta de Evento 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Eventos Comunitarios</h3>
                        <p class="font-normal text-lg text-green-800">
                            Participa en eventos comunitarios para fortalecer la relación entre los padres, estudiantes y la escuela. Mantente informado sobre nuestras actividades sociales y eventos especiales.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
