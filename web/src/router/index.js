import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/main.vue";

Vue.use(Router);


const routers = [
  {
    path: "/",
    name: "main",
    redirect: '/',
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        component: resolve => {
          require(['@/views/games/home/home-page.vue'], resolve);
        }
      },
      {
        path: "/dice",
        name: "dice",
        component: resolve => {
          require(['@/views/games/dice/dice-home.vue'], resolve);
        }
      },
      {
        path: "/ring",
        name: "ring",
        component: resolve => {
          require(['@/views/games/ring/ring-home.vue'], resolve);
        }
      },
      {
        path: "/tree",
        name: "tree",
        component: resolve => {
          require(['@/views/games/tree/tree-home.vue'], resolve);
        }
      },

      {
        path:'/reward',
        name: 'reward',
        component: resolve => {
          require(['@/components/public/inviter-reward.vue'], resolve);
        }
      }, 
      {
        path:'/email',
        name: 'email',
        component: resolve => {
          require(['@/components/public/email.vue'], resolve);
        }
      },
    ]
  },

  {
  path: "/active",
    component: resolve => {
      require(['@/components/public/contents.vue'], resolve);
    }
  },
 

  // {
  //   path: "/news",
  //   component: resolve => {
  //     require(['@/components/public/app-news-content.vue'], resolve);
  //   }
  // },

  {
    path: "/move",
    component: resolve => {
      require(['@/components/public/move.vue'], resolve);
    }
  },


  {
    path: "/pdf",
    component: resolve => {
      require(['@/components/common/pdf.vue'], resolve);
    }
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routers
});
