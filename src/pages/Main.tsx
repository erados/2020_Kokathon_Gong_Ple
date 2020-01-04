import React, {Component} from 'react';
import "./deco.css"
import {IonContent, IonButton, IonInput, IonLabel, IonItem} from "@ionic/react";

class Main extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="login">
                <div className="logininput">
                    <IonItem className="logininput">
                        <IonLabel position="floating">Floating Label</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem className="logininput">
                        <IonLabel position="floating">Floating Label</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonButton onClick={() => window.location.href = '/select'}>Login</IonButton>
                </div>
            </div>
        );
    }
}

export default Main;
