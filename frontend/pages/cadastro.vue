<template>
  <v-container style="max-width: 860px">
    <v-form
      ref="editProfileForm"
      @submit.prevent="save"
    >
      <masked-input
        v-model="userData.cpf"
        mask="000.000.000-00"
        label="CPF"
        maxlength="14"
        :rules="[rules.required, rules.cpf]"
        disabled="true"
      />
      <v-text-field
        v-model="userData.name"
        label="Nome completo"
        maxlength="150"
        :rules="[rules.required]"
        autofocus
      />
      <v-text-field
        v-model="userData.email"
        :rules="[rules.required, rules.email(userData.email, true)]"
        label="Email"
        maxlength="150"
      />
      <masked-input
        v-model="userData.phone"
        mask="(00) 00000-0000"
        label="Celular"
        :rules="[rules.required, rules.minlen(10)]"
        maxlength="15"
      />
      <money-input
        v-model="userData.income"
        label="Renda"
        :rules="[rules.required, rules.money]"
      />
      <p class="text-error fw-bold">{{error}}</p>
      <v-layout
        row
        wrap
        justify-end
      >
        <v-btn
          color="primary"
          :loading="loading"
          type="submit"
          medium
        >
          Solicitar Cartão
        </v-btn>
      </v-layout>
    </v-form>
  </v-container>
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
        income: ''
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
    this.userData.cpf = this.$store.cpf
  },
  methods: {
    save () {
      // const oldPhone = this.currentUser.cell_phone
      this.error = null
      if (this.$refs.editProfileForm.validate()) {
        this.loading = true
        api.solicita_cartao(this.userData).then(res => {
          this.$store.commit('auth/setCurrentUser', res.user)
          /* this.$store.commit('toast/open', { message: 'Solicitação de cartão enviada \\o/', color: 'success' })
          if (oldPhone !== this.userData.phone) {
            this.$router.push({ name: 'confirmPhone' })
          } */
          this.$router.push({name: 'index'})
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
