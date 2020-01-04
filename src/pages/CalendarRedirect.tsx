import React, {Component} from 'react';
import Calendar from './Calendar';
class CalendarRedirect extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
            <Calendar name = {"2020 1학기 중간고사"} dday={[[2020,0,20],[2020,0,23]]} success={[1, 1, 0]} percentage={12} testName={["민법시험","지적재산법시험"]}/>
        );
    }
}

export default CalendarRedirect;
