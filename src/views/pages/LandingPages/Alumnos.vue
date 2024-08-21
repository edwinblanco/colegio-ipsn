<script setup></script>

<template>
    <div id="info-recursos-estudiantes" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-50">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Información y Recursos para Estudiantes</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Recurso 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4v16h16V4H4zm2 2v12h12V6H6z" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Guías de Estudio</h3>
                        <p class="font-normal text-lg text-green-600">
                            Accede a guías y tutoriales que te ayudarán a comprender mejor las materias y prepararte para los exámenes. Nuestras guías cubren desde matemáticas hasta ciencias sociales, diseñadas para estudiantes de todos los niveles.
                        </p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 5h14v14H5V5zm2 2v10h10V7H7z" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Tutoriales</h3>
                        <p class="font-normal text-lg text-green-600">Explora tutoriales en línea que te guiarán a través de diversos temas y habilidades esenciales. Incluye tutoriales de ciencias, lenguas y habilidades técnicas.</p>
                    </div>
                </div>
                <!-- Tarjeta de Recurso 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-100 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-600"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v8l6 4V8l-6-4z" /></svg>
                        <h3 class="text-3xl font-bold text-green-600 mb-4">Consejos Académicos</h3>
                        <p class="font-normal text-lg text-green-600">
                            Lee consejos prácticos para mejorar tus habilidades de estudio y gestionar mejor tu tiempo. Encontrarás estrategias para organizar tus tareas y técnicas para mejorar la concentración.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="horarios-clases" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Horarios de Clases</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Horario 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Nivel Primaria</h3>
                        <p class="font-normal text-lg text-green-700">Consulta los horarios de clases para los estudiantes de primaria. Los horarios incluyen las asignaturas y sus respectivos tiempos a lo largo de la semana.</p>
                    </div>
                </div>
                <!-- Tarjeta de Horario 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Nivel Secundaria</h3>
                        <p class="font-normal text-lg text-green-700">Revisa los horarios de clases para secundaria. Los horarios están organizados por materias y períodos de clase.</p>
                    </div>
                </div>
                <!-- Tarjeta de Horario 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-700"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-700"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" /></svg>
                        <h3 class="text-3xl font-bold text-green-700 mb-4">Nivel Preescolar</h3>
                        <p class="font-normal text-lg text-green-700">Consulta los horarios de clases para los estudiantes de preescolar. Incluye actividades diarias y programas semanales.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="resultados-logros" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-200">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Resultados y Logros</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de Resultados 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Resultados de Exámenes</h3>
                        <p class="font-normal text-lg text-green-800">Revisa los resultados más recientes de los exámenes para ver cómo han progresado los estudiantes en sus evaluaciones académicas.</p>
                    </div>
                </div>
                <!-- Tarjeta de Resultados 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Logros Académicos</h3>
                        <p class="font-normal text-lg text-green-800">Celebra los logros académicos destacados de nuestros estudiantes, desde premios hasta reconocimientos especiales en distintas disciplinas.</p>
                    </div>
                </div>
                <!-- Tarjeta de Resultados 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-300 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <svg class="w-12 h-12 text-green-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" /></svg>
                        <h3 class="text-3xl font-bold text-green-800 mb-4">Reconocimientos Especiales</h3>
                        <p class="font-normal text-lg text-green-800">Conoce los reconocimientos especiales otorgados a estudiantes por sus esfuerzos y habilidades excepcionales, celebrando su dedicación y éxito.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
