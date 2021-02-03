<template>
  <div class="container-aumentar">
    <div class="container-form">
      <div class="titulo">
        <h2>
          Como aumentar o limite do
        </h2>
        <h2>
          seu brennercard?
        </h2>
      </div>
      <div class="texto-aumento">
        <p>
          Nossa análise de crédito é realizada por um algoritmo capaz de traçar um perfil a partir dos dados de
          nossos usuários. O algoritmo é responsável também por fornecer aumento de limite aos clientes.
        </p>

        <p>
          Entendemos que um usuário que utiliza mais o cartão tem mais chances de receber aumento no limite. Além
          dessa dica, é importante também falar sobre a adimplência: o cliente precisa estar com seus débitos em dia
          para se tornar elegível a receber aumento no limite.
        </p>
        <p>
          Outro ponto relevante a se mencionar é em relação aos dados cadastrais: mantê-los atualizados pode te
          ajudar a conseguir o tão desejado limite.
        </p>
        <p>
          Agradecemos o interesse, e esperamos que continue utilizando nosso produto.
        </p>
      </div>
    </div>
    <div class="imagem">
      <img src="morumbi2.jpg">
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {

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

  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.container-aumentar{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.container-form{
  flex: 1;
  max-width: 50%;
  margin-top: 20px;
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

.titulo{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

.texto-aumento{
  margin: 50px 10px;
}
.cadastrar-btn:hover{
    /* red-darken-4 -https://vuetifyjs.com/en/styles/colors/#material-colors */
  background: #B71C1C;

}

.v-text-field{
  max-width: 201px;
}
</style>
