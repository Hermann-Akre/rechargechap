<template>
  <ion-page>
    <ion-content :fullscreen="true">

        <div class="relative">
            <div class="fixed top-0 left-0 right-0 z-10 animate__animated animate__fadeInRight">
                <ion-card class="bg-white">
                    <div class="flex justify-between p-2">
                        <div>
                            <router-link :to="{name: 'Dash'}">
                                <img src="assets/icon/back.png" class="w-10"/>
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'Dash'}">
                                <img src="assets/icon/icon.png" class="w-10"/>
                            </router-link>
                        </div>
                    </div>
                </ion-card>
            </div>
            <div>
                <div>
                    <div class="mt-12"></div>
                    <div>
                        <ion-card class="flex justify-center items-center bg-white mt-24 z-0">

                        <ion-card-content class="">

                        <div class="mt-2 min-h-full text-center">
                            <h1 class="text-2xl font-semibold">Recharger</h1>
                            <small class="text-red-400">Les frais de services sont de 100 XOF, et les frais de rechargement varient selon le montant et la carte.</small>
                        </div>

                        <div class="mt-5 w-80">
                            <div class="flex flex-col my-4">
                                <strong>Carte</strong>
                                <span>{{ carte }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Client ID</strong>
                                <span>{{ client_id }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Nom</strong>
                                <span>{{ name }}</span>
                            </div>

                            <hr>

                            <div class="mt-5">

                                <div class="mx-3 mt-3">
                                    <div class="appearance-none py-2 rounded-none border border-grey-500 w-50 rounded-full text-center">
                                        {{ montantTotal }} XOF
                                    </div>
                                </div>

                                <Form @submit="recharge()" class="mx-3">

                                    <div class="mt-3">
                                        <Field v-slot="{field}" name="montant" :rules="isRequired" v-model="montant">
                                            <ion-input v-bind="field" type="number" name="montant" placeholder="montant"
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <!-- <ErrorMessage v-slot="{message}" name="montant">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage> -->
                                    </div>

                                    <div class="mt-5 text-center">
                                        <button type="submit">
                                            <ion-button expand="block" type="button">Valider</ion-button>
                                        </button>
                                    </div>

                                </Form>
                            </div>

                        </div>

                        <ion-modal
                        :isOpen="isOpen"
                        :backdrop-dismiss="false"
                        >
                            <div class="fixed top-0 left-0 right-0 z-10 animate__animated animate__fadeInRight">
                                <ion-card class="bg-white">
                                    <div class="flex justify-between p-2">
                                        <div>
                                            <div @click="closeModal()">
                                                <img src="assets/icon/back.png" class="w-10"/>
                                            </div>
                                        </div>
                                        <div>
                                            <router-link :to="{name: 'Dash'}">
                                                <img src="assets/icon/icon.png" class="w-10"/>
                                            </router-link>
                                        </div>
                                    </div>
                                </ion-card>
                            </div>

                            <iframe 
                            class="mt-8 min-h-screen w-full"
                            :src="payment_url"
                            allowfullscreen>
                            </iframe>

                        </ion-modal>

                        </ion-card-content>
                        </ion-card>
                    </div>

                </div>
            </div>
        </div>

    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonPage, IonCard,  IonCardContent, IonInput, IonButton, IonModal } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  setup(){

     const isRequired = (value) => {
      if(!value) {
          return 'Ce champ est requis !';
      }
      return true;
    }

    return {
      isRequired,
    }
  },
  data(){
      return {
          carte: '',
          client_id: '',
          carte_slug: '',
          name: '',
          
          montant: '',
          montantTotal: '0',

          cinetpay: null,
          isOpen: false,

          payment_url: '',
      }
  },
  components: {
    IonContent,
    IonPage,
    IonCard, 
    IonCardContent,
    IonInput,
    IonButton,
    IonModal,
    Form, 
    Field,
  },

  mounted(){
    this.userCarte()
  },

  methods: {

    async userCarte(){

        let slug = this.$route.params.slug;

        //user/cartes/<slug:slug>/
        
        await axios
            .get(`/api/v1/user/cartes/${slug}/`)
            .then((response) => {

                console.log(response.data)
                
                this.carte = response.data.carte_num;
                this.client_id = response.data.carte_client_id;
                this.name = response.data.type_carte.name;
                this.carte_slug = response.data.slug;

            })
            .catch((error) => {
                console.log(error)
            })

    },

    async calculFrais(){
        // /operation/montant/

        let formData = {
            'carte': this.carte_slug,
            'montant': this.montant
        }
        
        await axios
            .post(`/api/v1/operation/montant/`, formData)
            .then((response) => {

                console.log(response.data)

               if(response.data.payment_amount != null){
                    this.montantTotal = response.data.payment_amount
               }else{
                   this.montantTotal = 0
               }

            })
            .catch((error) => {
                console.log(error)
            })

    },

    async recharge(){

        let formData = {
            'carte': this.carte_slug,
            'type': 'RECHARGEMENT',
            'returnUrl': window.location.href,
            'montant': this.montant,
        }

        await axios
            .post('/api/v1/payment/', formData)
            .then((response) => {
                console.log(response.data)
                this.payment_url = response.data.payment_url
                this.isOpen= true
            })
            .catch((error) => {
                console.log(error)
            })
    },

    closeModal() {
    this.isOpen = false;
    this.$router.push('/operation');
    },

  },

  watch: {
      montant(){
          this.calculFrais()
      }
  }

});
</script>