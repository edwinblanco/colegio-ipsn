import AppLayout from '@/layout/AppLayout.vue';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/panel-estudiante',
                    name: 'panel-estudiante',
                    component: () => import('@/views/PanelEstudiante.vue')
                },
                {
                    path: '/gestionar-examen',
                    name: 'gestionar-examen',
                    component: () => import('@/views/GestionarExamen.vue'),
                    meta: { requiresAuth: true, roles: ['admin', 'profesor'] }
                },
                {
                    path: '/gestionar-usuarios',
                    name: 'gestionar-usuarios',
                    component: () => import('@/views/GestionarUsuario.vue'),
                    meta: { requiresAuth: true, roles: ['admin', 'profesor'] }
                },
                {
                    path: '/gestionar-grados',
                    name: 'gestionar-grados',
                    component: () => import('@/views/GestionarGrados.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/gestionar-sedes',
                    name: 'gestionar-sedes',
                    component: () => import('@/views/GestionarSedes.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/gestionar-materias',
                    name: 'gestionar-materias',
                    component: () => import('@/views/GestionarMaterias.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/conf-imagenes-principales',
                    name: 'config-imagenes-principales',
                    component: () => import('@/views/Configuracion/ImagenesPrincipales.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/conf-anuncios-principales',
                    name: 'conf-anuncios-principales',
                    component: () => import('@/views/Configuracion/Anuncios.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/conf-galeria-principales',
                    name: 'conf-galeria-principales',
                    component: () => import('@/views/Configuracion/Galeria.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                },
                {
                    path: '/conf-articulos-principales',
                    name: 'conf-articulos-principales',
                    component: () => import('@/views/Configuracion/Articulo.vue'),
                    meta: { requiresAuth: true, roles: ['admin'] }
                }
            ]
        },
        {
            path: '/pagina-principal',
            name: 'pagina-principal',
            component: () => import('@/views/pages/PaginaPrincipal.vue'),
            children: [
                {
                    path: '/',
                    name: 'inicio',
                    component: () => import('@/views/pages/LandingPages/Inicio.vue')
                },
                {
                    path: '/sobre-nosotros',
                    name: 'sobre-nosotros',
                    component: () => import('@/views/pages/LandingPages/SobreNosotros.vue')
                },
                {
                    path: '/admisiones',
                    name: 'admisiones',
                    component: () => import('@/views/pages/LandingPages/Adminisiones.vue')
                },
                {
                    path: '/academia',
                    name: 'academia',
                    component: () => import('@/views/pages/LandingPages/Academia.vue')
                },
                {
                    path: '/noticias-eventos',
                    name: 'noticias-eventos',
                    component: () => import('@/views/pages/LandingPages/NoticiasEventos.vue')
                },
                {
                    path: '/galeria',
                    name: 'galeria',
                    component: () => import('@/views/pages/LandingPages/Galeria.vue')
                },
                {
                    path: '/blog',
                    name: 'blog',
                    component: () => import('@/views/pages/LandingPages/Blog.vue')
                },
                {
                    path: '/biblioteca',
                    name: 'biblioteca',
                    component: () => import('@/views/pages/LandingPages/Biblioteca.vue')
                },
                {
                    path: '/alumnos',
                    name: 'alumnos',
                    component: () => import('@/views/pages/LandingPages/Alumnos.vue')
                },
                {
                    path: '/padres',
                    name: 'padres',
                    component: () => import('@/views/pages/LandingPages/Padres.vue')
                },
                {
                    path: '/contacto',
                    name: 'contacto',
                    component: () => import('@/views/pages/LandingPages/Contacto.vue')
                }
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            };
        }
        return { top: 0 };
    }
});

// Guard para verificar la autorización
router.beforeEach((to, from, next) => {
    const userData = store.getters['auth/getUser'];
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const userRoles = userData?.roles || [];

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Si la ruta requiere autenticación y no está autenticado
        return next({ path: '/auth/login' }); // Redirigir a la página de login
    }

    if (to.meta.roles && to.meta.roles.length) {
        const hasAccess = to.meta.roles.some((role) => userRoles.includes(role));
        if (!hasAccess) {
            return next({ path: '/auth/access' }); // O redirigir a otra página de acceso denegado
        }
    }

    next(); // Permitir la navegación
});

export default router;
