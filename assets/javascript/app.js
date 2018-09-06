let data = { // trivia question list
  '0': {
    question: 'What Animal is the national emblem of Canada?',
    answerA: 'Moose',
    answerB: 'Platypus',
    answerC: 'American Eagle',
    answerD: 'Beaver',
    answer: '.choiceD'
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
    answerC: 'Swans A-Swimming',
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

function displayQuestion () { // prints questions and answers

  if (questions.length != 0) {
    a = questions[Math.floor(Math.random() * questions.length)] // randomizing questions

    document.querySelector('.question').innerText = data[a].question
    document.querySelector('.choiceA').innerText = data[a].answerA
    document.querySelector('.choiceB').innerText = data[a].answerB
    document.querySelector('.choiceC').innerText = data[a].answerC
    document.querySelector('.choiceD').innerText = data[a].answerD
    $(data[a].answer).addClass('rightAnswer')
    $('.row').fadeIn('slow')
    
    $('.alert').show()
    document.querySelector('.timer').innerText = timer
    run();
  }else {
    // closing logic
    $('.main').hide("slow");
    $('.alert').hide();
    $('.question').hide();
    $('body').addClass("closinggif");
    $('.closing').show("slow");
    $('.row').fadeIn('slow')
    document.querySelector('.jumbotron').innerText = "Final Score: " + wins;
    setTimeout(() => {
      window.location.reload(true)
    }, 5000)
  }
}

function newQuestion () { // loops to a new question
    timer = 15 // restarts timer
    $('.row').hide()
  $(data[a].answer).removeClass('rightAnswer')
  $(data[a].answer).removeClass('guessedRight')
  a = null
  nextRound = false
  displayQuestion()
  clearInterval(intervalId)
}

function timeUp () { // stops when timer is up
  $('.alert').hide()
  questions.splice(questions.indexOf(a), 1)
  $(data[a].answer).addClass('guessedRight')
  $('.rightAudio')[0].play()
  setTimeout(function () { newQuestion() }, 1500)
}

function run () {
  intervalId = setInterval(decrement, 1000)
}

function decrement () {
  document.querySelector('.timer').innerText = timer
  --timer

  if (timer < 0) {
    timer = 15;
  document.querySelector('.timer').innerText = "Time's up!"
    timeUp()
  }
}

let a

let wins = 0

let questions = ['0', '1', '3', '4', '5', '6', '7', '8', '9', '10']

let questionsDone = []

let nextRound = false

let timer = 15

let intervalId

$(document).ready(function () {
  $('.closing').removeClass('hide').hide()
  $('.row').hide()
  $('.alert').removeClass('hide').hide()
  $(document).one('keyup', function () {
    $('body').addClass('bg')

    $('.start').hide()

    $('.container').removeClass('opening')

    $('#backgroundAudio')[0].play()

    displayQuestion()
    $('audio').animate({ volume: 0.8 }, 3000)



    $('.answer').on('click', function () {

      if (nextRound == false) {
        nextRound = true

        if ($(this).hasClass('rightAnswer') == false) {
            $('.rightAudio')[0].play()
          $(data[a].answer).addClass('guessedRight')
          $(this).addClass('guessedWrong')
          $('.answer').removeClass('answerHover')
          questions.splice(questions.indexOf(a), 1)

          $('.alert').hide('slow')
          setTimeout(function () {
            $(data[a].answer).removeClass('guessedRight')
            $('.answer').removeClass('guessedWrong')
            $('.answer').addClass('answerHover')
            newQuestion()
          }, 1500)
        }

        if ($(this).hasClass('rightAnswer')) {
            $('.wrongAudio')[0].play()
          $(this).addClass('guessedRight')
          wins++
          questions.splice(questions.indexOf(a), 1)
          $('.answer').removeClass('answerHover')

          $('.alert').hide('slow')
          setTimeout(function () {
            $(this).removeClass('guessedRight')
            $('.answer').addClass('answerHover')
            newQuestion()
          }, 1500)
        }
      }
    })
  })
})
