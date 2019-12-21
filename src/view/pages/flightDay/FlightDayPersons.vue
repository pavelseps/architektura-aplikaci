<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="3" v-for="person in persons">
                    <v-card
                            class="text-center"
                            outlined
                            :color="idSelected.includes(person.id) ? 'green lighten-5' : ''"
                            @click.prevent="toggle(person.id)"
                    >
                        <v-card-title>{{person.name}} {{person.surname}}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                            @click="back"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                        Zpět
                    </v-btn>
                </v-col>
                <v-col class="text-right">
                    <v-btn
                            color="teal accent-4"
                            @click.prevent="save"
                    >
                        <v-icon>mdi-content-save</v-icon>
                        Uložit
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
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
        persons: IPerson[] = [];

        idSelected: number[] = [];

        created() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.idSelected = flightDay.persons.map(x => x.id);
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

        toggle(id : number){
            let index = this.idSelected.findIndex(x => x === id);

            if (index > -1) {
                this.idSelected.splice(index, 1);
            } else {
                this.idSelected.push(id);
            }
        }

        save() {
            FlightDayControllerDI.setPersonsToDay(this.id, this.persons.filter(x => this.idSelected.includes(x.id)));
            this.back();
        }
    }
</script>

<style scoped>

</style>