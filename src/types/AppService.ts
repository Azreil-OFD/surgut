import { AppInterface } from './AppInterfaces';

class AppService {
    private key: string | null = null;
    public loaded: boolean = false;
    public data: AppInterface | null = null;

    private validateKey(key: string): boolean {
        return Math.random() >= 0.5;
    }

    private verifyKey(key: string): boolean {
        return Math.random() >= 0.5;
    }
    
    private isAppInterface(data: any): data is AppInterface {
        return (
            data &&
            typeof data === 'object' &&
            'mainScreen' in data &&
            'infoWindow' in data &&
            'gameWindow' in data &&
            'cards' in data
        );
    }

    private loadData(): AppInterface {
        return {
            mainScreen: {
                background: "https://example.com/main-background.jpg",
                button: {
                    backgroundImage: "https://example.com/button-background.jpg",
                    text: "Start",
                    textColor: "#000000"
                }
            },
            infoWindow: {
                background: "https://example.com/info-background.jpg",
                text: [
                    {
                        title: "Info Title 1",
                        titleColor: "#ff0000",
                        content: "This is the first info text.",
                        contentColor: "#00ff00"
                    },
                    {
                        title: "Info Title 2",
                        titleColor: "#0000ff",
                        content: "This is the second info text.",
                        contentColor: "#ffff00"
                    }
                ],
                button: {
                    backgroundImage: "https://example.com/info-button-background.jpg",
                    text: "Close",
                    textColor: "#ffffff"
                }
            },
            gameWindow: {
                background: "https://example.com/game-background.jpg",
                defaultCard1: "https://example.com/default-card1.jpg",
                defaultCard2: "https://example.com/default-card2.jpg",
                progressBarColor: "#ff00ff",
                progressBarTime: 60
            },
            cards: {
                firstPool: [
                    { id: "1", url: "https://example.com/card1.jpg" },
                    { id: "2", url: "https://example.com/card2.jpg" }
                ],
                secondPool: [
                    { id: "1", url: "https://example.com/cardA.jpg" },
                    { id: "2", url: "https://example.com/cardB.jpg" }
                ]
            }
        };
    }

    public constructor(key: string) {
        this.key = key;
    }

    public async load(): Promise<AppInterface | null> {
        if (typeof this.key === 'string') {
            if (this.validateKey(this.key) && this.verifyKey(this.key)) {
                const loadedData = this.loadData();
                if (this.isAppInterface(loadedData)) {
                    this.data = loadedData;
                    this.loaded = true;
                }
            } else {
                this.data = null;
                this.loaded = false;
            }
        }
        return this.data;
    }
}

export default AppService;
