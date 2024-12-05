import { AppInterface } from './AppInterfaces';

class AppService {
    private readonly key: string | null = null;
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
                background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2ZEAPmbDMsVf1-x9e0sIjZPGLyezaJrvPg&s",
                button: {
                    backgroundImage: "https://www.somar.co.nz/assets/Uploads/Blog-Images/gradient-blog-featured__ScaleWidthWzE5MjBd.jpg",
                    text: "НАЧАТЬ",
                    textColor: "#ffffff"
                }
            },
            infoWindow: {
                background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2ZEAPmbDMsVf1-x9e0sIjZPGLyezaJrvPg&s",
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
                background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOb9ipa8iCs_j02kuwSCEqYAk1O-VLsQIqWA&s",
                defaultCard1: "https://img.freepik.com/free-vector/blonde-cartoon-character-portrait_1308-174393.jpg",
                defaultCard2: "https://img.freepik.com/free-vector/redhaired-boy-vector-illustration_1308-176689.jpg",
                progressBarColor: "#ff00ff",
                progressBarTime: 60
            },
            cards: {
                firstPool: {
                    questions: [
                        {
                            id: "1",
                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Question_in_a_question_in_a_question_in_a_question.gif/1200px-Question_in_a_question_in_a_question_in_a_question.gif"
                        },
                        {
                            id: "2",
                            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFJmEEr0nYtZBtzSo5nRoiaU_MBfakBE_eQ&s"
                        }
                    ],
                    answers: [
                        {
                            id: "1",
                            url: "https://imo10.labirint.ru/books/617356/ph_001.jpg/960-0"
                        },
                        {
                            id: "2",
                            url: "https://basket-01.wbbasket.ru/vol48/part4825/4825258/images/big/7.webp"
                        }
                    ],
                },
                secondPool: {
                    questions: [
                        {
                            id: "1",
                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Question_in_a_question_in_a_question_in_a_question.gif/1200px-Question_in_a_question_in_a_question_in_a_question.gif"
                        },
                        {
                            id: "2",
                            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFJmEEr0nYtZBtzSo5nRoiaU_MBfakBE_eQ&s"
                        }
                    ],
                    answers: [
                        {
                            id: "1",
                            url: "https://imo10.labirint.ru/books/617356/ph_001.jpg/960-0"
                        },
                        {
                            id: "2",
                            url: "https://basket-01.wbbasket.ru/vol48/part4825/4825258/images/big/7.webp"
                        }
                    ],
                },
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
