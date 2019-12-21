<template>
    <div>
        <template v-if="plane !== null">
            <Form
                    @back="back"
                    @save="save"
            >
                <template v-slot:f-headline>Editace letadla</template>
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
    export default class PlaneDetail extends Vue {
        plane: IPlane | null;

        valid: boolean = false;

        constructor() {
            super();
            this.plane = null;
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        created() {
            let plane = PlaneControllerDI.getPlane(this.id);
            if (plane !== null) {
                this.plane = plane;
            }
        }

        back() {
            this.$router.push({name: "PlaneList"});
        }

        save() {
            //TODO validations
            if (this.plane !== null) {
                PlaneControllerDI.updatePlane(this.id, this.plane.callsign);
                this.back();
            }
        }
    }
</script>

<style scoped>

</style>