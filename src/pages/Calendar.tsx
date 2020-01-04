import {
    IonCol, IonContent, IonGrid,
    IonList, IonListHeader, IonRow,
} from '@ionic/react';
import React, {Component} from 'react';

import ToDoList from './ToDoList';
import './Calendar.css';

class Calendar extends Component {
    state: any = {
        data:
            [{id: 1, name: "1", checked: false}, {id: 2, name: "2", checked: false}, {
                id: 3,
                name: "3",
                checked: true
            }, {id: 4, name: "4", checked: true}, {id: 5, name: "5", checked: true}]
    }

    createCalendar() {
        let date = new Date();
        let children = [];
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        let offset = date.getDate();
        for (let i = firstDay - offset + 1; i < lastDay; i+=7) {
            let temp = [];
            for(let j = i; j < i+7; j++)
                temp.push(<IonCol>{(j > 0) ? ((j <= lastDay) ? j:"") : ""}</IonCol>);
            children.push(<IonRow>{temp}</IonRow>);
        }
        return children;
    }

    constructor(props: any) {
        super(props);
    }

    onCheckedChange(id: number, checked: boolean) {
        this.setState({
            data: this.state.data.map((obj: any) => obj.id == id ? {
                id: obj.id,
                name: obj.name,
                checked: !checked
            } : obj)
        });
    }

    render() {
        return (
            <IonContent>
                <IonGrid>
                    {this.createCalendar()}
                    <IonList>
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
                    </IonList>
                    <IonRow>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        );
    }
}

export default Calendar;
