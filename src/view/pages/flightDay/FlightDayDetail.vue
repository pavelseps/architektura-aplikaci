<template>
    <div>
        <h2>Flight Day detail</h2>
        <p v-if="flightDay !== null">flightDay: {{flightDay.date}}</p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IFlightDay from "@/lib/interfaces/IFlightDay";

    @Component({
        components: {}
    })
    export default class FlightDayDetail extends Vue {
        flightDay: IFlightDay | null;

        constructor() {
            super();
            this.flightDay = null;
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        //TODO Add new flight, edit planes, edit persons

        created() {
            if (this.$route.params.id !== undefined) {
                let flightDay = FlightDayControllerDI.getFlightDay(parseInt(this.$route.params.id));
                if (flightDay !== null) {
                    this.flightDay = flightDay;
                }
            }
        }

        back() {
            this.$router.push({name: "PersonList"});
        }

        save() {
            //TODO validations
            if (this.flightDay !== null) {
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>