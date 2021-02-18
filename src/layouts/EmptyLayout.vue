<template>
    <div class="empty-layout">
        <router-view/>
    </div>
</template>

<script>
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            this.$error(fbError.message)
        }
    }
}
</script>