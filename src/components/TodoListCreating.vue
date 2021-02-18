<template>
    <form @submit.prevent="submitHandler">
        <div class="filter-field" :class="{ floating: (isFloating) || ($v.title.required) }">
            <label for="input">Create your task</label>
            <input id="input" type="text" v-model="title" placeholder="Enter task" @focus="isFloating = true" @blur="isFloating = false">
        </div>
        <button class="btn" type="submit">Create</button>
    </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
    data: () => ({
        isFloating: false,
        title: '',
        completed: false
    }),
    validations: {
        title: { required }
    },
    methods: {
        submitHandler() {
            if (this.title.trim()) {
                const data = {
                    title: this.title,
                    completed: this.completed
                }
                this.$emit('add-todo-item', data)
                this.title = ''
            }
        }
    }
}
</script>