import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { toast, type ToastOptions } from 'vue3-toastify'

export default defineNuxtPlugin((nuxtApp) => {
    const options : ToastOptions = {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
    }
    nuxtApp.vueApp.use(Vue3Toasity) as ToastContainerOptions
    return {
        provide: {
            toast: (msg: string, option:ToastOptions = options) => toast(msg, option),
            success: (msg: string, option:ToastOptions = options) => toast.success(msg, option),
            error: (msg: string, option:ToastOptions = options) => toast.error(msg, option),
            info: (msg: string, option:ToastOptions = options) => toast.info(msg, option),
        }
    }
})