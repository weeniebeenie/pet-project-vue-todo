<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
        }
    },
    components: {
        EmptyLayout, MainLayout
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import 'styles/main.scss';
</style>
