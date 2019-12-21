<template>
    <div>
        <template v-if="person !== null">
            <Form
                    @back="back"
                    @save="save"
            >
                <template v-slot:f-headline>Přidání uživatele</template>
                <template v-slot:f-body>
                    <v-text-field
                            v-model="person.name"
                            label="Jméno"
                            required
                    />
                    <v-text-field
                            v-model="person.surname"
                            label="Příjmení"
                            required
                    />
                    <v-text-field
                            v-model="person.email"
                            label="Email"
                            required
                    />
                </template>
            </Form>
        </template>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {PersonControllerDI, PlaneControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IPerson from "@/lib/interfaces/IPerson";
    import Form from "@/view/components/Form.vue";

    @Component({
        components: {
            Form
        }
    })
    export default class PersonNew extends Vue {
        person: IPerson | null;

        constructor() {
            super();
            this.person = {
                id: 0,
                email: "",
                name: "",
                surname: ""
            };
        }

        back() {
            this.$router.push({name: "PersonList"}).catch(err => {
            });
        }

        save() {
            //TODO validations
            if (this.person !== null) {
                PersonControllerDI.addPerson(this.person.name, this.person.surname, this.person.email);
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>