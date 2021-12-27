import Vue from "vue";
import VueRouter from "vue-router";
import certificate from "../views/certificate-dapp.vue";
import chooserole from "../views/chooserole.vue";
import start from "../views/start.vue";
import store from "../store";
import beginpage from "../views/beginPage.vue";
import userpage from "../views/userpage.vue";
import employer from "../views/employerpage.vue";
import verifier from "../views/verifierpage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: start,
  },
  {
    path: "/beginpage",
    name: "beginpage",
    component: beginpage,
    meta: { requireCode: true },
  },
  {
    path: "/chooserole",
    name: "chooserole",
    component: chooserole,
    meta: { requireCode: true },
  },
  {
    path: "/main",
    name: "certificate-dapp",
    component: certificate,
    meta: { requireRole: true },
  },
  {
    path: "/userpage",
    name: "userpage",
    component: userpage,
    meta: { requireRole: true },
  },
  {
    path: "/employer",
    name: "employer",
    component: employer,
    meta: { requireRole: true },
  },
  {
    path: "/verifier",
    name: "verifier",
    component: verifier,
    meta: { requireRole: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireRole) {
    if (store.getters.getChosenRole == null) {
      next({ name: "chooserole" });
    }
    if (!store.getters.getSuccesfullLogin) {
      next({ name: "start" });
    } else {
      next();
    }
  } else if (to.meta.requireCode) {
    if (!store.getters.getSuccesfullLogin) {
      next({ name: "start" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
