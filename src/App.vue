<template>
    <div>
        <h1>Smirka app</h1>
        <button @click.prevent="addPlane">Click plane</button>
        <button @click.prevent="addPerson">Click person</button>
        <button @click.prevent="addFlight">Click flight</button>
        <button @click.prevent="addFlightDay">Click flightDay</button>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from "vue";
    import {FlightControllerDI, FlightDayControllerDI, PersonControllerDI, PlaneControllerDI} from "@/lib/Factory";

    @Component({
        components: {}
    })
    export default class App extends Vue {
        private it = 0;

        addPlane() {
            console.log("Result: ", PlaneControllerDI.addPlane(`OK-${this.it++}`));
        }

        addPerson() {
            console.log("Result: ", PersonControllerDI.addPerson(`Franta ${this.it++}`, "Lala"));
        }

        addFlight() {
            console.log("Result: ", FlightControllerDI.addFlight(new Date));
        }

        addFlightDay() {
            console.log("Result: ", FlightDayControllerDI.addFlightDay(new Date));
        }
    }
</script>

<style lang="scss" scoped>

</style>
