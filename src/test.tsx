import React from 'react';
import axios from 'axios';

import {
    IonButtons,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    IonPage
} from '@ionic/react';


class ClassList extends React.Component{
    //php는 euc-kr, react는 utf-8이 기본 인코딩
    state = {
        isLoading: true,
        plan_arr: []
    }


    getList= async() =>{
        const {data} = await axios({
            url: "http://supreme5876.dothome.co.kr/rest/return-plans.php?user_id=sepaper&possible_time=400",
            method: 'get'
        });
        console.log(data);
        this.setState({sessionId: data});
        const decode= atob(data);
        const {success} = JSON.parse(decode);
        const {result} = JSON.parse(decode);
        console.log(success);
        console.log(result);

        this.setState({isLoading: false, plan_arr:result});
    }
    componentDidMount(){
        this.getList();
    }
    render(){

        const {isLoading,plan_arr} = this.state;
        return (<div>
            {isLoading?
                "loading...":
                (<div>
                    <IonPage>
                        <IonHeader>
                            <IonToolbar color="primary">
                                <IonButtons slot="start">
                                    <IonMenuButton autoHide={false}/>
                                </IonButtons>
                                <IonTitle>Home</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent color="primary" >
                            <IonList color="primary">

                                {
                                    plan_arr.map((plan,index) => {
                                        return (
                                            <IonItem>
                                                {plan['class_name']} {plan['chapter_idx']} {plan['chapter_name']} {plan['exp_time']}분
                                            </IonItem>
                                        );
                                    })
                                }
                            </IonList>
                        </IonContent>
                    </IonPage>
                </div>) //map은 item과 item number를 pair로 줄 수 있다.
            } </div>)// =>뒤에 괄호면 component, renderMovie도 component반환
    }
}
export default ClassList;


