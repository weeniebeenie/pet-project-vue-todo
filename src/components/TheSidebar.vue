<template>
    <div class="sidebar" :class="{open: sidebarIsOpen}">
        <button
           type="button"
           class="sidebar-toggle"
           :class="{open: sidebarIsOpen}"
           @click.prevent="$emit('sidebar-is-open'); sidebarIsOpen = !sidebarIsOpen"
        >
            <span class="sidebar-toggle__lines">
                <span class="sidebar-toggle__line"></span>
                <span class="sidebar-toggle__line"></span>
                <span class="sidebar-toggle__line"></span>
            </span>
            <span class="ghost">Open menu</span>
        </button>
        <div class="sidebar__wrapper">
            <div class="sidebar__inner">
                <div class="dark-mode-toggle">
                    <input
                        type="checkbox"
                        id="dark-mode-toggle"
                        :checked="info.darkMode"
                        @change="updateDarkModeStatus"
                    >
                    <label for="dark-mode-toggle"></label>
                </div>
                <ul class="sidebar__menu">
                    <li class="sidebar__item -user-info">
                        <span class="name">{{ info.name }}</span>
                        <span class="email">{{ info.email }}</span>
                    </li>
                    <li class="sidebar__item">
                        <a href="/login" @click.prevent="logout">Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        sidebarIsOpen: false
    }),
    computed: { ...mapGetters(['info']) },
    methods: {
        ...mapActions(['UPDATE_INFO']),
        logout() {
            this.$store.dispatch('LOGOUT')
            this.$router.push('/login?message=logout')
        },
        updateDarkModeStatus() {
            this.UPDATE_INFO({
                darkMode: !this.info.darkMode
            })
        }
    }
}
</script>