<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const images = [
    'https://www.ahm.org.py/wp-content/uploads/2022/07/Colegio-Politecnico-Johannes-Gutenberg-2022-1.jpg',
    'http://theenglishclub.es/wp-content/uploads/2018/04/Colegio_San_Juan_Bautista_de_La_Salle_Valladolid-scaled.jpg',
    'https://tse1.mm.bing.net/th?id=OIP.5yM7YUo1EfGmvoOBWwfRfwAAAA&pid=Api&P=0&h=180'
];

const currentImage = ref(0);
let interval;

onMounted(() => {
    interval = setInterval(() => {
        currentImage.value = (currentImage.value + 1) % images.length;
    }, 5000); // Cambiar imagen cada 5 segundos
});

onUnmounted(() => {
    clearInterval(interval);
});

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>

<template>
    <div id="hero" class="relative flex flex-col items-center text-center pt-20 lg:pt-24 px-6 lg:px-20 overflow-hidden">
        <!-- Carrusel de imágenes -->
        <div class="absolute inset-0">
            <img
                v-for="(image, index) in images"
                :key="index"
                :src="image"
                :class="['absolute inset-0 w-full h-full object-cover transition-opacity duration-1000', { 'opacity-100': currentImage === index, 'opacity-0': currentImage !== index }]"
                alt="Imagen del carrusel"
            />
        </div>

        <!-- Fondo semitransparente con bordes difuminados y más oscuro -->
        <div class="absolute inset-0 z-10" style="background: radial-gradient(circle, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 70%)"></div>

        <!-- Contenido del hero -->
        <div class="relative mx-6 md:mx-20 mt-0 md:mt-6 z-20">
            <h1
                class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight relative"
                style="
                    text-shadow:
                        0 0 10px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.6),
                        0 0 30px rgba(255, 255, 255, 0.4);
                "
            >
                <span class="font-light block text-lg md:text-xl lg:text-2xl"></span>
                INSTITUCIÓN EDUCATIVA PROMOCION SOCIAL DEL NORTE
            </h1>
            <p
                class="font-normal text-lg md:text-xl lg:text-2xl leading-normal md:mt-4 text-gray-200 relative"
                style="
                    text-shadow:
                        0 0 10px rgba(255, 255, 255, 0.9),
                        0 0 20px rgba(255, 255, 255, 1),
                        0 0 30px rgba(255, 255, 255, 0.4);
                "
            >
                “COMPROMISO, SERVICIO Y TRABAJO”
            </p>
            <p
                class="font-normal text-lg md:text-xl lg:text-2xl leading-normal md:mt-4 text-gray-200 relative"
                style="
                    text-shadow:
                        0 0 10px rgba(255, 255, 255, 0.9),
                        0 0 20px rgba(255, 255, 255, 1),
                        0 0 30px rgba(255, 255, 255, 0.4);
                "
            >
                Formando futuros líderes con excelencia académica y valores sólidos.
            </p>
            <p
                class="font-normal text-lg md:text-xl lg:text-2xl leading-normal md:mt-4 text-gray-200 relative"
                style="
                    text-shadow:
                        0 0 10px rgba(255, 255, 255, 0.9),
                        0 0 20px rgba(255, 255, 255, 1),
                        0 0 30px rgba(255, 255, 255, 0.4);
                "
            >
                Descubre cómo nuestra institución puede ayudarte a alcanzar tus metas educativas y personales.
            </p>
            <Button label="Conoce Más" as="router-link" to="/sobre-nosotros" rounded class="!text-lg md:!text-xl lg:!text-2xl mt-8 !px-4"></Button>
        </div>

        <!-- Imagen específica que no debe verse afectada por el fondo semitransparente -->
        <div class="relative flex justify-center z-20 mt-8">
            <img src="/demo/images/escudo2.png" alt="Hero Image" class="w-5/12 md:w-4/12 lg:w-8/12 mx-auto" />
        </div>
    </div>

    <div id="bienvenida-rector" class="relative flex flex-col lg:flex-row items-center text-center lg:text-left px-6 lg:px-20 overflow-auto" style="min-height: 85vh">
        <!-- Contenido de la bienvenida -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start mx-6 md:mx-20 mt-0">
            <!-- Card de bienvenida con imagen y texto -->
            <div class="w-full bg-white shadow-lg rounded-lg p-8 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div class="flex justify-center lg:justify-start mb-6">
                    <img src="http://uce.edu.do/sitios/conozca-uce/imagenes/Rector.jpg" alt="Retrato del Rector" class="w-32 h-32 object-cover rounded-full border-4 border-green-200" />
                </div>
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-4 transition-transform duration-500 hover:scale-105 hover:text-green-900">Bienvenida del Rector</h2>
                <p class="font-normal text-2xl leading-normal text-green-600 text-justify mb-6">
                    Estimados miembros de la comunidad educativa,
                    <br /><br />
                    Es un honor para mí darles la bienvenida a nuestra institución, donde nos comprometemos a ofrecer una educación de alta calidad y a fomentar un ambiente en el que cada uno de nuestros estudiantes pueda alcanzar su máximo
                    potencial. Estamos dedicados a formar líderes capaces de enfrentar los retos del futuro y contribuir positivamente a la sociedad. A lo largo de este año, continuaremos trabajando arduamente para proporcionar una experiencia
                    educativa enriquecedora y transformadora.
                    <br /><br />
                    Atentamente,
                    <br /><br />
                    <span class="italic font-semibold">Dr. Juan Pérez</span>
                </p>
            </div>
        </div>

        <!-- Galería de imágenes -->
        <div class="w-full lg:w-1/2 flex justify-center items-center lg:justify-center mt-6 lg:mt-0 lg:ml-6">
            <div class="grid grid-cols-3 gap-4 p-4">
                <img src="https://via.placeholder.com/200x150" alt="Imagen 1" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="https://via.placeholder.com/200x150" alt="Imagen 2" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="https://via.placeholder.com/200x150" alt="Imagen 3" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="https://via.placeholder.com/200x150" alt="Imagen 4" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="https://via.placeholder.com/200x150" alt="Imagen 5" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="https://via.placeholder.com/200x150" alt="Imagen 6" class="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
            </div>
        </div>
    </div>

    <div id="principios-valores" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Principios y Valores</h2>
            <div class="flex flex-wrap justify-center gap-6">
                <!-- Tarjeta de COMPROMISO -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <h3 class="text-3xl font-bold text-green-800 mb-4">COMPROMISO</h3>
                        <p class="font-normal text-lg text-green-800">Manifestado en el cumplimiento de los compromisos adquiridos consigo mismo y con los demás.</p>
                    </div>
                </div>

                <!-- Tarjeta de SERVICIO -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <h3 class="text-3xl font-bold text-green-800 mb-4">SERVICIO</h3>
                        <p class="font-normal text-lg text-green-800">Manifestado en el respaldo solidario hacia la necesidad ajena, el mejoramiento de su entorno y el cuidado del medio ambiente.</p>
                    </div>
                </div>

                <!-- Tarjeta de TRABAJO -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg bg-white p-6 w-full sm:w-80 hover:bg-green-200 transition-all duration-300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-green-800"></div>
                    <div class="absolute bottom-0 right-0 w-full h-1 bg-green-800"></div>
                    <div class="relative flex flex-col items-center space-y-4">
                        <h3 class="text-3xl font-bold text-green-800 mb-4">TRABAJO</h3>
                        <p class="font-normal text-lg text-green-800">
                            Manifestado el cumplimiento de su labor de acuerdo al rol que desempeña en la comunidad educativa y el esfuerzo permanente para lograr el conocimiento, superar las dificultades y mejorar su propio desempeño.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="politica-calidad" class="relative flex flex-col items-center text-center px-6 lg:px-20 py-12 bg-gray-100">
        <div class="w-full lg:w-3/4">
            <h2 class="text-5xl font-bold text-green-800 leading-tight mb-12">Política de Calidad</h2>
            <div class="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
                <h3 class="text-3xl font-semibold text-green-800 mb-6">Nuestro Compromiso</h3>
                <p class="font-normal text-lg text-green-600">
                    Es política de calidad de nuestra institución trabajar por la educación integral de nuestros estudiantes utilizando las nuevas tecnologías de la información, orientando sus talentos hacia el arte y desarrollando en ellos las
                    competencias académicas, laborales y ciudadanas.
                </p>
                <div class="mt-6 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z"></path>
                        <path d="M12 12V3"></path>
                        <path d="M6 3l6 6 6-6"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Sección Misión -->
    <div id="mision-vision" class="relative flex flex-col items-center text-center pt-6 px-6 lg:px-20 overflow-hidden" style="min-height: 80vh">
        <div class="relative flex flex-col md:flex-row items-center justify-between mx-6 md:mx-20 mt-0 md:mt-6 z-20 transform transition-transform duration-500 hover:scale-105">
            <!-- Misión y texto -->
            <div class="flex flex-col w-full p-8 bg-white shadow-lg rounded-lg transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6 transition-transform duration-500 hover:scale-105 hover:text-green-900">Nuestra Misión</h2>
                <p class="font-normal text-2xl leading-normal text-green-600 transition-transform duration-500 hover:scale-105 hover:text-green-700">
                    La IEPSN desarrolla una educación incluyente, de calidad, que permite a los estudiantes, adquirir una formación académico-técnica, basada en valores, orientada a mejorar sus condiciones de vida y las de su comunidad incentivando
                    el autoconocimiento y desarrollo de la autonomía.
                </p>
            </div>
            <!-- Imagen alusiva a la misión -->
            <div class="flex justify-center md:justify-end w-full md:w-1/2 px-4 mt-4 md:mt-0 transform transition-transform duration-500 hover:scale-105">
                <img
                    src="https://i.ytimg.com/vi/vvS3EtKvVUA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1M0SYQrsGMjUpPDmH3E5w8MazgQ"
                    alt="Imagen de la misión"
                    class="w-full md:w-3/4 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
                />
            </div>
        </div>

        <!-- Separador -->
        <div class="relative w-full my-12 flex justify-center clearfix">
            <div class="w-full md:w-3/4 border-t border-green-300">
                <svg class="w-full h-6 -mt-2" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h100v10H0V0z" fill="#ffffff" />
                    <path d="M0 6 Q 25 0, 50 6 T 100 6" stroke="#e2e8f0" stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Contenido de la visión -->
        <div class="relative flex flex-col md:flex-row items-center justify-between mx-6 md:mx-20 mt-12 z-20 transform transition-transform duration-500 hover:scale-105">
            <!-- Imagen alusiva a la visión -->
            <div class="flex justify-center w-full md:w-1/2 px-4 transform transition-transform duration-500 hover:scale-105">
                <img
                    src="https://scontent.fbga1-3.fna.fbcdn.net/v/t1.6435-9/53121334_1038028863050807_7932801919947374592_n.jpg?stp=dst-jpg_p526x395&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFYdcKap8hNKR_Wxq1SDl6FVjN4zeoe9stWM3jN6h72y_h_jtrI3OXIExlwYH0KIvmkKS3TjFIgr8DMVxv5dxLQ&_nc_ohc=Ivv-3gDCUycQ7kNvgHc0qJO&_nc_ht=scontent.fbga1-3.fna&oh=00_AYD8n_UUFZQNZFFaYEcKdqExVih_-LXbYer-tq1lO_RSOg&oe=66E8EA38"
                    alt="Imagen de la visión"
                    class="w-full md:w-3/4 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
                />
            </div>
            <!-- Visión y texto -->
            <div class="flex flex-col w-full mt-4 md:mt-0 p-8 bg-white shadow-lg rounded-lg transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <h2 class="text-5xl font-bold text-green-800 leading-tight mb-6 transition-transform duration-500 hover:scale-105 hover:text-green-900">Nuestra Visión</h2>
                <p class="font-normal text-2xl leading-normal text-green-600 transition-transform duration-500 hover:scale-105 hover:text-green-700">
                    Para el año 2025 la IEPSN será reconocida en el ámbito municipal como una institución educativa incluyente y competitiva en la formación de bachilleres técnicos, con un alto nivel académico, dotados con las habilidades necesarias
                    para afrontar el mundo laboral y/o académico y contribuir a la convivencia ambiental y pacífica de su entorno.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Transiciones para el carrusel */
img {
    transition: opacity 1s ease-in-out;
}

#hero {
    min-height: 90vh; /* Altura mínima por defecto */
    clip-path: ellipse(160% 900% at 93% 13%);
}

/* Media query para pantallas pequeñas, como móviles */
@media (max-width: 640px) {
    #hero {
        min-height: 75vh; /* Ajuste de altura mínima para móviles */
    }
    /* Tamaño de texto para pantallas medianas y grandes (por ejemplo, tabletas y computadoras) */
    h2 {
        font-size: 2rem; /* Tamaño de texto para pantallas medianas y grandes */
    }

    p {
        font-size: 1.25rem; /* Tamaño de texto para pantallas medianas y grandes */
    }
}

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
