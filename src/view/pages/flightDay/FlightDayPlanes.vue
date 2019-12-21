<template>
    <div>
        <v-combobox
                v-model="FDplanes"
                :items="planes"
                label="Vyberte letadla"
                multiple
                chips
        />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PlaneControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import List from "@/view/components/List.vue";
    import IPlane from "@/lib/interfaces/IPlane";

    @Component({
        components: {List}
    })
    export default class FlightDayPlanes extends Vue {
        FDplanes: IPlane[] = [];
        planes: IPlane[] = [];

        created() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.FDplanes = flightDay.planes;
            }

            this.planes = PlaneControllerDI.getAllPlanes();
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        back() {
            this.$router.push({name: "FlightDayDetail", params: {id: this.id.toString()}}).catch(err => {
            });
        }

        save() {
            if (this.FDplanes !== null) {
                FlightDayControllerDI.setPlanesToDay(this.id, this.FDplanes);
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>