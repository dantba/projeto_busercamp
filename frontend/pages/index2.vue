<template>
  <v-layout>
    <div class="container-init">
      <div class="content">
        <div class="info bgcolor red-darken-1">
          <h2>Brennercard <br><span>Moderno, sem <br>anuidade e <br>prático!</span></h2>
          <p>Cansado da burocracia do sistema financeiro? <br>Abra sua conta em dois cliques e venha aproveitar <br>toda a facilidade que a tecnologia pode proporcionar</p>
          <v-btn :to="{name: 'cadastro'}" v-if="!logged_user" text dark ripple class="info-btn">Abra sua conta</v-btn>
        </div>
      </div>
      <div class="media-icons">
        <v-icon>mdi-twitter</v-icon>
        <v-icon>mdi-facebook</v-icon>
        <v-icon>mdi-instagram</v-icon>
      </div>
    </div>
  </v-layout>
</template>

<script>

export default {
  layout: 'new',

  data () {
    return {
      cpf: ''
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
.container-init{
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
}
.content{
  max-width: 50%;
  display: flex;
  justify-content: space-evenly;
}
.content-form{
  max-width: 40%;
  margin: 60px 100px;
  display: flex;
  justify-content: space-around;
}

.content .info h2{
  color: #000000;
  font-size: 55px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 60px;
  margin-bottom: 30px;
}

.content-form .info h2{
  color: #226A80;
  font-size: 55px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 60px;
  margin-bottom: 30px;
}

.content .info h2 span{
  color: #fff;
  font-size: 50px;
  font-weight: 600;
}

.content-form .info h1{
  color: #226A80;
  font-size: 35px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 40px;
  margin-bottom: 30px;
}
.content-form .info h1 span{
  color: #fff;
  font-size: 30px;
  font-weight: 600;
}

.content-form .info h2 span{
  color: #fff;
  font-size: 50px;
  font-weight: 600;
}

.content .info p{
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
}
.content .info.bgcolor.red-darken-1{
  background-color: #E53935 !important;
  border-radius: 25px;
  padding: 25px;
}

.content .info-btn{
  color: #fff;
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

.content-form .info-btn{
  color: #fff;
  background: #226A80;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  transition-property: background;
}

.content-form .info-btn{
  color: #fff;
  background: #226A80;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  transition-property: background;
}

.content .info-btn:hover{
  background: #B71C1C;
}

.content-form .info-btn:hover{
  background: #0C4F60;
}

.media-icons{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.media-icons a{
  position: relative;
  color: #111;
  font-size: 25px;
  transition: 0.3s;
  transition-property: transform;
}

.media-icons a:not(:last-child){
  margin-right: 60px;
}

.media-icons a:hover{
  transform: scale(1.5);
}

</style>
