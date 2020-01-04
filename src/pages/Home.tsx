import {
    IonList, IonListHeader,
} from '@ionic/react';
import React, {Component} from 'react';
import FilteringUsers from "./FilteringUsers";
import Calendar from './Calendar';
import ClassList from './test';

class Home extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
           <Calendar name = {"2020 1학기 중간고사"} dday={[2020,0,20]} success={[1, 1, 0]} percentage={12}/>
            // <ClassList/>
        );
    }
}

export default Home;
