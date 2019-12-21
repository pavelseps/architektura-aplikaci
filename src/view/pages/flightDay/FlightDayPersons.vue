<template>
    <div>
        <v-combobox
                v-model="FDpersons"
                :items="persons"
                label="Vyberte piloty"
                multiple
                chips
                return-object
        >
            <template v-slot:selection="data">
                <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                >
                    {{data.item.name}} {{data.item.surname}}
                </v-chip>
            </template>
        </v-combobox>

        <v-select
                label="broken"
                v-model="FDpersons"
                :items="persons"
                tags
                chips
        ></v-select>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import List from "@/view/components/List.vue";
    import IPerson from "@/lib/interfaces/IPerson";

    @Component({
        components: {List}
    })
    export default class FlightDayPersons extends Vue {
        FDpersons: IPerson[] = [];
        persons: IPerson[] = [];

        created() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.FDpersons = flightDay.persons;
            }

            this.persons = PersonControllerDI.getAllPersons();
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        back() {
            this.$router.push({name: "FlightDayDetail", params: {id: this.id.toString()}}).catch(err => {
            });
        }

        save() {
            if (this.FDpersons !== null) {
                FlightDayControllerDI.setPersonsToDay(this.id, this.FDpersons);
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>