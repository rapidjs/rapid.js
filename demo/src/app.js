// import Rapid from './../rapid/rapid';
import { Rapid, Auth } from './../rapid/rapid';

window.Rapid = Rapid;

window.test = new Rapid({ modelName: 'test', debug: true, extension: 'xml' });
window.auth = new Auth({ modelName: 'user', debug: true });

const routes = [
    {
        type: 'get',
        name: 'simple_test',
        url: '/hi/how/are/you',
    },

    {
        type: 'post',
        name: 'simple_test_two',
        url: '/user/{id}/{username}/profile',
    },
];

window.newRapid = new Rapid({ customRoutes: routes });