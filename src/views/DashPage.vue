<template>
  <ion-page>
    <ion-content :fullscreen="true">

        <div class="relative">
            <div class="fixed top-0 left-0 right-0 z-10 animate__animated animate__fadeInRight">
                <ion-card class="bg-white">
                    <div class="flex justify-between p-2">
                        <div>
                            <div @click="logout()">
                                <img src="assets/icon/back.png" class="w-10"/>
                            </div>
                        </div>
                        <div>
                            <router-link :to="{name: 'Home'}">
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
                                    <h1 class="text-2xl font-semibold">Opérations</h1>
                                </div>

                                <div class="flex justify-between items-center mx-8">
                                    <router-link :to="{name: 'Cartes'}" class="text-blue-500 w-28 text-center my-2 p-3 border rounded shadow-md"> Recharger </router-link>
                                    <div class="text-orange-500 w-28 text-center my-2 p-3 border rounded shadow-md" @click="isOpen=true"> Acheter </div>
                                </div>

                                <div class="mt-5 w-80">

                                    <div class="rounded" v-for="op in operations" :key="op.id">
                                        <router-link :to="{name: 'Operation', params: {'slug': op.slug}}"
                                        class="flex justify-between items-center rounded p-2 my-2 bg-gray-200">
                                            <p class="flex flex-col">
                                                <span>XXXX XXXX {{ op.carte }}</span>
                                                <small>{{ op.statut }}</small>
                                            </p>
                                            <p class="flex flex-col">
                                                <strong>{{ op.montant }} XOF</strong>
                                                <small>{{ op.date }}</small>
                                            </p>
                                        </router-link>
                                    </div>

                                </div>

                                <ion-modal
                                :isOpen="isOpen"
                                :backdrop-dismiss="false"
                                >

                                    <div class="animate__animated animate__fadeInRight">
                                        <ion-card class="bg-white">
                                            <div class="flex justify-between p-2">
                                                <div>
                                                    <div @click="isOpen=false">
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

                                    <div class="mt-2 text-center">
                                        <h1 class="text-2xl font-semibold">Acheter</h1>
                                        <small class="text-blue-400">Ajouter une nouvelle carte à votre list et éffectuez plus simplement vos rechargements.</small>
                                    </div>

                                    <div class="mt-5">

                                        <ion-card>
                                            <ion-card-content>

                                                <Form @submit="buyCarte()" class="mx-3">

                                                    <div class="mt-3">
                                                        <ion-label class="ml-4">Cartes</ion-label>
                                                        <Field v-slot="{field}" name="carte" :rules="isRequired" v-model="carte">
                                                            <ion-select v-bind="field" name="carte"
                                                                placeholder="Selectionez Une Carte"
                                                                class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"
                                                                >
                                                                    <ion-select-option v-for="el in cartes" v-bind:key="el.id" :value="el.slug">{{ el.carte }}</ion-select-option>
                                                                </ion-select>
                                                        </Field>
                                                        <ErrorMessage v-slot="{message}" name="carte">
                                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                                        </ErrorMessage>
                                                    </div>

                                                    <div class="mt-5 text-center">
                                                        <button type="submit">
                                                            <ion-button expand="block" type="button">Acheter</ion-button>
                                                        </button>
                                                    </div>

                                                </Form>

                                                <ion-modal
                                                    :isOpen="isOpenCheckOut"
                                                    :backdrop-dismiss="false"
                                                    >
                                                        <div class="fixed top-0 left-0 right-0 z-10 animate__animated animate__fadeInRight">
                                                            <ion-card class="bg-white">
                                                                <div class="flex justify-between p-2">
                                                                    <div>
                                                                        <div @click="closeModalCheckout()">
                                                                            <img src="assets/icon/back.png" class="w-10"/>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <router-link :to="{name: 'Home'}">
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
import {IonContent, IonPage, IonCard,  IonCardContent, IonModal, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

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
        operations: [],
        isOpen: false,
        isOpenCheckOut: false,
        fiche: false,
        cartes: [],
        carte : '',

        payment_url: '',
      }
  },
  components: {
    IonContent,
    IonPage,
    IonCard, 
    IonCardContent,
    IonModal,
    IonLabel, 
    IonSelect, 
    IonSelectOption,
    IonButton,
    Form,
    Field,
    ErrorMessage,
  },

  beforeUpdate(){
    //this.userFiche();
  },

  mounted(){
    this.userOperations();
    this.allCartes();
  },

  methods: {

    async logout() {

        axios.defaults.headers.common['Authorization'] = ""
        localStorage.removeItem('token')
        this.$store.commit('removeToken')

        this.$router.push('/login')
    },

    userFiche() {
        axios
            .get('/api/v1/fiche/')
            .then((response) => {
                console.log(response)
                if(response.data.fiche == false){
                    this.$router.push('/fiche')
                } 
            })
            .catch((error) => {
                console.log(error)
            })
    },

    userOperations() {
        axios
            .get('/api/v1/user/operations/')
            .then((response) => {
                console.log(response.data)
                const options = {
                    year: "numeric",  month: 'short', day: 'numeric',
                    hour: "2-digit", minute: "2-digit", hourCycle: "h24"
                }

                response.data.forEach((el) => {
                    var carte = String(el.carte.carte_num);
                    var statut = String(el.status_operation);

                    if(el.payment.confirmed == false){
                        statut = 'echec'
                    }

                    this.operations.push({
                        id: el.id,
                        slug: el.slug,
                        carte: carte.slice(-4),
                        montant: el.montant_operation,
                        statut: statut.toLowerCase(),
                        payment: el.payment.confirmed,
                        date: new Date(el.date_demande).toLocaleDateString('fr-FR', options),
                    });
                });

                console.log(this.operations)
            })
            .catch((error) => {
                console.log(error)
            })

    },

    async allCartes() {
        await axios
            .get('/api/v1/cartes/')
            .then((response) => {
                console.log(response.data)

                response.data.forEach((el) => {
                    var carte = String(el.carte_num);
                    this.cartes.push({
                        id: el.id,
                        slug: el.slug,
                        carte: carte,
                        c_id: el.carte_client_id,
                    });
                });

                console.log(this.cartes)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    async buyCarte(){

        let formData = {
            'carte': this.carte,
            'type': 'ACHAT DE CARTE',
            'returnUrl': window.location.href,
        }

        await axios
            .post('/api/v1/payment/', formData)
            .then((response) => {
                console.log(response.data)
                this.payment_url = response.data.payment_url
                this.isOpenCheckOut= true
            })
            .catch((error) => {
                console.log(error)
            })
    },

    closeModalCheckout(){
        this.isOpenCheckOut= false
        this.isOpen=false
    }
  },

});
</script>