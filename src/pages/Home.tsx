import {
    IonButton, IonContent
} from '@ionic/react';
import React, {Component} from 'react';

class Home extends Component {

    constructor(props: any) {
        super(props);
    }
    render() {

        return (
<IonContent>
            <IonButton onClick={()=>window.location.href = "./Friends"}> Friends </IonButton>
            <IonButton onClick={()=>window.location.href = "./Select"}> Select </IonButton>
          <IonButton onClick={()=>window.location.href = "./Calendar"}> Calendar </IonButton>
</IonContent>
        );
    }
}

export default Home;
