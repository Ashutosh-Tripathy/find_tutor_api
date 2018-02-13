'use strict'

const routes = [
    require('./routes/authenticate'),
    require('./routes/app_user')
];


// Add access to the app and db objects to each route
const app_router = (router, db) => {
    return routes.forEach((route) => {
        route(router, db);
    });
};

export default app_router;
