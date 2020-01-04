import {
    IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonListHeader
} from '@ionic/react';
import React, { Component } from 'react';

import User from './User';

interface Props {
    All: any[]
}

class FilteringUsers extends Component<Props> {
state = {online : [],offline:[]};
    constructor(props: any) {
        super(props);

    }
    filtering() {
        let temp = this.props.All.filter((item)=>item.online);
        let temp2 = this.props.All.filter((item)=>(item.online===false));
        this.setState({online:temp,offline:temp2});
        console.log(this.state.online);
        console.log(this.state.offline);
    }

    render() {
        let a = "Eu4ng";
        let b = 15;
        let x = true;
        let c = "wjdgnsehowl";
        let d = 3;
        let y = false;
        return (

            <IonContent>
                <button onClick={this.filtering.bind(this)}>click</button>
                {/*-- List of Online Users --*/}
                <IonList >
                    <IonListHeader>
                        <IonLabel>열공!</IonLabel>
                    </IonListHeader>

                    <User name={a} studytime={b} online={x}/>
                </IonList>

                {/*-- List of Offline Users --*/}
                <IonList >
                    <IonListHeader>
                        <IonLabel>쉬는 중이에요</IonLabel>
                    </IonListHeader>
                    <User name={c} studytime={d} online={y}/>
                </IonList>

            </IonContent>
        );
    }
}

export default FilteringUsers;
