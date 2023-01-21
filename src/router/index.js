import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import PeopleView from "../views/PeopleView.vue";
import PeopleList from "../components/PeopleList.vue";
import AddEditPerson from "../components/AddEditPerson.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/people",
      component: PeopleView,
      children: [
        {
          path: "",
          name: "people",
          component: PeopleList,
        },
        {
          path: "add",
          name: "addEditPerson",
          component: AddEditPerson,
        },
        {
          path: ":friendId/edit",
          name: "editFriend",
          component: AddEditPerson,
          props: (route) => ({ id: Number(route.params.friendId) }),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
