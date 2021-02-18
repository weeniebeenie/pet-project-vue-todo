<template>
    <li class="todo__item">
        <input
            type="checkbox"
            :checked="todo.completed"
            @change="updateTodoStatus"
        >
        <span class="todo__item-text" :class="{done: todo.completed}">{{ todo.title }}</span>
        <button
            class="btn -small"
            type="button"
            @click="removeTodoItem"
        >
            <span aria-hidden="true">&times;</span>
            <span class="ghost">Remove todo item</span>
        </button>
    </li>
</template>

<script>
export default {
    props: ['todo'],
    methods: {
        updateTodoStatus() {
            this.$store.dispatch('UPDATE_TODO_STATUS', {
                id: this.todo.id,
                completed: !this.todo.completed
            })
        },
        removeTodoItem() {
            this.$store.dispatch('DELETE_TODO_ITEM', { id: this.todo.id })
        }
    }
}
</script>