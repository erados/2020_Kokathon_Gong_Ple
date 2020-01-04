import {
    IonCol, IonContent, IonGrid,
    IonList, IonListHeader, IonRow,
} from '@ionic/react';
import React, {Component} from 'react';

import ToDoList from './ToDoList';
import './Calendar.css';

interface Props {
    success: number[];
}

class Calendar extends Component<Props> {
    date = new Date();
    state: any = {
        hide: false,
        clickedRow: 0,
        data:
            [{id: 1, name: "1", checked: false}, {id: 2, name: "2", checked: false}, {
                id: 3,
                name: "3",
                checked: true
            }, {id: 4, name: "4", checked: true}, {id: 5, name: "5", checked: true}]
    }
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    createCalendar() {
        let date = new Date();
        let children = [];
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        let offset = date.getDate();
        let today = offset;
        let temp = [];
        let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        for (let j = 0; j < 7; j++) {
            temp.push(<IonCol className={"days"}>{days[j]}</IonCol>);
        }
        children.push(<IonRow>{temp}</IonRow>);
        for (let i = firstDay - offset + 1; i < lastDay; i += 7) {
            let temp = [];
            for (let j = i; j < i + 7; j++)
                temp.push(<IonCol
                    className={(j < today && j > 0) ? ((this.props.success[j - 1] === 1) ? "success" : "failure") : ""}>{(j > 0) ? ((j <= lastDay) ? j : "") : ""}{((j == today) ? (
                    <br/>) : "")}{((j == today) ? <span className={"today"}>TODAY</span> : "")}</IonCol>);
            let row = ((i + offset) / 7).toFixed(0);
            children.push(<IonRow onClick={this.onRowClicked.bind(this, row)}>{temp}</IonRow>);
        }
        children.push(<IonList
            style={{display: ((this.state.hide) ? 'block' : 'none'), top: -345 + this.state.clickedRow * 85 + 'px'}}>
            <IonListHeader>List to be done</IonListHeader>
            {this.state.data.map((obj: any, idx: number) => {
                if (!obj.checked)
                    return <ToDoList callB={this.onCheckedChange.bind(this)} key={obj.id} id={obj.id}
                                     name={obj.name}
                                     checked={obj.checked}/>
            })}
            <IonListHeader>List done</IonListHeader>
            {this.state.data.map((obj: any, idx: number) => {
                if (obj.checked)
                    return <ToDoList callB={this.onCheckedChange.bind(this)} key={obj.id} id={obj.id}
                                     name={obj.name}
                                     checked={obj.checked}/>
            })}
        </IonList>);
        return children;
    }

    constructor(props: any) {
        super(props);
    }

    onCheckedChange(id: number, checked: boolean) {
        this.setState({
            data: this.state.data.map((obj: any) => obj.id === id ? {
                id: obj.id,
                name: obj.name,
                checked: !checked
            } : obj)
        });
    }
    onRowClicked(rowNum: any) {
        if(rowNum >= this.state.clickedRow)this.setState({hide: !this.state.hide});
        this.setState({clickedRow: rowNum});
    }
    render() {
        return (
            <IonContent>
                <div>
                    <h1>{"0" + (this.date.getMonth() + 1)}</h1>
                    <h2>{this.months[this.date.getMonth()]}</h2>
                    <div className="calendarHead">
                        <h3>2020-1학기 중간고사</h3>
                        <h3 className="dday">D-17</h3>
                    </div>
                    <h1 className="percent">12%</h1>
                </div>
                <IonGrid>
                    {this.createCalendar()}
                </IonGrid>
            </IonContent>
        );
    }
}

export default Calendar;
