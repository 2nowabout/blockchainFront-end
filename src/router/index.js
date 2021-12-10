import Vue from "vue";
import VueRouter from "vue-router";
import certificate from "../views/certificate-dapp.vue";
import chooserole from "../views/chooserole.vue";
import start from "../views/start.vue";
import store from "../store";
import beginpage from "../views/beginPage.vue";

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
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireRole) {
    if (store.getters.getRole == null) {
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
