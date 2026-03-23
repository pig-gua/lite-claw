import {createBrowserRouter, type RouteObject} from "react-router";
import {lazy} from "react";

/** 自定义路由对象类型，继承自 RouteObject */
type CustomRouteObject = RouteObject & {};

/** 路由数组，后续由后端提供数据进行构造 */
const routes: CustomRouteObject[] = [
    {
        path: "/",
        Component: lazy(() => import("@/layout")),
        children: [
            {
                path: '/',
                Component: lazy(() => import("@/pages/DashBoard"))
            },
            {
                path: '/dashboard',
                Component: lazy(() => import("@/pages/DashBoard"))
            },
            {
                path: '/models',
                Component: lazy(() => import("@/pages/Models"))
            },
            {
                path: '/tools',
                Component: lazy(() => import("@/pages/Tools"))
            },
            {
                path: '/skills',
                Component: lazy(() => import("@/pages/Skills"))
            },
            {
                path: '/agents',
                Component: lazy(() => import("@/pages/Agents"))
            },
            {
                path: '/chat/:id',
                Component: lazy(() => import("@/pages/Chat"))
            },
        ]
    },
];

/** 路由对象 */
const router = createBrowserRouter(routes);
export default router;
