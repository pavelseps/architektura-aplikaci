<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link @click.prevent="pushRoute('Home')">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Domů</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click.prevent="pushRoute('FlightDayList')">
                    <v-list-item-action>
                        <v-icon>mdi-airplane-takeoff</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Letecké dny</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click.prevent="pushRoute('PersonList')">
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Lidé</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click.prevent="pushRoute('PlaneList')">
                    <v-list-item-action>
                        <v-icon>mdi-airplane</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Letadla</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>Smirka</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from "vue";
    import {
        FlightControllerDI,
        FlightDayControllerDI,
        PersonControllerDI,
        PlaneControllerDI
    } from "@/lib/injection/Factory";

    window.FlightControllerDI = FlightControllerDI;
    window.FlightDayControllerDI = FlightDayControllerDI;
    window.PersonControllerDI = PersonControllerDI;
    window.PlaneControllerDI = PlaneControllerDI;

    @Component({
        components: {}
    })
    export default class App extends Vue {
        private it = 0;
        drawer: boolean = true;


        pushRoute(name: string) {
            this.$router.push({name}).catch(err => {
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "~vuetify/dist/vuetify.css";
</style>
