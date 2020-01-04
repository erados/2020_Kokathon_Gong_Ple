import React, {Component} from 'react';
import {
    IonItem,
    IonLabel,
    IonCheckbox
} from '@ionic/react';

interface Props {
    name: string;
    checked: boolean;
    callB: any;
    id: number;
}

class ToDoList extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <IonItem>
            <IonLabel>{this.props.name}</IonLabel>
            <IonCheckbox slot="start" onClick={this.props.callB.bind(this, this.props.id, this.props.checked)}
                         checked={this.props.checked}/>
        </IonItem>
    }
}

export default ToDoList;
