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
                    backgroundImage: "https://www.somar.co.nz/assets/Uploads/Blog-Images/gradient-blog-featured__ScaleWidthWzE5MjBd.jpg",
                    text: "НАЧАТЬ",
                    textColor: "#ffffff"
                }
            },
            infoWindow: {
                background: "https://intelligent-shells.static.domains/2%202.jpg",
                text: [
                    {
                        title: "НАЗВАНИЕ ИГРЫ:",
                        titleColor: "#ffe335",
                        content: "«СЕКРЕТЫ СУРГУТА»",
                        contentColor: "#ffffff"
                    },
                    {
                        title: "ЦЕЛЬ ИГРЫ:",
                        titleColor: "#ffe335",
                        content: "ЗНАКОМСТВО С ГОРОДОМ И ЕГО ДОСТОПРИМЕЧАТЕЛЬНОСТЯМИ",
                        contentColor: "#ffffff"
                    },
                    {
                        title: "КАК ИГРАТЬ:",
                        titleColor: "#ffe335",
                        content: "\n1. БРОСАТЬ КУБИК, ДЕЛАТЬ ХОД.\n2. ЕСЛИ ХОД НА ЖЕЛТОЙ ОТМЕТКЕ, ТО БРАТЬ ПО ОДНОЙ КАРТОЧКЕ ЗА ХОД С ВОПРОСАМИ О ВСЕМ ИЗВЕСТНЫХ МЕСТАХ ГОРОДА.\n3. ИГРОКИ ДОЛЖНЫ ПЕРЕМЕЩАТЬСЯ ПО ИГРОВОМУ ПОЛЮ, ПРЕДСТАВЛЯЮЩЕМУ СОБОЙ КАРТУ ГОРОДА, И СОБИРАТЬ БОНУСЫ В ВИДЕ «СУНДУКОВ С СЕКРЕТАМИ»\n4. КАЖДАЯ КАРТОЧКА ИМЕЕТ ФАКТ, СВЯЗАННЫЙ С КОНКРЕТНОЙ ДОСТОПРИМЕЧАТЕЛЬНОСТЬЮ ИЛИ ИСТОРИЧЕСКИМ СОБЫТИЕМ НАШЕГО ГОРОДА, ИГРОКИ СОБИРАЮТ ИХ ДО КОНЦА ИГРЫ.\n5. ЕСЛИ ВАШ ХОД ПОПАДАЕТ НА ФИОЛЕТОВУЮ СТРЕЛКУ, ОНА ПОКАЗЫВАЕТ СКОЛЬКО ХОДОВ ВПЕРЕД МОЖНО СДЕЛАТЬ.\n6. КТО ПЕРВЫМ ПРИДЕТ К ФИНИШУ, ДОЛЖЕН ПОСЧИТАТЬ БОНУСНЫЕ СУНДУКИ. У КОГО БОЛЬШЕ, ТОТ И ВЫИГРАЛ.\n\nЭТА ИГРА ПОМОГАЕТ ДЕТЯМ ЗАПОМИНАТЬ НЕКОТОРЫЕ ИЗВЕСТНЫЕ ДОСТОПРИМЕЧАТЕЛЬНОСТИ И ИСТОРИЧЕСКИЕ ФАКТЫ ГОРОДА, В КОТОРОМ ОНИ ПРОЖИВАЮТ.",
                        contentColor: "#ffffff"
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
