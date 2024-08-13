import React from 'react';
import setup from './setup.js';
import Layout from '../Layout.js';
import Edit from '../Edit.js';
import History from '../History.js';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: setup.route_prefix,
    element: <Layout />,
    children: [
        {
            path: 'history',
            element: <History />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
    ],
};
