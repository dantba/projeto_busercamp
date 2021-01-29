<template>
  <v-layout>
    <div>
      <div class="row">
        <div class="col-4">
          <img src="brenner-index.jpg" width="100%">
        </div>
        <div class="col-4">
          <span style="font-size: 40px">
            Pix: um novo jeito de fazer transferências e pagamentos
          </span>
        </div>
        <div class="col-4">
          <v-card color="blue-grey darken-4">
            <v-layout>
              <v-flex xs12>
                <v-card-title primary-title>
                  <!-- ----------cores---------
              #757575 = grey darken-1
              #00B0FF = light-blue accent-3
              #00E676 = green accent-3
              ##263238 = blue-grey darken-4
              https://vuetifyjs.com/en/styles/colors/#material-colors
             -->
                  <div>Peça agora mesmo o seu cartão de crédito Brennercard</div>
                </v-card-title>
                <v-card-actions>
                  <v-form
                    ref="formFind"
                    @submit.prevent="continuar"
                    class="form-class"
                  >
                    <masked-input :style="{'border': 'black'}"
                                  v-model="cpf"
                                  mask="000.000.000-00"
                                  label="Digite seu CPF"
                                  maxlength="14"
                                  :rules="[rules.required, rules.cpf]"
                                  required
                    />
                    <v-btn v-if="!logged_user" :disabled="cpf === ''" type="submit" text dark ripple class="ma-0 ml-5">Continuar</v-btn>
                  </v-form>
                </v-card-actions>
              </v-flex>
            </v-layout>
            <v-divider light />
          </v-card>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import maskedInput from '~/components/masked-input'
import rules from '~/helpers/rules'

export default {
  components: {
    maskedInput
  },
  data () {
    return {
      cpf: '',
      rules
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    }
  },
  methods: {
    continuar () {
      if (!this.$refs.formFind.validate()) {
        return
      }
      if (!this.rules.cpf(this.cpf)) {
        return
      }
      this.$store.cpf = this.cpf
      this.$router.push('/cadastro')
    }
  }

}
</script>

<style>
.black.input{
  color:black
}
.form-class{
  display: flex;
  align-items: center;
}
</style>
