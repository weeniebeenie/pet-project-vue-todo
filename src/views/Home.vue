<template>
    <main class="app-content">
        <h2>Todo list</h2>
        <TodoListCreating @add-todo-item="addTodoItem" />
        <form>
            <div class="filter-field" :class="{ floating: isFloating }">
                <label for="select">Filter tasks</label>
                <select id="select" v-model="filter" @focus="isFloating = true" @blur="isFloating = false">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="not-completed">Not Completed</option>
                </select>
            </div>
        </form>
        <AppLoader v-if="loading" />
        <TodoList
            v-else-if="filteredTodos.length"
            :todos="filteredTodos"
        />
        <p v-else>No todos yet!</p>
    </main>
</template>

<script>
import AppLoader from '@/components/AppLoader'
import TodoListCreating from '@/components/TodoListCreating'
import TodoList from '@/components/TodoList'

export default {
    name: 'app',
    data: () => ({
        loading: true,
        isFloating: false,
        filter: 'all'
    }),
    async mounted() {
        this.todos = await this.$store.dispatch('GET_TODOS')
        this.loading = false
    },
    methods: {
        addTodoItem(data) {
            this.$store.dispatch('SAVE_NEW_TODO', data)
        }
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'all') {
                return this.$store.getters.ALL_TODOS
            }

            if (this.filter === 'completed') {
                return this.$store.getters.COMPLETED_TODOS
            }

            if (this.filter === 'not-completed') {
                return this.$store.getters.NOT_COMPLETED_TODOS
            }
        }
    },
    components: {
        AppLoader, TodoListCreating, TodoList
    }
}
</script>