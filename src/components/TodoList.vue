<template>
    <ul class="todo__list">
        <TodoListItem
            v-for="todo of todos"
            :key="todo.id"
            :todo="todo"
        />
    </ul>
</template>

<script>
import TodoListItem from './TodoListItem';

export default {
    props: ['todos'],
    components: { TodoListItem }
}
</script>