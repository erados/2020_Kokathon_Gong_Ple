import {
    IonList, IonListHeader,
} from '@ionic/react';
import React, {Component} from 'react';

import Calendar from './Calendar';

class Home extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Calendar/>
        );
    }
}

export default Home;
