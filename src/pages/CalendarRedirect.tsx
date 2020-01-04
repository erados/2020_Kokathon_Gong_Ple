import {
    IonList, IonListHeader,
} from '@ionic/react';
import React, {Component} from 'react';
import FilteringUsers from "./FilteringUsers";
import Calendar from './Calendar';
import ClassList from './test';
import { Route } from 'react-router-dom';
class CalendarRedirect extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
            <Calendar name = {"2020 1학기 중간고사"} dday={[[2020,0,20]]} success={[1, 1, 0]} percentage={12} testName={["민법시험"]}/>
            // <ClassList/>
        );
    }
}

export default CalendarRedirect;
