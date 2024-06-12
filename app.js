let scoreWindow = document.querySelector('#result')
scoreWindow.style.display = 'none'
const questionTime = 10 // время на вопрос
let questionTimeout = questionTime // таймер вопроса (обновляем на каждом новом вопросе)

// загружаем фоновую музыку и звуки
/*const backgroundMusic = new Audio('')
const soundTrue = new Audio('')
const soundFalse = new Audio('')*/

// создаем список вопросов
const questionsList = [
    {
        question: 'Эверест - это?',
        answers:[
            'Континент',
            'Город',
            'Гора',
            'Море'
        ],
        right: 2 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Столица Японии?',
        answers:[
            'Париж',
            'Пекин',
            'Токио',
            'Москва'
        ],
        right: 2 // правильный ответ (нумерация с нуля)
    },
  
   {
        question: 'чему равно число π?',
        answers:[
            '2,45',
            '3,14',
            'Очень много',
            '3,12'
        ],
        right: 1 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Сколько углов у ромба?',
        answers:[
            '2',
            '4',
            '6',
            '8'
        ],
        right: 1 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Кто президент Беларуси',
        answers:[
            'Лукашенко',
            'Байден',
            'Йоханнис',
            'Токаев'
        ],
        right: 0 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Какая русская сказка существует?',
        answers:[
            'Гуси-лебеди',
            'Орлы-соколы',
            'Утки-аисты',
            'Воробьи-вороны'
        ],
        right: 0 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Какая шахматная фигура ходит буквой "Г"?',
        answers:[
            'Ладья',
            'Конь',
            'Ферзь',
            'Слон'
        ],
        right: 1 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Что есть в организме человека?',
        answers:[
            'Нервные клетки',
            'Злобные рёбра',
            'Недовольные зубы',
            'Бунтующие гены'
        ],
        right: 0 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'На каком топливе работают дизели?',
        answers:[
            'Уголь',
            'Дрова',
            'Торф',
            'Солярка'
        ],
        right: 3 // правильный ответ (нумерация с нуля)
    },

    {
        question: 'Кого называют королем поп-музыки?',
        answers:[
            'Элвиса Пресли',
            'Майкла Джексона',
            'Филиппа Киркорова',
            'Боба Марли'
        ],
        right: 1 // правильный ответ (нумерация с нуля)
    },
]
// сортируем вопросы в случайном порядке
questionsList.sort( arrayRandomSort ) // в метод sort передаем функцию сортировки
function arrayRandomSort() {
    // Math.random() генерирует случайное число от 0 до 1 (не включая 1)
    return Math.random() - 0.5
}

let score = 0 // число очков (начисляем при правильном ответе за оставшееся время)
let rightAnswers = 0 // число правильных ответов

let rightText = '' // текст правильного ответа (обновляем задавая новый вопрос)
let answer = '' // ответ, выбранный игроком (обновляем при клике игрока на ответ)

let questionCounter = 0 // счетчик заданных вопросов
const questionNumber = questionsList.length // число всех вопросов


// получаем ссылки на HTML-теги, для работы с ними
const startButton = document.querySelector('.start')

const gameContainer = document.querySelector('#game-container')

const divInfo = document.querySelector('#info')
const qNumberSpan = document.querySelector('#q-number')
const qAllSpan = document.querySelector('#q-all')
const qTimerSpan = document.querySelector('#q-timer')
const divQuestion = document.querySelector('.question')

const divAns1 = document.querySelector('#ans1')
const divAns2 = document.querySelector('#ans2')
const divAns3 = document.querySelector('#ans3')
const divAns4 = document.querySelector('#ans4')

const divResult = document.querySelector('#result')
const spanScore = document.querySelector('#score')
const spanRight = document.querySelector('#rightCount')

// создаем массив из тегов <div> с ответами
const answers = [divAns1, divAns2, divAns3, divAns4]
// создаем массив из тегов <span> в тегах <div> с ответами
const answerSpans = [
    divAns1.querySelector('span'),
    divAns2.querySelector('span'),
    divAns3.querySelector('span'),
    divAns4.querySelector('span'),
]

// подключаем слушатель клика к кнопкам ответа
for(let i = 0; i < answers.length; i++) {
    answers[i].onclick = getAnswerClick
    // answers[i].onclick = function() { getAnswerClick(i) }
}

// функция - обработчик клика по ответу
function getAnswerClick( event ) {
    if (answer) return // если ответ уже дан - выходим

    const divAnswer = event.target // получаем <div> по которому кликнул игрок
    const spanAnswer = divAnswer.querySelector('span') // получаем <span> в <div>
    if (spanAnswer) {answer = spanAnswer.innerText} else {answer = divAnswer.innerText}
    //console.log(divAnswer)
    // проверка правильности произойдет в функции updateTimer()

    /*if (answer = rightText) {
        soundTrue.play()
    } else {
        soundFalse.play()
    }*/
}

startButton.onclick = startQuiz

function startQuiz() {
    //backgroundMusic.play()

    startButton.style.display = 'none'
    gameContainer.style.display = 'block'
  
    qAllSpan.innerText = questionNumber
    nextQuestion()
}

function updateTimer() {
    if (answer) {
        if(rightText === answer) {
            score += questionTimeout
            rightAnswers = rightAnswers + 1
        }
        return nextQuestion()
    }

    questionTimeout--
    qTimerSpan.innerText = questionTimeout
    if (questionTimeout > 0) {
        setTimeout(updateTimer, 1000)
    } else {
        setTimeout(nextQuestion, 1000)
    }
}

function nextQuestion() {
    answer = ''
    // clearTimeout(questionTimerID)

    questionCounter++
  
    if (questionCounter > questionNumber) {
        return showResults()
    }
  
    questionTimeout = questionTime
    qNumberSpan.innerText = questionCounter
    qTimerSpan.innerText = questionTimeout 

    let question = questionsList.pop()
    rightText = question.answers[ question.right ]

    divQuestion.innerText = question.question

    answerSpans.forEach( (ansSpan, index) => {
        ansSpan.innerText = question.answers[index]
    })
  
    setTimeout(updateTimer, 1000)
}

function showResults() {
    gameContainer.style.display = 'none'

    spanScore.innerText = score
    spanRight.innerText = rightAnswers
    divResult.style.display = 'block'
    console.log(divResult)
}