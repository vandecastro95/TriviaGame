let data = {
    '0': {
        question: 'What Animal is the national emblem of Canada?',
        answerA: 'Moose',
        answerB: 'Platypus',
        answerC: 'American Eagle',
        answerD: 'Beaver',
        answer: '.choiceB'
    },
    '1': {
        question: 'How many players on the field are there in a baseball team?',
        answerA: '9',
        answerB: '12',
        answerC: '2',
        answerD: '11',
        answer: '.choiceA'
    },
    '2': {
        question: 'Which TV character said, “Live long and prosper”?',
        answerA: 'Spock',
        answerB: 'Yoda',
        answerC: 'Indiana Jones',
        answerD: 'Fonzie',
        answer: '.choiceA'
    },
    '3': {
        question: 'Which is the highest waterfall in the world?',
        answerA: 'Sculpture Falls, Austin',
        answerB: 'Angel Falls, Venezuela',
        answerC: 'Niagara Falls, Canada',
        answerD: 'Victoria Falls, Zambia',
        answer: '.choiceB'
    },
    '4': {
        question: 'Which of the planets is closest to the sun?',
        answerA: 'Uranus',
        answerB: 'Mars',
        answerC: 'Venus',
        answerD: 'Mercury',
        answer: '.choiceD'
    },
    '5': {
        question: 'Which author wrote The Silence of the Lambs?',
        answerA: 'Harper Lee',
        answerB: 'Charles Dickens',
        answerC: 'Thomas Harris',
        answerD: 'William Faulkner',
        answer: '.choiceC'
    },
    '6': {
        question: 'Which US city is known as the City of Brotherly Love?',
        answerA: 'Boston',
        answerB: 'Portland',
        answerC: 'San Jose',
        answerD: 'Philadelphia',
        answer: '.choiceD'
    },
    '7': {
        question: 'What is the chemical symbol for iron?',
        answerA: 'Ir',
        answerB: 'Fe',
        answerC: 'Ar',
        answerD: 'Ne',
        answer: '.choiceB'
    },
    '8': {
        question: 'Which English actor won the 2014 Academy Award for best actor for his role in The Theory of Everything?',
        answerA: 'Eddie Redmayne',
        answerB: 'Paul Bettany',
        answerC: 'Hugh Laurie',
        answerD: 'Benditdick Gumperpatch',
        answer: '.choiceA'
    },
    '9': {
        question: 'According to the song, what did my true love give to me on the seventh day of Christmas?',
        answerA: 'Geese A-laying',
        answerB: 'Maids A-milking',
        answerC: 'Swans A-Swimming.',
        answerD: 'I hate christmas',
        answer: '.choiceC'
    },
    '10': {
        question: 'What was the family name of the Russian rulers from the 17th century until the 1917 revolution?',
        answerA: 'Ferdinand',
        answerB: 'Romanov',
        answerC: 'Putin',
        answerD: 'Trump',
        answer: '.choiceB'
    }
}

function displayQuestion() { //prints questions and answers
    a = questions[Math.floor(Math.random() * questions.length)]; //randomizing questions;
    $('.row').show();
    document.querySelector('.question').innerText = data[a].question;
    document.querySelector('.choiceA').innerText = data[a].answerA;
    document.querySelector('.choiceB').innerText = data[a].answerB;
    document.querySelector('.choiceC').innerText = data[a].answerC;
    document.querySelector('.choiceD').innerText = data[a].answerD;
    $(data[a].answer).addClass("rightAnswer");

}

function newQuestion() {
    $('.row').hide();
    $(data[a].answer).removeClass("rightAnswer"); 
    a = null;
    nextRound = false;
    console.log(questions)
    setTimeout(function () {displayQuestion()}, 1000);

}

function timeUp() {
    counter++;
    console.log("times up");
    questions.splice( questions.indexOf(a), 1 );
    newQuestion();
}
let a;
let counter = 0;
let wins = 0;
let questions=['0','1','3','4','5','6','7','8','9','10']
let questionsDone = [];
let nextRound = false;


$(document).ready(function () {
    $('.row').hide();

    $(document).one("keyup", function () {

        $('body').addClass("bg");
       
        $('.start').hide();

        $('.container').removeClass("opening");

        
        displayQuestion();
        
        if (nextRound == false) {
            nextRound = true;
            
            setTimeout(function () {timeUp()}, 15000);

            $(".answer").on("click", function () {
                if($(this).hasClass("rightAnswer") == false){
                    console.log(
                        'you lose'
                    )
                    console.log(wins);
                    wins++;
                    questions.splice( questions.indexOf(a), 1 );
                    newQuestion();
                }
                
                if ($(this).hasClass("rightAnswer" ) ){
                    wins++;
                    questions.splice( questions.indexOf(a), 1 );
                    console.log(a);
                    console.log('right answer');
                    newQuestion();
                }

            })
        }
    })
})