import { ClientManage, NotifyManage, Login } from '../views';


const routes = [
    { path: "/", exact: true, component: () => <Login /> },
    { path: "/client", component: () => <ClientManage /> },
    { path: "/notification", component: () => <NotifyManage /> }
];

export default routes;