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
    IonPage,
    IonLabel,
    IonDatetime,
    IonInput,
    IonText,
    IonSpinner,
    AlertInput,
    IonAlert
  } from '@ionic/react';
import { any } from 'prop-types';
interface Props {
    onChange: any;
  }
  type stateType={
    subjectString: string;
      subjectList: AlertInput[];
      now: Date;
      chapterList: any[];
      temp_chapterList: any[],
      pickSubjectAlert : boolean;
      pickChapterAlert : boolean;
      subjectName: string;
      class_id: number;

      exam_year: number;
      exam_month: number;
      exam_day: number;
      exam_hour: number;
      exam_min: number;

      wish_rep_time: number;
      class_priority: number;
  }
class SetSubject extends React.Component<Props>{
    constructor(Props:Props){
        super(Props);
    }
       
     // propTypes = {
     //   onChange : any
     // };
    
    state:stateType={
        subjectString:"",
        subjectList: [],
        now: new Date(),
        chapterList: [],
        temp_chapterList: [],
        pickSubjectAlert: false,
        pickChapterAlert: false,
        subjectName: "",
        class_id: 0,

        exam_year: 0,
        exam_month: 0,
        exam_day:0,
        exam_hour:0,
        exam_min:0,

        wish_rep_time: 1,
        class_priority: 5
    }

    subject_search = async() => {
        const {data} = await axios({
            url: `http://supreme5876.dothome.co.kr/rest/search.php?word=${this.state.subjectString}`,
            method: 'get'
          }); 
           const decode= atob(data);
          const {success} = JSON.parse(decode);
            const {result} = JSON.parse(decode);
           // console.log(success);
            console.log(result);
            let tempList = [];
          for(var i=0;i<result.length;i++){
              let obj:AlertInput = {
                  name:'class_id',
                  type:'radio',
                  label: result[i].name,
                  value: result[i].class_id
              };
            tempList.push(obj);
          }
        this.setState({subjectList:tempList,pickSubjectAlert: true});
    }

    chapter_search = async() => {
        const {class_id} = this.state;
        console.log("chap_search",class_id);
        const {data} = await axios({
            url: `http://supreme5876.dothome.co.kr/rest/chapters.php?class_id=${class_id}`,
            method: 'get'
          }); 
           const decode= atob(data);
          const {success} = JSON.parse(decode);
            const {result} = JSON.parse(decode);
           // console.log(success);
            console.log(result);
            let tempList = [];
          for(var i=0;i<result.length;i++){
              let obj:AlertInput = {
                  name:'checkbox'+i,
                  type:'checkbox',
                  label: result[i].chapter_name,
                  value: result[i].key
              };
            tempList.push(obj);
          }
        this.setState({temp_chapterList:tempList,pickChapterAlert: true});
    }

