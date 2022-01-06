import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Container from "../views/Container.vue";
import chooseRole from "../views/chooserole.vue";
import Login from "../views/Login.vue";
import store from "../store";
import userpage from "../views/userpage.vue";
//import employer from "../views/employerpage.vue";
//import verifier from "../views/verifierpage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "App",
    component: Container,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "role",
        name: "Role",
        component: chooseRole,
      },
      {
        path: "userpage",
        name: "Userpage",
        component: userpage,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireRole) {
    if (store.getters.getChosenRole == null) {
      next({ name: "Role" });
    }
    if (!store.getters.getSuccesfullLogin) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.meta.requireCode) {
    if (!store.getters.getSuccesfullLogin) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
