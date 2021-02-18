<template>
    <div class="app-content">
        <h2>Create new account</h2>
        <form @submit.prevent="submitHandler">
            <fieldset>
                <legend>Login form</legend>

                <div class="filter-field" :class="{ floating: (isFloatingNameLabel) || ($v.name.required) }">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        v-model.trim="name"
                        :class="{invalid: $v.name.$dirty && !$v.name.required}"
                        @focus="isFloatingNameLabel = true" @blur="isFloatingNameLabel = false"
                    >
                    <small v-if="$v.name.$dirty && !$v.name.required">Enter name</small>
                </div>

                <div class="filter-field" :class="{ floating: (isFloatingEmailLabel) || ($v.email.required) }">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        v-model.trim="email"
                        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                        @focus="isFloatingEmailLabel = true" @blur="isFloatingEmailLabel = false"
                    >
                    <small v-if="$v.email.$dirty && !$v.email.required">Email field must be not empty</small>
                    <small v-else-if="$v.email.$dirty && !$v.email.email">Enter correct email</small>
                </div>

                <div class="filter-field" :class="{ floating: (isFloatingPassLabel) || ($v.password.required) }">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model.trim="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                        @focus="isFloatingPassLabel = true" @blur="isFloatingPassLabel = false"
                    >
                    <small v-if="$v.password.$dirty && !$v.password.required">Enter password</small>
                    <small v-else-if="$v.password.$dirty && !$v.password.minLength">Minimum {{$v.password.$params.minLength.min}} symbols. Now {{password.length}}</small>
                </div>

                <button class="btn" type="submit">Sign up</button>
                <router-link to="/login">I am already registered.</router-link>
            </fieldset>
        </form>
    </div>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
    name: 'register',
    data: () => ({
        name: '',
        email: '',
        password: '',
        isFloatingNameLabel: false,
        isFloatingEmailLabel: false,
        isFloatingPassLabel: false
    }),
    validations: {
        name: { required },
        email: { email, required },
        password: { required, minLength: minLength(6) }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }

            try {
                await this.$store.dispatch('REGISTER', formData)
                await this.$router.push('/')
            } catch (e) {
                commit('SET_ERROR', e)
            }
        }
    }
}
</script>