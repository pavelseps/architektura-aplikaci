<template>
    <div>
        <List
                @new="add"
        >
            <template v-slot:f-headline>Lidé</template>
            <template v-slot:f-new-btn><v-icon>mdi-plus</v-icon> Nový uživatel</template>
            <template v-slot:f-body>
                <template v-for="person in persons">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="person.id"
                            @click="$router.push({name: 'PersonDetail', params: {id: person.id}})"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="person.name + ' ' + person.surname"></v-list-item-title>
                            <v-list-item-subtitle v-text="person.email"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </template>
        </List>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IPerson from "@/lib/interfaces/IPerson";
    import List from "@/view/components/List.vue";

    @Component({
        components: {List}
    })
    export default class PersonList extends Vue {
        persons: IPerson[] = [];

        created() {
            this.persons = PersonControllerDI.getAllPersons();
        }

        add(){

        }
    }
</script>

<style scoped>

</style>