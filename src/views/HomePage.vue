<template>
  <ion-page>
    <ion-content>

      <div class="flex justify-center items-center h-screen bg-white">

        <ion-card>

        <ion-card-content class="">

          <div class="my-3">
            <img src="assets/icon/logo.png" alt="">
          </div>

          <div class="text-center">
            <router-link :to="{ name: 'Signup' }">
                <span class="text-blue-500">Pas encore de compte, Inscrivez-vous !</span>
            </router-link>
          </div>

          <div class="w-80">

            <Form @submit="login()" class="mx-3">

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
                  <ion-button expand="block" type="">connexion</ion-button>
              </div>

            </Form>

            <div class="text-center">

              <div @click="isOpen=true">
                <span class="text-blue-400">Mot de pass oublié ?</span>
              </div>

              <ion-alert
              :is-open="isOpen"
              header="🥺"
              sub-header="Mot de pass oublié ?"
              message="Contactez le service au <br/> +225 0171721668"
              :buttons="buttons"
              @didDismiss="isOpen=false"
            >
            </ion-alert>

            <ion-alert
              :is-open="isOpenError"
              header="🥺"
              sub-header="Veuillez réessayer."
              message="Nom d'utilisateur ou mot de pass incorrect."
              :buttons="buttons"
              @didDismiss="isOpen=false"
            >
            </ion-alert>

            </div>

          </div>

        </ion-card-content>
      </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonPage, IonCard, IonCardContent, IonInput, IonLabel, IonButton, IonAlert } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  setup(){

     const isRequired = (value) => {
      if(!value) {
          return 'Cet Champ est requis !';
      }
      return true;
    }

    return {
      isRequired,
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
    ErrorMessage,
  },
  data(){
    return {
      isOpen: false,
      isOpenError: false,

      username: '',
      password: '',
    }
  },
  methods: {
    async login(){

      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem('token')

      const formData = {
          username: this.username,
          password: this.password,
      }

      await axios
        .post('/api/v1/token/', formData)
        .then(response => {

            console.log(console.log(response.data))

            if(response.data) {

              const token = response.data.access

              this.$store.commit('setToken', token)

              axios.defaults.headers.common['Authorization'] = "Bearer " + token

              localStorage.setItem('token', token)

              this.$router.push('/dash')

            }else{
              this.isOpenError = true
            }

        })
        .catch(error => {
            console.log(error)
            this.isOpenError = true
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