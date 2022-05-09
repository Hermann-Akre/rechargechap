<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card class="flex justify-center items-center bg-white right-0 z-10 animate__animated animate__fadeInRight">
        <ion-card-content>
          <img src="assets/icon/logo.png"/>
        </ion-card-content>
      </ion-card>

      <ion-card class="flex justify-center items-center bg-white">

        <ion-card-content class="">

          <div class="mt-2 text-center">
            <h1 class="text-2xl font-semibold">Bienvenue</h1>
            <router-link to="/">
                <span class="text-blue-500">Déjà un compte, Connectez-vous !</span>
            </router-link>
          </div>

          <div class="mt-5 w-80">

            <Form @submit="signup()" class="mx-3">

              <div class="mt-3">
                <ion-label class="ml-4">Nom d'utilisateur</ion-label>
                <Field v-slot="{field}" name="username" :rules="isRequired" v-model="username">
                  <ion-input v-bind="field" type="text" name="username" 
                  class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                </Field>
                <ErrorMessage v-slot="{message}" name="username">
                  <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                </ErrorMessage>
              </div>

              <div class="mt-3">
                <ion-label class="ml-4">Mot de pass</ion-label>
                <Field v-slot="{field}" name="password" :rules="isRequired" v-model="password">
                  <ion-input v-bind="field" type="password" name="password" 
                  class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                </Field>
                <ErrorMessage v-slot="{message}" name="password">
                  <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                </ErrorMessage>
              </div> 

              <div class="mt-3">
                <ion-label class="ml-4">Confirmez le mot de pass</ion-label>
                <Field v-slot="{field}" name="passwordConfirmed" :rules="isRequired" v-model="passwordConfirmed">
                  <ion-input v-bind="field" type="password" name="passwordConfirmed" 
                  class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                </Field>
                <ErrorMessage v-slot="{message}" name="passwordConfirmed">
                  <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                </ErrorMessage>
              </div> 

              <ion-alert
              :is-open="isOpen"
              header="🥺"
              sub-header="Une erreur est survenue"
              message="Vérifiez votre mot de pass. <br/> Votre nom d'utilisateur. <br/>"
              :buttons="buttons"
              @didDismiss="isOpen=false"
            >
            </ion-alert> 
              
              <div class="mt-5">
                  <ion-button expand="block" type="submit">Inscription</ion-button>
              </div>

            </Form>

          </div>

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonPage, IonCard, IonCardContent, IonInput, IonLabel, IonButton, IonAlert} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';

//import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  setup(){

    const isRequired = (value) => {
      if(!value) {
          return 'Cet Champ est requis !';
      }
      return true;
    }

    const isString = (value) => {
      if(typeof value === 'string' || value instanceof String) {
        return true;
      }
      return 'Cet Champ doit etre une chaine de caractères !';
    }

    return {
      isRequired, isString,
    }
  },
  components: {
    IonContent,
    IonPage,
    IonCard, 
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonAlert,
    Form, 
    Field,
    ErrorMessage
  },
  data(){
    return {
      username: '',
      password: '',
      passwordConfirmed: '',

      isOpen: false,
    }
  },
  methods: {
    async signup(){

      if(this.password !== this.passwordConfirmed){
        this.isOpen = true
      }

      const formData = {
          username: this.username,
          password: this.password,
      }

      await axios
        .post('/api/v1/users/', formData)
        .then(response => {
            const token = response.data.auth_token

            this.$store.commit('setToken', token)

            axios.defaults.headers.common['Authorization'] = "Token " + token

            localStorage.setItem('token', token)

            this.$router.push('/fiche')

        })
        .catch( () => {
          this.isOpen = true
        })

    }
  },
  beforeCreate() {
    if(this.$store.state.isAuthenticated){
        this.$router.push('/dash')
    }
  },
});
</script>