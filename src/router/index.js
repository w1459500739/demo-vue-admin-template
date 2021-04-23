import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },

  {
    path: "/content",
    component: Layout,
    redirect: "/content/article",
    name: "Content",
    alwaysShow: true,
    meta: { title: "内容管理", icon: "el-icon-reading" },
    children: [
      {
        path: "article",
        name: "Article",
        component: () => import("@/views/content/article/index"),
        meta: { title: "文章管理", icon: "el-icon-document" },
      },
      {
        path: "addArticle",
        name: "AddArticle",
        hidden:true,
        component: () => import("@/views/content/detail/index"),
        meta: { title: "新增文章", icon: "el-icon-document", activeMenu: '/content/article' }
      },
      //编辑文章
      {
        path: "editArticle/:id",
        name: "EditArticle",
        hidden:true,
        component: () => import("@/views/content/detail/index"),
        meta: { title: "编辑文章", icon: "el-icon-document",activeMenu: '/content/article' }
      }
    ]
  },
  {
    path: "/market",
    component: Layout,
    redirect: "/market/list",
    name: "Market",
    alwaysShow: true,
    meta: { title: "营销管理", icon: "el-icon-goods" },
    children: [
      {
        path: "list",
        name: "List",
        component: () => import("@/views/market/list/index"),
        meta: { title: "限时活动", icon: "el-icon-files" },
      },
    ]
  },
  {
    path: "/product",
    component: Layout,
    redirect: "/product/goods",
    name: "Product",
    alwaysShow: true,
    meta: { title: "商品管理", icon: "el-icon-s-shop" },
    children: [
      {
        path: "goods",
        name: "Goods",
        component: () => import("@/views/product/goods/index"),
        meta: { title: "商品列表", icon: "el-icon-goods" },
      },
      {
        path: "addDetail",
        name: "AddDetail",
        hidden: true,
        component: () => import("@/views/product/detail/index"),
        meta: { title: "新增商品", icon: "el-icon-goods", activeMenu: '/product/goods' },
        
      },
    ]
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order/list",
    name: "Order",
    alwaysShow: true,
    meta: { title: "订单管理", icon: "el-icon-tickets" },
    children: [
      {
        path: "list",
        name: "orderList",
        component: () => import("@/views/order/index"),
        meta: { title: "订单列表", icon: "el-icon-document-checked" },
      },
      {
        path: "detail",
        name: "orderDetail",
        hidden:true,
        component: () => import("@/views/order/detail/index"),
        meta: { title: "订单详情", icon: "el-icon-document-checked", activeMenu:'/order/list'},
      },
      {
        path: "single",
        name: "Single",
        component: () => import("@/views/order/single/index"),
        meta: { title: "退单列表", icon: "el-icon-document-checked" },
      },
      {
        path: "return",
        name: "Return",
        hidden:true,
        component: () => import("@/views/order/backDetail/index"),
        meta: { title: "退单详情", icon: "el-icon-document-checked", activeMenu:'/order/single'},
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
