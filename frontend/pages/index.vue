<template>
  <div class="v-container-cadastro">
    <div class="container-form">
      <div class="text">
        <h2>
          Login
        </h2>
      </div>
      <div class="form-inside">
        <v-form
          ref="editProfileForm"
          @submit.prevent="login"
          class="form-inside"
        >
          <v-text-field
            v-model="userData.username"
            :rules="[rules.required, rules.email(userData.email, true)]"
            label="Username"
            color="#551118"
            maxlength="150"
            light
          />
          <v-text-field
            v-model="userData.password"
            label="Password"
            maxlength="150"
            :rules="[rules.required]"
            light
            autofocus
            type="password"
            color="#551118"
          />
          <p v-if="error!=false" class="text-sucess fw-bold">{{error}}</p>
          <v-btn
            class="cadastrar-btn"
            :loading="loading"
            type="submit"
            color="#551118"
            medium
            dark
          >
            Login
          </v-btn>
        </v-form>
        <h2 class="criar">
          Ainda não tem conta? <router-link to="/cadastro">clique aqui</router-link><h2 />
        </h2>
      </div>
    </div>
    <div class="imagem">
      <img src="morumbi2.jpg">
    </div>
  </div>
</template>

<script>
import api from '~api'
import rules from '~/helpers/rules'

export default {
  components: {
  },
  data () {
    return {
      userData: {
        email: '',
        name: '',
        phone: '',
        cpf: '',
        income: '',
        password: ''
      },
      loading: false,
      error: null,
      rules
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    }
  },
  created () {
    /* this.userData.name = this.currentUser.name
    this.userData.phone = this.currentUser.phone
    this.userData.email = this.currentUser.email
    this.userData.cpf = this.currentUser.cpf */
  },
  methods: {
    async login () {
      this.loading = true
      this.error = false
      const user = await api.login(this.username, this.password)
      if (user) {
        this.$store.commit('auth/setCurrentUser', user)
        this.visible = false
        this.$router.push('/fatura')
      } else {
        this.error = true
      }
      this.loading = false
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.v-container-cadastro{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.container-form{
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* greydarken-2 -https://vuetifyjs.com/en/styles/colors/#material-colors */
  background-color: #FFFFFF;
}

.container-form h2{
  color: black;
  font-family: 'Montserrat', sans-serif;
}
.imagem{
  max-width: 60%;
}
.cadastrar-btn{
  color: #fff;
  /* red-darken-3 -https://vuetifyjs.com/en/styles/colors/#material-colors */
  background: #C62828;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  transition-property: background;
}

.form-inside{
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
}

.text{
  display: flex;
  margin-top: 100px;
}
.cadastrar-btn:hover{
    /* red-darken-4 -https://vuetifyjs.com/en/styles/colors/#material-colors */
  background: #B71C1C;

}
.criar{
  font-size: 12px;
  margin-top: 25px;
}
.v-text-field{
  width: 201px;
}
</style>
