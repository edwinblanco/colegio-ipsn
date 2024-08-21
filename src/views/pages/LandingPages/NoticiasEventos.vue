<script setup></script>

<template>
    <div id="noticias-recientes" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Noticias Recientes del Colegio</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img src="https://www.tvperu.gob.pe/sites/default/files/000119818w.jpg" alt="Evento Deportivo" class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300" />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Evento Deportivo</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">El colegio celebró su anual evento deportivo con la participación de todos los estudiantes. ¡Un día lleno de diversión y competencia sana!</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Leer Más</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://static.abc.es/media/sociedad/2022/06/26/1421045611-kPyE-U88115560170UjO-1248x698@abc.jpg"
                        alt="Concurso de Ciencia"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Concurso de Ciencia</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Felicitamos a nuestros estudiantes por su destacado desempeño en el concurso de ciencia regional, donde obtuvieron el primer lugar.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Leer Más</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://www.guatevision.com/wp-content/uploads/sites/2/2020/08/EA-09012020-EA-ESCUELAS02.jpg?quality=82"
                        alt="Charla Motivacional"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Charla Motivacional</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Este mes recibimos a un reconocido orador motivacional que inspiró a nuestros estudiantes a seguir sus sueños con determinación.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Leer Más</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="proximos-eventos" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-50">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Próximos Eventos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img src="https://www.tvperu.gob.pe/sites/default/files/000119818w.jpg" alt="Feria de Ciencias" class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300" />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Feria de Ciencias</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Fecha: 25 de septiembre. Ven y explora los proyectos científicos de nuestros estudiantes, donde la creatividad y la innovación se encuentran.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Más Detalles</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://static.abc.es/media/sociedad/2022/06/26/1421045611-kPyE-U88115560170UjO-1248x698@abc.jpg"
                        alt="Concierto de Navidad"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Concierto de Navidad</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Fecha: 15 de diciembre. Únete a nosotros para disfrutar de las presentaciones musicales de nuestros talentosos estudiantes en este evento festivo.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Más Detalles</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://www.guatevision.com/wp-content/uploads/sites/2/2020/08/EA-09012020-EA-ESCUELAS02.jpg?quality=82"
                        alt="Día de la Familia"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Día de la Familia</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Fecha: 10 de octubre. Un día especial dedicado a fortalecer los lazos familiares a través de actividades recreativas y educativas.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Más Detalles</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="anuncios-importantes" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Anuncios Importantes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img src="https://www.tvperu.gob.pe/sites/default/files/000119818w.jpg" alt="Cambio en Horarios" class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300" />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Cambio en Horarios</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">A partir del próximo lunes, los horarios de clase se modificarán debido a ajustes en el transporte escolar. Consulta los detalles aquí.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Ver Anuncio</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://static.abc.es/media/sociedad/2022/06/26/1421045611-kPyE-U88115560170UjO-1248x698@abc.jpg"
                        alt="Nueva Política de Uniformes"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Nueva Política de Uniformes</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">Se implementará una nueva política de uniformes a partir del próximo semestre. Es importante que todos los padres y estudiantes estén informados.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Ver Anuncio</p>
                    </div>
                </div>
                <div class="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                    <img
                        src="https://static.abc.es/media/sociedad/2022/06/26/1421045611-kPyE-U88115560170UjO-1248x698@abc.jpg"
                        alt="Cierre Temporal del Comedor"
                        class="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 class="text-3xl font-bold text-green-600 mb-4">Cierre Temporal del Comedor</h3>
                    <p class="font-normal text-2xl leading-normal text-green-600 mb-4">El comedor del colegio estará cerrado por mantenimiento durante la primera semana de octubre. Se ofrecerán opciones alternativas de comida.</p>
                    <div class="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-2xl">Ver Anuncio</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
