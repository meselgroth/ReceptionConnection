import { hashHistory as history } from 'react-router';

export default class RouteService {
    routeToHome() {
        history.push('/')
    }
}