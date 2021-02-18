import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        SET_INFO(state, info) {
            state.info = info
        },
        CLEAR_INFO(state) {
            state.info = {}
        }
    },
    actions: {
        /**
         * Update user information in firebase
         */
        async UPDATE_INFO({ dispatch, commit, getters }, toUpdate) {
            try {
                const uid = await dispatch('GET_USER_ID')
                const updateData = { ...getters.info, ...toUpdate }
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                commit('SET_INFO', updateData)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Get user info from firebase
         */
        async FETCH_INFO({ dispatch, commit }) {
            try {
                const uid = await dispatch('GET_USER_ID')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('SET_INFO', info)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}