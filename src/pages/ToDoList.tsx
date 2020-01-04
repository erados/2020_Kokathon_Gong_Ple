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
    exp_time:number;
    plan_priority:number;
    class_name:string;
    class_id:number;
}

class ToDoList extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const {checked, callB, id, chapterIdx, chapterName, minute, exp_time, plan_priority, class_name, class_id} = this.props;
        return <IonItem>
            <IonLabel> {chapterName}-{chapterIdx} {'\t'} {minute}분</IonLabel>
            <IonCheckbox slot="start" onClick={callB.bind(this, id, checked)}
                         checked={checked}
            />
        </IonItem>
    }
}

export default ToDoList;
