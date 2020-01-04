import React, { useState, useCallback } from 'react';
import { IonApp, IonPage, IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPopover, IonInput, IonItem, IonLabel, IonDatetime, IonList, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';
import { settings, notifications, addCircleOutline } from 'ionicons/icons';
import "./selectViewStyle.css";

const SelectView: React.FC = () => {
    return (<IonApp>
            <IonPage>

                <IonHeader translucent>

                    <Toolbar />

                </IonHeader>

                <IonContent fullscreen>

                    <ListExample />

                </IonContent>

            </IonPage>

        </IonApp >
    );
};
export const Toolbar: React.FC = () => (
    <IonToolbar>
        <IonButtons slot="start">
            <IonButton>
                <IonIcon slot="icon-only" icon={settings}></IonIcon>
            </IonButton>
        </IonButtons>

        <IonTitle className="ion-text-center">시험리스트</IonTitle>

        <IonButtons slot="end">
            <IonButton>
                <IonIcon slot="icon-only" icon={notifications}></IonIcon>
            </IonButton>
        </IonButtons>
    </IonToolbar>
);

export const AddCard: React.FC = () => (
    <IonCard className="selectView addbtn" style={{ background: 'rgba(105, 105, 105, 0.3)', border: '0px dotted rgb(105, 105, 105)' }}>
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <div>
                    <IonIcon slot="icon-only" icon={addCircleOutline} size="large"></IonIcon>
                </div>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <div>
                    <IonCardHeader>
                        <IonCardTitle className="ion-text-center">시험 추가</IonCardTitle>
                    </IonCardHeader>
                </div>
            </IonRow>
        </IonGrid>
    </IonCard>
);

interface CardProps {
    date: string;
    title: string;
    progress: number;
}
export const Card: React.FC<CardProps> = ({ date, title, progress }) => (
    <IonCard class="selectView progress" href="/Calendar">
        <IonCardHeader>
            <IonCardTitle style={{ fontSize: '24px' }}><span>{title}</span></IonCardTitle>
            <IonCardSubtitle style={{ fontSize: '14px' }}>{date}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="ion-text-end">
            {progress}%
        </IonCardContent>
        {(progress < 100) ?
            (progress < 70) ?
                (progress < 40) ?
                    <IonCardContent class="water_red" style={{ top: 100 - progress + '%' }} />
                    : <IonCardContent class="water_orange" style={{ top: 100 - progress + '%' }} />
                : <IonCardContent class="water_green" style={{ top: 100 - progress + '%' }} />
            : <IonCardContent class="water_done" />
        }
    </IonCard>
);

export const PopoverExample: React.FC = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [cardArr, setCardArr] = useState([]);
    return (
        <>
            <IonPopover
                isOpen={showPopover}
                onDidDismiss={e => setShowPopover(false)}
            >
                <p>내용을 입력해주세요.</p>
            </IonPopover>

            <button style={{ margin: 0, padding: 0, background: 'none', width: 100 + '%' }} onClick={() => setShowPopover(true)}>
                <AddCard />
            </button>
        </>
    );
};

export const ListExample: React.FC = () => {
    const [cards, setCards] = useState<CardProps[]>([
        {
            date: "2020.04.01",
            title: "2020 - 1학기 중간고사",
            progress: 90,
        }
    ]);

    const handleAddExam = useCallback((data: CardProps) => {
        setCards((prevCards) => [data, ...prevCards]);
    }, []);
    return (
        <IonContent style={{backgroundColor: 'transparent'}}>
            <IonList className="selectView">
                <IonItem className="selectView">
                    <IonLabel>
                        <PopoverExample />
                    </IonLabel>
                </IonItem>
                {
                    cards.map((card) => (
                        <IonItem className="selectView">
                            <IonLabel>
                                <Card date={card.date} title={card.title} progress={card.progress} />
                            </IonLabel>
                        </IonItem>
                    ))
                }
            </IonList >
            <button onClick={() => handleAddExam({ date: 'date', title: 'title', progress: 0 })}>test</button>
        </IonContent >
    )
};
export default SelectView;
