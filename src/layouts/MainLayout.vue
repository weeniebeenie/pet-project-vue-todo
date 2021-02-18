<template>
    <div class="app-main-layout" :class="{ 'menu-opened': sidebarIsOpen, 'dark-mode' : info.darkMode }">
        <AppLoader v-if="loading" />
        <div v-else class="app-main-layout__wrap">
            <TheSidebar @sidebar-is-open="sidebarIsOpen = !sidebarIsOpen" />

            <div class="app-wrapper">
                <router-view/>
            </div>

            
        </div>
    </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import AppLoader from '@/components/AppLoader'
import { mapGetters } from 'vuex'

export default {
    name: 'main-layout',
    data: () => ({
        loading: true,
        sidebarIsOpen: false
    }),
    mounted() {
        this.$store.dispatch('FETCH_INFO')
        this.loading = false
    },
    computed: {
        ...mapGetters(['info']),
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            this.$error(fbError.message)
        }
    },
    components: {
        TheSidebar, AppLoader
    }
}
</script>