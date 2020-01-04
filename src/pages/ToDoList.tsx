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
    chapterIdx: number;
    chapterName: string;
    minute: number;
}

class ToDoList extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const {name, checked, callB, id, chapterIdx, chapterName, minute} = this.props;
        return <IonItem>
            <IonLabel> {chapterName}-{chapterIdx} {'\t'} {minute}분</IonLabel>
            <IonCheckbox slot="start" onClick={callB.bind(this, id, checked)}
                         checked={checked}
            />
        </IonItem>
    }
}

export default ToDoList;
