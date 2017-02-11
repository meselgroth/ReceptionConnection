import { hashHistory } from 'react-router';

export default class RouteService {
    routeToHome() {
        hashHistory.push('/')
    }
}