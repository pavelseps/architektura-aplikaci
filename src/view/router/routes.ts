import {RouteConfig,} from "vue-router/types/router";
import VueRouter from "vue-router";
import PlaneList from "@/view/pages/plane/PlaneList.vue";
import PlaneDetail from "@/view/pages/plane/PlaneDetail.vue";
import PersonDetail from "@/view/pages/person/PersonDetail.vue";
import PersonList from "@/view/pages/person/PersonList.vue";
import FlightDayList from "@/view/pages/flightDay/FlightDayList.vue";
import FlightDayDetail from "@/view/pages/flightDay/FlightDayDetail.vue";
import Home from "@/view/pages/Home.vue";
import PlaneNew from "@/view/pages/plane/PlaneNew.vue";
import PersonNew from "@/view/pages/person/PersonNew.vue";
import FlightDayPlanes from "@/view/pages/flightDay/FlightDayPlanes.vue";
import FlightDayPersons from "@/view/pages/flightDay/FlightDayPersons.vue";
import FlightNew from "@/view/pages/flight/FlightNew.vue";

const routes: RouteConfig[] = [
    /**
     * Planes
     */
    {
        name: "PlaneList",
        path: '/plane',
        component: PlaneList,
    },
    {
        name: "PlaneDetail",
        path: '/plane/edit/:id',
        component: PlaneDetail,
    },
    {
        name: "PlaneNew",
        path: '/plane/new',
        component: PlaneNew,
    },

    /**
     * Persons
     */
    {
        name: "PersonList",
        path: '/person',
        component: PersonList,
    },
    {
        name: "PersonDetail",
        path: '/person/edit/:id',
        component: PersonDetail,
    },
    {
        name: "PersonNew",
        path: '/person/new',
        component: PersonNew,
    },

    /**
     * Flight day
     */
    {
        name: "FlightDayList",
        path: '/flightday',
        component: FlightDayList,
    },
    {
        name: "FlightDayDetail",
        path: '/flightday/edit/:id',
        component: FlightDayDetail,
    },
    {
        name: "FlightDayPersons",
        path: '/flightday/persons/:id',
        component: FlightDayPersons,
    },
    {
        name: "FlightDayPlanes",
        path: '/flightday/planes/:id',
        component: FlightDayPlanes,
    },

    /**
     * Flight
     */
    {
        name: "FlightDetail",
        path: '/flight/edit/:id',
        component: FlightDayDetail,
    },
    {
        name: "FlightNew",
        path: '/flightday/flight/:id/new',
        component: FlightNew,
    },


    /**
     * Defaults
     */
    {
        name: "Home",
        path: '/',
        component: Home,
    },
    {
        name: "DefaultHome",
        path: '/*',
        component: Home,
    },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});