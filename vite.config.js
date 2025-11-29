import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'index-en': resolve(__dirname, 'index-en.html'),
                'index-fr': resolve(__dirname, 'index-fr.html'),
                menu: resolve(__dirname, 'menu.html'),
                'menu-en': resolve(__dirname, 'menu-en.html'),
                'menu-fr': resolve(__dirname, 'menu-fr.html'),
            },
        },
    },
})
