import firebase from 'firebase/app'

export default {
    actions: {
        /**
         * Login
         */
        async LOGIN({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Registration
         * Create new user in firebase
         */
        async REGISTER({dispatch, commit}, {name, email, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('GET_USER_ID')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name: name,
                    email: email,
                    darkMode: false
                })
            } catch (e) {
                commit('SET_ERROR', e)
                throw e
            }
        },
        /**
         * Get user ID from firebase
         */
        GET_USER_ID() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        /**
         * Logout
         */
        async LOGOUT({commit}) {
            await firebase.auth().signOut()
            commit('CLEAR_INFO')
        }
    }
}