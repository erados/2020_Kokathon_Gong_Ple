import {
    IonButton, IonContent,
    IonList, IonListHeader
} from '@ionic/react';
import React, {Component} from 'react';
import FilteringUsers from "./FilteringUsers";
// import Calendar from './Calendar';
import ClassList from './test';
import { Route } from 'react-router-dom';
class Home extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
<IonContent>
            <IonButton onClick={()=>window.location.href = "./Friends"}> Friends </IonButton>
          <IonButton onClick={()=>window.location.href = "./Calendar"}> Calendar </IonButton>
</IonContent>
        );
    }
}

export default Home;
