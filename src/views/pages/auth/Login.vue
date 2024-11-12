<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { URL } from '@/utils';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const numDocumento = ref('');
const password = ref('');
const checked = ref(false);

const errorInicioSesion = ref('');
const mostrarBotoningresar = ref(false);
const mostrarUsuarioReq = ref(false);
const mostrarPasswordReq = ref(false);
const cargando = ref(false);

watch([numDocumento, password], ([newDocumento, newPassword], [oldDocumento, oldPassword]) => {

    // Restablece el mensaje de error
    errorInicioSesion.value = '';

    // Verifica la validez de los campos
    const isDocumentoEmpty = newDocumento === '';
    const isPasswordEmpty = newPassword === '';

    mostrarBotoningresar.value = !(isDocumentoEmpty || isPasswordEmpty);
    mostrarUsuarioReq.value = isDocumentoEmpty;
    mostrarPasswordReq.value = isPasswordEmpty;
});

const iniciarSesion = async () => {
    try {
        cargando.value = true;

        const response = await axios.post(URL + 'login', {
            numero_documento: numDocumento.value,
            password: password.value
        });

        // Suponiendo que la respuesta contiene la información del usuario
        const userData = response.data;

        // Almacenar la información del usuario en Vuex
        store.dispatch('auth/login', userData);
        cargando.value = false;

        if (userData.roles.includes('profesor')) {
            router.push('/gestionar-examen');
        } else if (userData.roles.includes('estudiante')) {
            router.push('/panel-estudiante');
        } else if (userData.roles.includes('admin')){
            router.push('/conf-imagenes-principales');
        }

    } catch (error) {
        cargando.value = false;
        if (error.response.data.msg) {
            errorInicioSesion.value = error.response.data.msg;
        } else {
            errorInicioSesion.value = error;
        }
    }
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/demo/images/escudo2.png" alt="Descripción de la imagen" class="mb-8 w-60 shrink-0 mx-auto" />
                        <span class="text-muted-color font-medium">Inicia sesión para continuar</span>
                    </div>

                    <form>
                        <label for="usuario" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Usuario</label>
                        <InputText id="usuario" type="text" placeholder="Usuario" class="w-full md:w-[30rem] mb-2" v-model="numDocumento" />
                        <Message severity="error" class="mb-4" v-if="mostrarUsuarioReq">Usuario requerido</Message>

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true" class="mb-2" fluid :feedback="false"></Password>
                        <Message severity="error" class="mb-4" v-if="mostrarPasswordReq">Contraseña requerida</Message>

                        <div class="flex items-center justify-between mt-2 mb-4 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordar</label>
                            </div>
                        </div>

                        <Message v-if="errorInicioSesion" severity="error" class="mb-4">{{ errorInicioSesion }}</Message>

                        <Button icon="pi pi-user" label="Ingresar" class="w-full" @click="iniciarSesion" :disabled="!mostrarBotoningresar" :loading="cargando"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
