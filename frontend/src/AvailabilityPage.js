import React, { Component } from 'react';
import './AvailabilityPage.css';

export default class AvailabilityPage extends Component {
    render() {
        return (
            <div><h1>Availability</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>1 Feb</th>
                            <th>1 Feb</th>
                            <th>1 Feb</th>
                            <th>1 Feb</th>
                            <th>1 Feb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fan</td>
                            <td className='avail-booking'></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Fan</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Fan</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Fan</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}