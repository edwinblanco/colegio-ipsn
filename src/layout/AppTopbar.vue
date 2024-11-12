<script setup>
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AppConfigurator from './AppConfigurator.vue';
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

import Cargando from '@/views/Componentes/Cargando.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import { URL } from '@/utils';
const store = useStore();
const router = useRouter();

const userData1 = store.getters['auth/getUser'];
const isAuthenticated1 = store.getters['auth/isAuthenticated'];

const confirm = useConfirm();
const toast = useToast();

const verCargando = ref(false);

const confirmarCerrarSesion = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: '¿Está segur@ de cerrar sesión?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Cerrar sesión'
        },
        accept: () => {
            //toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            logout();
        },
        reject: () => {}
    });
};

const logout = async () => {
    try {
        verCargando.value = true;
        const token = userData1.access_token;
        const response = await axios.get(URL + 'logout', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        verCargando.value = false;
        toast.add({ severity: 'success', summary: 'Exito', detail: 'Sesión cerrada', life: 10000 });
        store.dispatch('auth/logout'); // Llamamos a la acción de logout de Vuex
        router.push('auth/login');
    } catch (error) {
        verCargando.value = false;
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'Error desconocido'; // Mensaje por defecto
        toast.add({ severity: 'error', summary: 'Error', detail: `Error al cerrar la sesión: ${errorMessage}`, life: 10000 });
    }
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <img src="/demo/images/escudo2.png" alt="Descripción de la imagen" style="width: 50px; height: auto" />
                <span>IEPSN</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!--<button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>-->
                    <button type="button" class="layout-topbar-action" @click="confirmarCerrarSesion($event)" v-tooltip="{ value: 'Cerrar sesión', showDelay: 0, hideDelay: 0 }">
                        <i class="pi pi-power-off"></i>
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Cargando v-if="verCargando"></Cargando>
</template>
