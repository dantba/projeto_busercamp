<template>
  <div class="v-container-cadastro">
    <div class="container-form">
      <div class="text">
        <h2>
          Crie sua conta
        </h2>
      </div>
      <div class="form-inside">
        <v-form
          ref="editProfileForm"
          @submit.prevent="save"
          class="form-inside"
        >
          <masked-input
            v-model="userData.cpf"
            mask="000.000.000-00"
            label="CPF"
            maxlength="14"

            :rules="[rules.required, rules.cpf]"
          />
          <v-text-field
            v-model="userData.name"
            label="Nome completo"
            maxlength="150"
            :rules="[rules.required]"
            light
            autofocus
            color="#551118"
          />
          <v-text-field
            v-model="userData.email"
            :rules="[rules.required, rules.email(userData.email, true)]"
            label="Email"
            color="#551118"
            maxlength="150"
            light
          />
          <masked-input
            v-model="userData.phone"
            mask="(00) 00000-0000"
            label="Celular"
            :rules="[rules.required, rules.minlen(10)]"
            maxlength="15"
          />
          <money-input
            v-model="userData.renda"
            label="Renda"
            :rules="[rules.required, rules.money]"
          />
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
          <p class="text-sucess fw-bold">{{error}}</p>
          <v-btn
            class="cadastrar-btn"
            :loading="loading"
            type="submit"
            color="#551118"
            medium
            dark
          >
            Solicitar Cartão
          </v-btn>
        </v-form>
      </div>
    </div>
    <div class="imagem">
      <img src="morumbi2.jpg">
    </div>
  </div>
</template>

<script>
import api from '~api'
import maskedInput from '~/components/masked-input'
import rules from '~/helpers/rules'
import moneyInput from '~/components/money-input'

export default {
  components: {
    maskedInput,
    moneyInput
  },
  data () {
    return {
      userData: {
        email: '',
        name: '',
        phone: '',
        cpf: '',
        renda: '',
        username: '',
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
    save () {
      // const oldPhone = this.currentUser.cell_phone
      this.error = null
      if (this.$refs.editProfileForm.validate()) {
        this.loading = true
        api.solicita_cartao(this.userData.username, this.userData.email, this.userData.cpf, this.userData.name, this.userData.password, this.userData.renda).then(res => {
          if (res.accepted) {
            this.$store.commit('auth/setCurrentUser', res.cartao.perfil.userData)
            this.$router.push('/fatura')
          } else {
            this.error = res.Erro
          }

          /* this.$store.commit('toast/open', { message: 'Solicitação de cartão enviada \\o/', color: 'success' })
            if (oldPhone !== this.userData.phone) {
              this.$router.push({ name: 'confirmPhone' })

            } */
        }).catch(error => {
          this.error = error.message
        }).finally(() => {
          this.loading = false
        })
      }
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
  margin-top: 15px;
  flex-direction: column;
  align-items: center;
}

.text{
  display: flex;
  justify-content: flex-start;
  margin-top: 25px;
}
.cadastrar-btn:hover{
    /* red-darken-4 -https://vuetifyjs.com/en/styles/colors/#material-colors */
  background: #B71C1C;

}

.v-text-field{
  width: 201px;
}
</style>
