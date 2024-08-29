<script setup></script>

<template>
    <div class="py-3 px-3 fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-lg">
        <div class="mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <router-link to="/" class="flex items-center hover:opacity-80 transition-opacity duration-300">
                <img src="https://p.plataformaintegra.net/ipsnb/img/colegio/escudo_auth.jpg" alt="Descripción de la imagen" class="h-12 mr-5" />
                <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">IEPSN</span>
            </router-link>
            <Button
                class="lg:!hidden"
                text
                severity="secondary"
                rounded
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-bars !text-2xl"></i>
            </Button>
            <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
                <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                    <!-- Menú principal -->
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Inicio</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="/#bienvenida-rector" class="block text-surface-900 dark:text-surface-0">Bienvenida</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="/#principios-valores" class="block text-surface-900 dark:text-surface-0">Principios y Valores</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="/#politica-calidad" class="block text-surface-900 dark:text-surface-0">Política de Calidad</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="/#mision-vision" class="block text-surface-900 dark:text-surface-0">Misión y visión</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Sobre nosotros</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="sobre-nosotros#historia" class="block text-surface-900 dark:text-surface-0">Historia</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="sobre-nosotros#filosofia" class="block text-surface-900 dark:text-surface-0">Filosofía</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="sobre-nosotros#equipo-directivo" class="block text-surface-900 dark:text-surface-0">Equipo directivo y profesores</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="sobre-nosotros#instalaciones" class="block text-surface-900 dark:text-surface-0">Instalaciones</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <a href="/public/files/MANUAL_DE_CONVIVENCIA.pdf" target="_blank" class="block text-surface-900 dark:text-surface-0">MANUAL DE CONVIVENCIA</a>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Admisiones</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="admisiones#requisitos-inscripcion" class="block text-surface-900 dark:text-surface-0">Requisitos de inscripción</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="admisiones#proceso-admision" class="block text-surface-900 dark:text-surface-0">Proceso de admisión</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="admisiones#formularios-inscripcion" class="block text-surface-900 dark:text-surface-0">Formularios de inscripción</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="admisiones#fechas-importantes" class="block text-surface-900 dark:text-surface-0">Fechas importantes</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Academia</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="academia#programas-niveles" class="block text-surface-900 dark:text-surface-0">Programas y niveles educativos</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="academia#curriculo-materias" class="block text-surface-900 dark:text-surface-0">Currículo y materias</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="academia#recursos-educativos" class="block text-surface-900 dark:text-surface-0">Recursos educativos</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="academia#calendario-academico" class="block text-surface-900 dark:text-surface-0">Calendario académico</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Noticias y eventos</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="noticias-eventos#noticias-recientes" class="block text-surface-900 dark:text-surface-0">Noticias recientes del colegio</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="noticias-eventos#proximos-eventos" class="block text-surface-900 dark:text-surface-0">Próximos eventos</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="noticias-eventos#anuncios-importantes" class="block text-surface-900 dark:text-surface-0">Anuncios importantes</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Galería</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="galeria#fotos-eventos" class="block text-surface-900 dark:text-surface-0">Fotos de eventos y actividades</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="galeria#videos" class="block text-surface-900 dark:text-surface-0">Videos</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Blog</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="blog#articulos-educativos" class="block text-surface-900 dark:text-surface-0">Artículos sobre temas educativos</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="blog#contribuciones" class="block text-surface-900 dark:text-surface-0">Contribuciones de estudiantes y profesores</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Biblioteca</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="biblioteca#catalogo-recursos" class="block text-surface-900 dark:text-surface-0">Catálogo de libros y recursos disponibles</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="biblioteca#horarios-biblioteca" class="block text-surface-900 dark:text-surface-0">Horarios de la biblioteca</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="biblioteca#recursos-en-linea" class="block text-surface-900 dark:text-surface-0">Recursos en línea</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Alumnos</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="alumnos#info-recursos-estudiantes" class="block text-surface-900 dark:text-surface-0">Información y recursos para estudiantes</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="alumnos#horarios-clases" class="block text-surface-900 dark:text-surface-0">Horarios de clases</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="alumnos#resultados-logros" class="block text-surface-900 dark:text-surface-0">Resultados y logros</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Padres</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="padres#info-recursos-padres" class="block text-surface-900 dark:text-surface-0">Información y recursos para padres</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="padres#boletin-informativo" class="block text-surface-900 dark:text-surface-0">Boletín informativo</router-link>
                            </li>
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="padres#reuniones-eventos-padres" class="block text-surface-900 dark:text-surface-0">Reuniones y eventos para padres</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="relative group">
                        <a class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl hover:text-primary transition-colors duration-300">
                            <span>Contacto</span>
                        </a>
                        <!-- Submenú -->
                        <ul class="absolute left-0 top-full mt-2 bg-white dark:bg-surface-700 rounded shadow-lg hidden group-hover:block min-w-max z-10">
                            <li class="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors whitespace-nowrap">
                                <router-link to="contacto#contact-info" class="block text-surface-900 dark:text-surface-0">Formulario de contacto</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                    <Button label="Ingresar" text as="router-link" to="/" rounded></Button>
                    <Button label="Registrarme" to="/" rounded></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
