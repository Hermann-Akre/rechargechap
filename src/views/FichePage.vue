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

                        <div class="mt-2 text-center">
                            <h1 class="text-2xl font-semibold">Profil</h1>
                            <small class="text-red-500">Veuillez compléter vos informations de profil pour faciliter l'activation de vos cartes.</small>
                            <h6 class="text-red-500">*Tous les champs sont obligatoires.</h6>
                        </div>

                        <div class="mt-5 w-80">

                            <Form @submit="fiche()" class="mx-3">

                                <div v-show="stepOne==true" class="animate__animated animate__fadeInLeft">
                                    <div class="mt-3">
                                        <ion-label class="ml-4">Nom</ion-label>
                                        <Field v-slot="{field}" name="firstname" :rules="isRequired" v-model="firstname">
                                        <ion-input v-bind="field" type="text" name="firstname" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="firstname">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div>

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Prénom</ion-label>
                                        <Field v-slot="{field}" name="lastname" :rules="isRequired" v-model="lastname">
                                        <ion-input v-bind="field" type="text" name="lastname" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="lastname">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Email</ion-label>
                                        <Field v-slot="{field}" name="email" :rules="isRequired" v-model="email">
                                        <ion-input v-bind="field" type="email" name="email" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="email">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Contact</ion-label>
                                        <Field v-slot="{field}" name="contact" :rules="isRequired" v-model="contact">
                                        <ion-input v-bind="field" type="number" name="contact" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="contact">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-6 flex justify-center" @click="stepOne=false; stepTwo=true">
                                        <img src="assets/icon/next.png" class="w-10"/>
                                    </div>

                                </div>

                                <div v-show="stepTwo==true" class="animate__animated animate__fadeInLeft">
                                    <div class="mt-3">
                                        <ion-label class="ml-4">Second Contact</ion-label>
                                        <Field v-slot="{field}" name="contactTwo" v-model="contactTwo">
                                        <ion-input v-bind="field" type="number" name="contactTwo" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <!-- <ErrorMessage v-slot="{message}" name="contactTwo">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage> -->
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Date de Naissance</ion-label>
                                        <Field v-slot="{field}" name="birth" :rules="isRequired">
                                            <ion-datetime v-bind="field" v-model="birth"
                                            display-format="MMM DD, YYYY HH:mm"
                                            display-timezone="utc"
                                            value="" max="2025-12-31"
                                            class="appearance-none rounded-none border border-grey-500 w-50 rounded text-center"
                                            ></ion-datetime>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="birth">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Lieu de Naissance</ion-label>
                                        <Field v-slot="{field}" name="birthPlace"  v-model="birthPlace">
                                        <ion-input v-bind="field" type="text" name="birthPlace" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <!-- <ErrorMessage v-slot="{message}" name="birthPlace">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage> -->
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Piéce d'Identité</ion-label>
                                         <Field v-model="identity" v-slot="{field}" name="identity" :rules="isRequired">
                                            <ion-select v-bind="field" 
                                            placeholder="Selectionez Une Pièce d'identité"
                                            class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"
                                            >
                                                <ion-select-option v-for="piece in pieces" v-bind:key="piece.id" :value="piece.value">{{ piece.name }}</ion-select-option>
                                            </ion-select>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="identity">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-6 flex justify-center">
                                        <img src="assets/icon/previous.png" class="w-10 mx-3" @click="stepOne=true; stepTwo=false"/>
                                        <img src="assets/icon/next.png" class="w-10 mx-3" @click="stepTwo=false; stepThree=true"/>
                                    </div>

                                </div>

                                <div v-show="stepThree==true" class="animate__animated animate__fadeInLeft">
                                     <div class="mt-3">
                                        <ion-label class="ml-4">Numéro de pièce</ion-label>
                                        <Field v-slot="{field}" name="numIdentity" :rules="isRequired" v-model="numIdentity">
                                        <ion-input v-bind="field" type="text" name="numIdentity" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="numIdentity">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Pays</ion-label>
                                        <Field v-slot="{field}" name="country" :rules="isRequired" v-model="country">
                                            <ion-select v-bind="field" 
                                                placeholder="Selectionez Un"
                                                class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"
                                                >
                                                    <ion-select-option v-for="country in countries" v-bind:key="country.code" :value="country.code">{{ country.name }}</ion-select-option>
                                                </ion-select>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="country">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Ville</ion-label>
                                        <Field v-slot="{field}" name="city" :rules="isRequired" v-model="city">
                                            <ion-input v-bind="field" type="text" name="city" 
                                            class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="city">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                    <div class="mt-3">
                                        <ion-label class="ml-4">Adresse</ion-label>
                                        <Field v-slot="{field}" name="address" :rules="isRequired" v-model="address">
                                        <ion-input v-bind="field" type="text" name="address" 
                                        class="appearance-none rounded-none border border-grey-500 w-50 rounded-full text-center"></ion-input>
                                        </Field>
                                        <ErrorMessage v-slot="{message}" name="address">
                                            <small class="text-red-500 ml-4" v-if="message">{{ message }}</small>
                                        </ErrorMessage>
                                    </div> 

                                     <div class="mt-6 flex justify-center items-center">
                                        <img src="assets/icon/previous.png" class="w-10 mx-4" @click="stepTwo=true; stepThree=false"/>
                                        <button type="submit">
                                            <img src="assets/icon/valid.png" class="bg-blue-500 w-14 mx-4 rounded-full"/>
                                        </button>
                                    </div>

                                </div>

                            </Form>

                        </div>

                       <!--  <ion-alert
                        :is-open="isOpen"
                        header="🥺"
                        sub-header="Une erreur est survenue"
                        message="Veullez vérifier vos champs !"
                        :buttons="buttons"
                        @didDismiss="isOpen=false"
                        >
                        </ion-alert>  -->

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
import {IonContent, IonPage, IonCard,  IonCardContent, IonInput, IonLabel, IonDatetime, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';

import countries from '../utils/countries';

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
    data(){
        return {
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            isOpen: false,

            pieces : [
                {'id': 1, 'name': 'CNI', 'value': 'cni'},
                {'id': 2, 'name': 'PASSPORT', 'value': 'passport'},
                {'id': 3, 'name': 'ATTESTATION', 'value': 'attestation'},
                {'id': 4, 'name': 'CARTE CONSULAIRE', 'value': 'carte_consulaire'},
            ],

            countries: countries,

            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            contactTwo: '',
            birth: '',
            birthPlace: '',
            identity: '',
            numIdentity: '',
            country: '',
            city: '',
            address: '',
        }
    },
    components: {
        IonContent,
        IonPage,
        IonCard, 
        IonCardContent,
        IonInput,
        IonLabel,
        Form, 
        Field,
        IonDatetime, 
        IonSelect, 
        IonSelectOption,
        ErrorMessage,
    },

    methods: {
        async fiche(){

            const formData = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                contact: this.contact,
                contactTwo: this.contactTwo,
                birth: this.birth,
                birthPlace: this.birthPlace,
                identity: this.identity,
                numIdentity: this.numIdentity,
                country: this.country,
                city: this.city,
                address: this.address,
            }

            await axios
            .post('/api/v1/fiche/', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.fiche == true){
                    this.$router.push('/dash')
                } 
            })
            .catch( () => {
                this.isOpen = true
            });
        },

        userFiche() {
        axios
            .get('/api/v1/fiche/')
            .then((response) => {
                console.log(response)
                if(response.data.fiche == true){
                    this.$router.push('/dash')
                } 
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },

    beforeUpdate(){
        //this.userFiche();
    },
   
});
</script>