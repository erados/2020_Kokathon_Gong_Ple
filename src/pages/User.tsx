import {
    IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar
} from '@ionic/react';
import React, { Component } from 'react';


interface Props {
    name: string,
    studytime: number
    online: boolean
}

class User extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <IonItem>
                <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonAvatar>

                <IonLabel>
                <h2> &nbsp; {this.props.name} </h2>
        {
            this.props.online ? <h3> &nbsp; {this.props.studytime}시간 동안 공부중입니다. </h3> : <h3> &nbsp; {this.props.studytime}시간 동안 공부하고 쉬러갔습니다. </h3>
        }
        </IonLabel>
        </IonItem>
    );
    }
}

export default User;
