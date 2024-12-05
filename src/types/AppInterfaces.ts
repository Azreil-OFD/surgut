export interface MainScreen {
    background: string; // URL
    button: {
        backgroundImage: string; // URL
        text: string;
        textColor: string;
    };
}

export interface InfoWindow {
    background: string; // URL
    text: {
        title: string;
        titleColor: string;
        content: string;
        contentColor: string;
    }[];
    button: {
        backgroundImage: string; // URL
        text: string;
        textColor: string;
    };
}

export interface GameWindow {
    background: string;
    defaultCard1: string;
    defaultCard2: string;
    progressBarColor: string;
    progressBarTime: number; // in seconds
}

export interface CardItem {
    id: string;
    url: string;
}

export interface CardsPool {
    questions: CardItem[];
    answers: CardItem[];
}

export interface Cards {
    firstPool: CardsPool;
    secondPool: CardsPool;
}

export interface AppInterface {
    mainScreen: MainScreen;
    infoWindow: InfoWindow;
    gameWindow: GameWindow;
    cards: Cards;
}
