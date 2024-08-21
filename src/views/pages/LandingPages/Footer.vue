<script setup></script>

<template>
    <footer class="bg-[#00ac46] text-surface-0 py-8 px-6 lg:px-20 mt-20">
        <div class="container mx-auto">
            <div class="grid grid-cols-12 gap-8">
                <!-- Logo and Branding -->
                <div class="col-span-12 md:col-span-2 flex items-center justify-center md:justify-start mb-6">
                    <a @click="smoothScroll('#home')" class="flex items-center cursor-pointer">
                        <!-- Cambia el src por la URL de tu imagen -->
                        <img src="https://p.plataformaintegra.net/ipsnb/img/colegio/escudo_auth.jpg" alt="Instituto Logo" class="h-14 mr-2" />
                        <h4 class="text-3xl font-medium text-surface-0">Instituto de Promoción Social del Norte de Bucaramanga</h4>
                    </a>
                </div>

                <!-- Footer Links -->
                <div class="col-span-12 md:col-span-10 grid grid-cols-12 gap-8">
                    <!-- Información Escolar -->
                    <div class="col-span-12 md:col-span-3">
                        <h4 class="text-2xl font-medium mb-4 text-surface-0">Información Escolar</h4>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Sobre Nosotros</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Noticias</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Actividades</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Carreras</a>
                        <a href="#" class="block text-xl text-surface-200 hover:text-surface-100 transition-colors">Medios</a>
                    </div>

                    <!-- Recursos Educativos -->
                    <div class="col-span-12 md:col-span-3">
                        <h4 class="text-2xl font-medium mb-4 text-surface-0">Recursos</h4>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Calendario Escolar</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Manual del Estudiante</a>
                        <a href="#" class="block text-xl text-surface-200 hover:text-surface-100 transition-colors">Biblioteca</a>
                    </div>

                    <!-- Comunidad Escolar -->
                    <div class="col-span-12 md:col-span-3">
                        <h4 class="text-2xl font-medium mb-4 text-surface-0">Comunidad</h4>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Foro de Padres</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Eventos</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Preguntas Frecuentes</a>
                        <a href="#" class="block text-xl text-surface-200 hover:text-surface-100 transition-colors">Blog Escolar</a>
                    </div>

                    <!-- Legal -->
                    <div class="col-span-12 md:col-span-3">
                        <h4 class="text-2xl font-medium mb-4 text-surface-0">Legal</h4>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Términos de Servicio</a>
                        <a href="#" class="block text-xl mb-2 text-surface-200 hover:text-surface-100 transition-colors">Política de Privacidad</a>
                        <a href="#" class="block text-xl text-surface-200 hover:text-surface-100 transition-colors">Política de Cookies</a>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="text-center mt-8 text-surface-200">
                <p class="text-sm">&copy; 2024 Instituto de Promoción Social del Norte de Bucaramanga. Todos los derechos reservados.</p>
                <p class="text-sm">Diseñado por <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors">Edwin Blanco</a></p>
            </div>
        </div>
    </footer>
</template>

<style scoped></style>
