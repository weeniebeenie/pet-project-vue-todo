import firebase from 'firebase/app'
import TodoListItem from '../components/TodoListItem';

export default {
    state: {
        todos: null
    },
    mutations: {
        /**
         * Set To Do list on the page
         */
        SET_TODO_LIST: (state, payload) => {
            payload = Object.keys(payload).map(key => ({...payload[key], id: key})).reverse()
            state.todos = payload
        },
        /**
         * Add To Do item to the list
         */
        ADD_TODO_ITEM: (state, payload) => {
            state.todos.unshift(payload)
        },
        /**
         * Delete To Do item from the list
         */
        REMOVE_TODO_ITEM: (state, id) => {
            const index = state.todos.findIndex(todo => todo.id == id)
            state.todos.splice(index, 1)
        },
        /**
         * Update To Do item status on the page
         */
        UPDATE_COMPLETED_STATUS: (state, { id, completed }) => {
            const index = state.todos.findIndex(todo => todo.id == id)
            state.todos[index].completed = completed;
        }
    },
    actions: {
        /**
         * Get current user todo list from firebase
         */
        GET_TODOS: async ({ dispatch, commit }) => {
            try {
                const uid = await dispatch('GET_USER_ID')
                let data = (await firebase.database().ref(`/users/${uid}/todos`).once('value')).val() || {}
                commit('SET_TODO_LIST', data)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Save new To Do item into firebase
         */
        SAVE_NEW_TODO: async ({ dispatch, commit }, data) => {
            try {
                const uid = await dispatch('GET_USER_ID')
                await firebase.database().ref(`/users/${uid}/todos`).push(data)
                commit('ADD_TODO_ITEM', data)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Delete To Do item from firebase
         */
        DELETE_TODO_ITEM: async ({ commit, dispatch }, { id }) => {
            try {
                const uid = await dispatch('GET_USER_ID')
                await firebase.database().ref(`/users/${uid}/todos`).child(id).remove()
                commit('REMOVE_TODO_ITEM', id)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Update complete / not complete status of To Do item in firebase
         */
        UPDATE_TODO_STATUS: async ({ commit, dispatch }, { id, completed }) => {
            try {
                const uid = await dispatch('GET_USER_ID')
                await firebase.database().ref(`/users/${uid}/todos`).child(id).update({ completed })
                commit('UPDATE_COMPLETED_STATUS', { id, completed })
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        }
    },
    getters: {
        ALL_TODOS: state => {
            return state.todos
        },
        COMPLETED_TODOS: state => {
            return state.todos.filter(todo => todo.completed)
        },
        NOT_COMPLETED_TODOS: state => {
            return state.todos.filter(todo => !todo.completed)
        }
    }
}