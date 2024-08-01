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
    text: Array<{
        title: string;
        titleColor: string;
        content: string;
        contentColor: string;
    }>;
    button: {
        backgroundImage: string; // URL
        text: string;
        textColor: string;
    };
}

export interface GameWindow {
    background: string; // URL
    defaultCard1: string; // URL
    defaultCard2: string; // URL
    progressBarColor: string;
    progressBarTime: number; // in seconds
}

export interface CardsPool {
    id: string;
    url: string; // URL
}

export interface Cards {
    firstPool: CardsPool[];
    secondPool: CardsPool[];
}

export interface AppInterface {
    mainScreen: MainScreen;
    infoWindow: InfoWindow;
    gameWindow: GameWindow;
    cards: Cards;
}
