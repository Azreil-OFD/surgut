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
                background: "https://intelligent-shells.static.domains/Для%20Игры.jpg",
                button: {
                    backgroundImage: "https://s2.ppllstatics.com/elcorreo/www/multimedia/2024/07/22/dep-valverde-kWFE-U220780752163MSB-1200x840@El%20Correo.jpg",
                    text: "Start",
                    textColor: "#000000"
                }
            },
            infoWindow: {
                background: "https://intelligent-shells.static.domains/2%202.jpg",
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
                    backgroundImage: "https://icdn.football-espana.net/wp-content/uploads/2024/07/Ernesto-Valverde3-630x354.jpg",
                    text: "Close",
                    textColor: "#ffffff"
                }
            },
            gameWindow: {
                background: "https://intelligent-shells.static.domains/3.jpg",
                defaultCard1: "https://intelligent-shells.static.domains/2.jpg",
                defaultCard2: "https://intelligent-shells.static.domains/1%202.jpg",
                progressBarColor: "#ff00ff",
                progressBarTime: 60
            },
            cards: {
                firstPool: [
                    { id: "1", url: "https://intelligent-shells.static.domains/1.jpg" },
                    { id: "2", url: "https://intelligent-shells.static.domains/32.jpg" }
                ],
                secondPool: [
                    { id: "1", url: "https://intelligent-shells.static.domains/2%203.jpg" },
                    { id: "2", url: "https://intelligent-shells.static.domains/4.jpg" }
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
