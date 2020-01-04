import {
    IonCol, IonContent, IonGrid, IonItem,
    IonList, IonListHeader, IonRow,
} from '@ionic/react';
import React, {Component} from 'react';

import ToDoList from './ToDoList';
import './Calendar.css';
import axios from "axios";

interface Props {
    name: string;
    dday: number[];
    success: number[];
    percentage:number;
}

class Calendar extends Component<Props> {
    date = new Date();
    state: any = {
        hide: false,
        clickedRow: 0,
        isLoading: true,
        plan_arr: [],
        data:
            [{id: 1, name: "1", checked: false}, {id: 2, name: "2", checked: false}, {
                id: 3,
                name: "3",
                checked: true
            }, {id: 4, name: "4", checked: true}, {id: 5, name: "5", checked: true}]
    }
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(props: any) {
        super(props);
    }

    createCalendar() {
        let date = new Date();
        let children = [];
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        let today = date.getDate();
        let temp = [];
        let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        for (let j = 0; j < 7; j++) {
            temp.push(<IonCol className={"days"}>{days[j]}</IonCol>);
        }
        children.push(<IonRow>{temp}</IonRow>);
        for (let i = -1-firstDay; i < lastDay; i += 7) {
            let temp = [];
            for (let j = i; j < i + 7; j++)
                temp.push(<IonCol
                    className={
                        (j < today && j > 0) ? ((this.props.success[j - 1] === 1) ? "success" : "failure") : ""}>{(j > 0) ? ((j <= lastDay) ? j : "") : ""}{((j == today) ? (
                    <br/>) : "")}{((j == today) ?
                    <span className={"today"}>TODAY</span> : "")}{((j == this.props.dday[2]) ?
                    <br/> : "")}{((j == this.props.dday[2]) ?
                    <span className={"dday"}>D-DAY</span> : "")}</IonCol>);
            let row = ((i) / 7).toFixed(0);
            children.push(<IonRow onClick={this.onRowClicked.bind(this, row)}>{temp}</IonRow>);
        }
        children.push(<IonList
            style={{display: ((this.state.hide) ? 'block' : 'none'), top: -60 + this.state.clickedRow * 15 + 'vh'}}>
            <IonListHeader>공부할 것</IonListHeader>
            {this.state.plan_arr.map((obj: any, idx: number) => {
                if (!obj.checked)
                    return <ToDoList callB={this.onCheckedChange.bind(this)} id={1} checked={obj.checked}
                                     name={obj.chapter_name} chapterName={obj.chapter_name} minute={obj.exp_time}
                                     chapterIdx={obj.chapter_idx}/>
            })}
            <IonListHeader>공부한 것</IonListHeader>
            {this.state.plan_arr.map((obj: any, idx: number) => {
                if (obj.checked)
                    return <ToDoList callB={this.onCheckedChange.bind(this)} id={1} checked={obj.checked}
                                     name={obj.chapter_name} chapterName={obj.chapter_name} minute={obj.exp_time}
                                     chapterIdx={obj.chapter_idx}/>
            })}
        </IonList>);
        return children;
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

    // sendList= async() =>{
    //     const {data} = await axios({
    //         url: "http://supreme5876.dothome.co.kr/rest/return-plans.php?user_id=sepaper&id={데이터고유id}&checked={체크여부},
    //         method: 'get'
    //     });
    onRowClicked(rowNum: any) {
        if (rowNum >= this.state.clickedRow) this.setState({hide: !this.state.hide});
        this.setState({clickedRow: rowNum});
    }

    getList = async () => {
        const {data} = await axios({
            url: "http://supreme5876.dothome.co.kr/rest/return-plans.php?user_id=sepaper&possible_time=400",
            method: 'get'
        });
        console.log(data);
        this.setState({sessionId: data});
        const decode = atob(data);
        const {success} = JSON.parse(decode);
        const {result} = JSON.parse(decode);
        console.log(success);
        console.log(result);

        this.setState({isLoading: false, plan_arr: result});
    }

    componentDidMount() {
        this.getList();
    }

    result = this.state.plan_arr.map((plan: any, index: number) => {
        return (
            <IonItem>
                {plan['class_name']} {plan['chapter_idx']} {plan['chapter_name']} {plan['exp_time']}분
            </IonItem>
        );
    })
    a = new Date(this.props.dday[0], this.props.dday[1], this.props.dday[2]).getTime()-this.date.getTime();
    dday = ((this.a)/86400000+1).toFixed(0);
    render() {
        return (

            <IonContent>
                {

                }
                <div>
                    <h1 className={"month"}>{"0" + (this.date.getMonth() + 1)}</h1>
                    <h2 className={"month_e"}>{this.months[this.date.getMonth()]}</h2>
                    <div className="calendarHead">
                        <h3>{this.props.name}</h3>
                        <h3 className="dday">D-{this.dday}</h3>
                    </div>
                    <h1 className="percent">{this.props.percentage}%</h1>
                </div>
                <IonGrid>
                    {this.createCalendar()}
                </IonGrid>
            </IonContent>
        );
    }
}

export default Calendar;