    handleChange = (e:any) => {
        console.log(this.state.subjectString);
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      up_Wish_rep_time = () => {
        const {wish_rep_time} = this.state;  
        if(wish_rep_time<4){
            this.setState({wish_rep_time: wish_rep_time+1});
        }
      }
      down_Wish_rep_time = () => {
        const {wish_rep_time} = this.state;  
        if(wish_rep_time>1){
            this.setState({wish_rep_time: wish_rep_time-1});
        }
      }

      up_class_priority = () => {
        const {class_priority} = this.state;  
        if(class_priority<10){
            this.setState({class_priority: class_priority+1});
        }
      }
      down_class_priority = () => {
        const {class_priority} = this.state;  
        if(class_priority>0){
            this.setState({class_priority: class_priority-1});
        }
      }
    
    componentDidMount(){
    }
    componentDidUpdate(){
        console.log('subject name',this.state.subjectName, this.state.class_id);

        this.props.onChange(this.state);
    }
    
    render(){
        const {now, chapterList, pickSubjectAlert, pickChapterAlert, subjectList,subjectName, temp_chapterList} = this.state;
        const {exam_year, exam_month,exam_day, exam_hour, exam_min} = this.state;
        const { wish_rep_time,class_priority} = this.state;
        return (<div> 
            <IonHeader>
                <IonTitle>
                과목 설정
                </IonTitle>
            </IonHeader>
            <IonContent>
                <IonItem lines='none'>
                <IonLabel position="stacked">{(subjectName.length===0)?"과목 검색":`선택과목: ${subjectName}`} </IonLabel>
                </IonItem>
            <IonItem>
            <IonInput name="subjectString" required type="text" onInput={this.handleChange} placeholder="과목 검색"></IonInput>
            <IonButton onClick={this.subject_search}>검색</IonButton>
          </IonItem>

          <IonItem lines='none'>
                <IonLabel position="stacked">시험 일시 </IonLabel>
                </IonItem>
            <IonItem>
      <IonDatetime displayFormat="D MMM YYYY H:mm" min={now.getFullYear()-5+""} max={now.getFullYear()+5+""}
      value={`${exam_year}-${exam_month}-${exam_day}T${exam_hour}:${exam_min}Z`} 
      pickerOptions={{
        buttons: [
          {
            text: 'Select',
            handler: (data) => {
                console.log(data);
              //  console.log(data.year.value, data.month.value, data.day.value, data.hour.value, data.minute.value);
            //    const timeString = `${data.year.value}-${data.month.value<10?"0"+data.month.value:data.month.value}-${data.day.value<10?"0"+data.day.value:data.day.value}T${data.hour.value<10?"0"+data.hour.value:data.hour.value}:${data.minute.value<10?"0"+data.minute.value:data.minute.value}:00Z`;
             //   const now = new Date(timeString);
                this.setState({
                    exam_year : data.year.value,
                    exam_month : data.month.value,
                    exam_day: data.day.value,
                    exam_hour: data.hour.value,
                    exam_min: data.minute.value
                });                
                console.log('select!');
            }
          }, {
            text: 'Cancel',
            handler: () => {
              console.log('Nothing');
            }
          }
        ]
      }}></IonDatetime>
             </IonItem>

             <IonItem lines='none'>
                <IonLabel position="stacked">목표 회독(1~4)</IonLabel>
                </IonItem>
                <IonItem>
                <IonInput disabled name="subjectName" required type="text" onInput={this.handleChange} placeholder={""+wish_rep_time}></IonInput>
                <IonButton onClick={this.up_Wish_rep_time}>+1</IonButton><IonButton onClick={this.down_Wish_rep_time}>-1</IonButton>
          </IonItem>

          <IonItem lines='none'>
                <IonLabel position="stacked">과목 중요도(0~10)</IonLabel>
                </IonItem>
                <IonItem>
                <IonInput disabled name="subjectName" required type="text" onInput={this.handleChange} placeholder={""+class_priority}></IonInput>
                <IonButton onClick={this.up_class_priority}>+1</IonButton><IonButton onClick={this.down_class_priority}>-1</IonButton>
          </IonItem>

          <IonItem lines='none'>
                <IonLabel position="stacked">시험 범위</IonLabel>
                </IonItem>

                <IonItem>
        <IonLabel>{(chapterList.length>0)?"설정 완료": "설정 안함"}</IonLabel>
            <IonButton onClick={this.chapter_search}>설정</IonButton>
          </IonItem>


          <IonAlert
          isOpen={pickSubjectAlert}
          onDidDismiss={() => this.setState({pickSubjectAlert:false})}
          header={'과목 선택'}
          inputs={subjectList}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              }
            },
            {
              text: 'Ok',
              handler: (class_id) => {
                  this.setState({class_id : class_id});
                  for(let i=0;i<subjectList.length;i++){
                      if(subjectList[i].value === class_id){
                          this.setState({subjectName:subjectList[i].label});
                      }
                  }
              }
            }
          ]}
        />


<IonAlert
          isOpen={pickChapterAlert}
          onDidDismiss={() => this.setState({pickChapterAlert:false})}
          header={'단원 선택'}
          inputs={temp_chapterList}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              }
            },
            {
              text: 'Ok',
              handler: (chap_arr) => {
                this.setState({chapterList:chap_arr});
              }
            }
          ]}
        />
            </IonContent>
               </div>);
    }
    
}
export default SetSubject;


/*
    getCurTimeString = () => {
        const {now} = this.state;
        const year = now.getFullYear();
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const day = (now.getDate()<10)? `0${now.getDate()}`:now.getDate() ;
        const hour = ("0" + now.getHours()).slice(-2);
        const min = (now.getMinutes()<10?'0':'') + now.getMinutes();
        const timeString = `${year}-${month}-${day}T${hour}:${min}Z`;
    }
*/