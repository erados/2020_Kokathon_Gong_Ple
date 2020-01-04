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
            [{id: 1, name: "1", checked: false}, {id: 2, name: "2", checked: false}, {id: 3, name: "3", checked: true}, {id: 4, name: "4", checked: true}, {id: 5, name: "5", checked: true}]
    };

    date = new Date();
    firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDate();
    lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    offset = this.date.getDay();

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
                    <IonRow>
                        <IonCol>{this.firstDay}</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                    </IonRow>
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
