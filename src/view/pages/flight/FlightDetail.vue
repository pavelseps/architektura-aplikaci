<template>
    <div>
        <h2>Flight detail</h2>
        <p v-if="flight !== null">flight: {{flight.date}}</p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightControllerDI, FlightDayControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IFlightDay from "@/lib/interfaces/IFlightDay";
    import IFlight from "@/lib/interfaces/IFlight";

    @Component({
        components: {}
    })
    export default class FlightDetail extends Vue {
        flight: IFlight | null;

        constructor() {
            super();
            this.flight = null;
        }


        created() {
            if (this.$route.params.id !== undefined) {
                let flight = FlightControllerDI.getFlight(parseInt(this.$route.params.id));
                if (flight !== null) {
                    this.flight = flight;
                }
            }
        }
    }
</script>

<style scoped>

</style>