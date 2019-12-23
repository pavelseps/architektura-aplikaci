<template>
    <div>
        <template v-if="plane !== null">
            <Form
                    @back="back"
                    @save="save"
            >
                <template v-slot:f-headline>Přidání letadla</template>
                <template v-slot:f-body>
                    <v-text-field
                            v-model="plane.callsign"
                            label="Volací znak"
                            required
                    />
                </template>
            </Form>
        </template>
    </div>
</template>

<script lang="ts">
    import IPlane from "../../../lib/interfaces/IPlane";
    import Vue from "vue";
    import {PlaneControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import Form from "@/view/components/Form.vue";

    @Component({
        components: {
            Form
        }
    })
    export default class PlaneNew extends Vue {
        plane: IPlane | null;

        valid: boolean = false;

        constructor() {
            super();
            this.plane = {
                id: 0,
                callsign: ""
            };
        }

        back() {
            this.$router.push({name: "PlaneList"}).catch(err => {
            });
        }

        save() {
            if (this.plane !== null) {
                PlaneControllerDI.addPlane(this.plane.callsign);
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>