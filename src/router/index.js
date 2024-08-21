import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        /*{
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },*/
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
                },
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

export default router;
