<script setup></script>

<template>
    <div
        id="historia"
        class="relative flex flex-col lg:flex-row items-center text-center lg:text-left px-6 lg:px-20 overflow-auto"
        style="
            min-height: 85vh;
            background-image: url('https://scontent.fbga1-3.fna.fbcdn.net/v/t39.30808-6/441867333_962317752564295_6639794790790531001_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFw2D4bHIv0epHgqvO1ikluFWSeyhxmylMVZJ7KHGbKU_REyeMb7lyes2tNkMaUhpQoMKhc34COC3ZGQ4h-xbmX&_nc_ohc=tkYr4gR-tnUQ7kNvgG2y4L5&_nc_ht=scontent.fbga1-3.fna&oh=00_AYD5GtCImK8fZ-2cQtu3diLYEKilS2SWSR6N9T0CaqEUtw&oe=66C88FE6');
            background-size: cover;
            background-position: center;
        "
    >
        <!-- Contenido de la historia -->
        <div class="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div class="relative z-20 w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start mx-6 md:mx-20 mt-0">
            <!-- Card de historia con imagen y texto -->
            <div class="w-full bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl relative z-20">
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-4 transition-transform duration-500 hover:scale-105 hover:text-green-900">Historia del Colegio</h2>
                <p class="font-normal text-2xl leading-normal text-green-600 text-justify mb-6">
                    Fundado en [Año], nuestro colegio ha recorrido un camino lleno de logros y transformaciones. Desde sus inicios, hemos trabajado con dedicación para proporcionar una educación de calidad, adaptándonos a los cambios y desafíos del
                    entorno educativo. A lo largo de los años, hemos alcanzado hitos importantes, que han marcado el crecimiento y la evolución de nuestra institución.
                </p>
            </div>
        </div>

        <!-- Línea de tiempo -->
        <div class="relative z-20 w-full lg:w-1/2 flex justify-center items-center lg:justify-center mt-6 lg:mt-0 lg:ml-6">
            <div class="relative flex flex-col items-center">
                <div class="absolute border-l-2 border-green-300 h-full" style="top: 0; left: 50%; transform: translateX(-50%)"></div>
                <div class="relative flex flex-col items-center">
                    <!-- Evento 1 -->
                    <div class="flex flex-col items-center mb-12">
                        <div class="w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                        <div class="text-center bg-white shadow-lg rounded-lg p-4 mt-2">
                            <h3 class="text-xl font-semibold text-green-800">[Hito Importante 1]</h3>
                            <p class="text-lg text-green-600">Descripción breve del hito importante 1.</p>
                        </div>
                    </div>
                    <!-- Evento 2 -->
                    <div class="flex flex-col items-center mb-12">
                        <div class="w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                        <div class="text-center bg-white shadow-lg rounded-lg p-4 mt-2">
                            <h3 class="text-xl font-semibold text-green-800">[Hito Importante 2]</h3>
                            <p class="text-lg text-green-600">Descripción breve del hito importante 2.</p>
                        </div>
                    </div>
                    <!-- Evento 3 -->
                    <div class="flex flex-col items-center mb-12">
                        <div class="w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                        <div class="text-center bg-white shadow-lg rounded-lg p-4 mt-2">
                            <h3 class="text-xl font-semibold text-green-800">[Hito Importante 3]</h3>
                            <p class="text-lg text-green-600">Descripción breve del hito importante 3.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="relative w-full my-10 flex justify-center">
        <div class="w-full md:w-3/4">
            <div class="w-full h-1 bg-green-300 shadow-lg"></div>
        </div>
    </div>

    <div id="sedes" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Nuestras Sedes</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Card de Sede Principal -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Sede Principal" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Sede Principal</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    La Sede Principal cuenta con todas las instalaciones necesarias para ofrecer una educación integral. Está equipada con aulas modernas, laboratorios, biblioteca, y espacios recreativos. Es el núcleo de nuestra institución, donde se
                    realizan la mayoría de las actividades académicas y administrativas.
                </p>
                <!-- Galería de imágenes -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 1 Sede Principal" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 2 Sede Principal" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 3 Sede Principal" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 4 Sede Principal" class="w-full h-24 object-cover rounded-lg" />
                </div>
                <div class="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.285494085823!2d-71.09798708454594!3d42.362398579186826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37081f85d7c4b%3A0x4b49612ea4b91f3d!2sHarvard%20University!5e0!3m2!1sen!2sus!4v1648543272348!5m2!1sen!2sus"
                        width="100%"
                        height="200"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <!-- Card de Sede Secundaria -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Sede Secundaria" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Sede Secundaria</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    La Sede Secundaria está dedicada a los estudiantes de los últimos años. Ofrece instalaciones avanzadas y programas especializados para preparar a los estudiantes para la educación superior y el mundo laboral. Cuenta con aulas
                    especializadas, áreas de estudio y espacios para actividades extracurriculares.
                </p>
                <!-- Galería de imágenes -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 1 Sede Secundaria" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 2 Sede Secundaria" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 3 Sede Secundaria" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 4 Sede Secundaria" class="w-full h-24 object-cover rounded-lg" />
                </div>
                <div class="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.285494085823!2d-71.09798708454594!3d42.362398579186826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37081f85d7c4b%3A0x4b49612ea4b91f3d!2sHarvard%20University!5e0!3m2!1sen!2sus!4v1648543272348!5m2!1sen!2sus"
                        width="100%"
                        height="200"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <!-- Card de Sede Infantil -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Sede Infantil" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Sede Infantil</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    La Sede Infantil está diseñada para proporcionar un entorno seguro y estimulante para los más pequeños. Equipado con aulas adaptadas, áreas de juego y recursos educativos específicos para el desarrollo infantil, esta sede es ideal
                    para los primeros años de educación.
                </p>
                <!-- Galería de imágenes -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 1 Sede Infantil" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 2 Sede Infantil" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 3 Sede Infantil" class="w-full h-24 object-cover rounded-lg" />
                    <img src="https://via.placeholder.com/200x150" alt="Imagen 4 Sede Infantil" class="w-full h-24 object-cover rounded-lg" />
                </div>
                <div class="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.285494085823!2d-71.09798708454594!3d42.362398579186826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37081f85d7c4b%3A0x4b49612ea4b91f3d!2sHarvard%20University!5e0!3m2!1sen!2sus!4v1648543272348!5m2!1sen!2sus"
                        width="100%"
                        height="200"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>

    <div class="relative w-full my-10 flex justify-center">
        <div class="w-full md:w-3/4">
            <div class="w-full h-1 bg-green-300 shadow-lg"></div>
        </div>
    </div>

    <div id="filosofia" class="relative flex flex-col items-center text-center px-6 lg:px-20 overflow-hidden" style="min-height: auto">
        <div class="w-full bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6 transition-transform duration-500 hover:scale-105 hover:text-green-900">Filosofía Educativa</h2>
            <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                La IEPSN es una institución educativa incluyente que acoge a niños y jóvenes sin ninguna discriminación por motivos de raza, nacionalidad, sexo, condición sexual o de género y condición económica o social. Está dispuesta a trabajar
                por el desarrollo de sus potencialidades y a ofrecer condiciones especiales para atender a niños y jóvenes que estén en condiciones de vulnerabilidad por desplazamiento, limitaciones físicas, mentales, violencia intrafamiliar, pobreza
                y descomposición social. <br> Al ingresar a la institución, los matriculados serán tratados en condiciones de igualdad por semejanza, es decir, no se le aplicará ninguna discriminación; y por diferencia, implica que se les ofrecen más
                oportunidades a quienes más las necesitan para alcanzar los mismos objetivos de desarrollo integral y por su condición de género. <br> A todos los estudiantes, sin excepción, se les ofrece una educación integral, tendiente a la adquisición
                de conocimientos, a la apropiación crítica de los valores, a la adquisición de pensamiento lógico - racional, de competencias interpretativas, argumentativas y propositivas, a la adhesión de las causas justas de la comunidad; a
                aprender a valorar el esfuerzo, a actuar como miembro de un grupo social y a proponer soluciones para los eventos problemáticos a los que cada uno se enfrente. <br> De igual manera está definido que el trato que se les otorga está basado
                en el afecto, la protección y el respeto. Se practica y se enseña tolerancia, solidaridad, cooperación y civilidad, pero se exige reciprocidad, disciplina, ética, compromiso con los demás, sentido de preservación del ambiente escolar
                y, en general, respeto por la vida y el planeta tierra.
            </p>
        </div>
    </div>

    <div class="relative w-full my-10 flex justify-center">
        <div class="w-full md:w-3/4">
            <div class="w-full h-1 bg-green-300 shadow-lg"></div>
        </div>
    </div>

    <!-- Sección Equipo Directivo y Profesores -->
    <div id="equipo-directivo" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-white overflow-hidden">
        <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6">Nuestro Equipo Directivo y Profesores</h2>
        <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
            Conoce a los líderes y educadores que forman parte de nuestra institución. Cada miembro de nuestro equipo está comprometido con la excelencia educativa y el desarrollo integral de nuestros estudiantes.
        </p>

        <!-- Tarjetas de perfil -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-6 md:mx-12">
            <!-- Perfil 1 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 1" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 1</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>

            <!-- Perfil 2 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 2" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 2</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>

            <!-- Perfil 3 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 3" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 3</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>

            <!-- Más perfiles se pueden agregar aquí -->
            <!-- Perfil 1 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 1" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 1</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>

            <!-- Perfil 2 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 2" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 2</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>

            <!-- Perfil 3 -->
            <div class="bg-white shadow-lg rounded-lg p-6 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-4">
                    <img src="https://via.placeholder.com/150" alt="Foto del Directivo/Profesor 3" class="w-24 h-24 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h3 class="text-2xl font-semibold text-green-800 mb-2">Nombre del Directivo/Profesor 3</h3>
                <p class="text-lg font-normal text-green-600 mb-4">Título y descripción breve del rol o especialidad.</p>
            </div>
        </div>
    </div>

    <div class="relative w-full my-10 flex justify-center">
        <div class="w-full md:w-3/4">
            <div class="w-full h-1 bg-green-300 shadow-lg"></div>
        </div>
    </div>

    <div id="instalaciones" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Nuestras Instalaciones</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Card de Aula -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Aula" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Aulas</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    Nuestras aulas están equipadas con tecnología moderna para facilitar el aprendizaje interactivo y dinámico. Cada aula está diseñada para proporcionar un ambiente cómodo y estimulante para nuestros estudiantes.
                </p>
            </div>

            <!-- Card de Laboratorio -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Laboratorio" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Laboratorios</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    Nuestros laboratorios están diseñados para ofrecer a los estudiantes una experiencia práctica en ciencia y tecnología. Equipados con herramientas y materiales de alta calidad, fomentan la experimentación y el aprendizaje práctico.
                </p>
            </div>

            <!-- Card de Biblioteca -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Biblioteca" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Biblioteca</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    La biblioteca de nuestra institución ofrece una amplia gama de libros y recursos digitales para apoyar el aprendizaje de nuestros estudiantes. Es un espacio tranquilo y acogedor para el estudio y la investigación.
                </p>
            </div>

            <!-- Card de Espacios Recreativos -->
            <div class="bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center mb-6">
                    <img src="https://via.placeholder.com/400x300" alt="Espacios Recreativos" class="w-full h-40 object-cover rounded-lg" />
                </div>
                <h3 class="text-3xl font-semibold text-green-800 mb-4">Espacios Recreativos</h3>
                <p class="font-normal text-2xl leading-normal text-green-600 mb-6">
                    Contamos con espacios recreativos y áreas deportivas que permiten a los estudiantes relajarse y disfrutar de actividades físicas. Estos espacios están diseñados para fomentar la interacción social y el bienestar general.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
