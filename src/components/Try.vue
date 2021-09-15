<template>
<div class="quiz-page-template-container">
        <div class="quiz-header-container">
            <div class="quiz-name-text-container">
                <span class="quiz-name-text"> Quiz Number 1 </span>
            </div>
            <div class="page-header-button-container">
                <button class="page-header-button">
                    Exit
                </button>
            </div>
        </div>
        <div class="quiz-main-page" id="quiz-main-page">
            <div class="quiz-question-container" id="quiz-question-container">
                <div class="quiz-question-text-container" id="quiz-question-text-container">
                </div>
                <div class="quiz-answer-text-container" id="quiz-answer-text-container">
                    <ul class="quiz-answer-list" id="quiz-answer-list">
                    </ul>
                </div>
            </div>
            <div class="question-iteration-container">
                <div class="progress-bar-container">
                    <span class="progress-bar-text" id="progress-bar-text"></span>
                    <div class="progress quiz-completion-outer-progress-bar" style="height: 3px;">
                        <div class="quiz-completion-inner-progress-bar" id="quiz-progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="question-iteration-container-single" id="previous-question-load">
                    <span class="question-iteration-icon"> ^ </span>
                </div>
                <div class="icon-flipped question-iteration-container-single" id="next-question-load">
                    <span class="question-iteration-icon"> ^ </span>
                </div>
            </div>
        </div>
    </div>
    
  
</template>

<script>
export default {
    name : 'Try'

}

const quiz = {
    "name": "Psychology Quiz",
    "questions": [{
            "type": "single",
            "question": "Which is not a step in the scientific method?",
            "answers": ["Ask question", "Form hypothesis", "Replicate results", "Collect data", "Analysis"],
            "entered": [],
            "correct": "Replicate results"
        },
        {
            "type": "single",
            "question": "_____ explanations for aggressive behavior include genetic predisposition, high testosterone level and frontal lobe damage.",
            "answers": ["Social", "Biological", "Cross-cultural", "Cognitive", "Psychoactive"],
            "entered": [],
            "correct": "Biological"
        },
        {
            "type": "single",
            "question": "Social identity refers to _____.",
            "answers": ["Our membership in particular groups, which largely determines our everyday interactions", "Prejudices that are based on personal experiences that occur during development", "The drive for success that motivates people to form prejudices about their competitors", "All of the answers are correct."],
            "entered": [],
            "correct": "Replicate results"
        },
        {
            "type": "multiple",
            "question": "The belief that everyone is good and naturally altruistic is an example of which psychological perspective?",
            "answers": ["Biological", "Cognitive", "Behavioral", "Evolutionary", "Humanistic"],
            "entered": [],
            "correct": "Humanistic"
        },
        {
            "type": "short",
            "question": "Please describe in two sentences or less what psychoanalysis is.",
            "entered": [],
            "answers": []
        },
        {
            "type": "long",
            "question": "In three paragraphs, describe Freud's theory of id, ego, and superego. Use examples as needed.",
            "entered": [],
            "answers": []
        }
    ]
}
// Tracks index of question on quiz
let currentQuestionIndex = 0

// Shortcut for removing duplicates from arrays
const uniq = (a) => {
    return Array.from(new Set(a));
}

// Accepts a parent id to remove all children
const removeAllChildren = (parent) => {
    let node = document.getElementById(parent)
    node.innerHTML = ``
}

// Initialization functions go here
const init = () => {
    cr_ContinueButton()
    ad_QuestionIteration()
    loadQuestion(quiz.questions[0], true)
}

// Loads a multiple choice quiz question
const loadQuestion = async (question, init) => {
    updateProgessBarStatus()
    cr_QuizQuestionText(question.question)
    if (question.type == `multiple` || question.type == `single`) {
        loadMultipleChoiceQuestion(question)
        loadPreviousEnteredChoice(question.entered)
    } else if (question.type == `short` || question.type == `long`) {
        loadTextFormQuestion()
        loadPreviousEnteredText(question.entered)
    }
    // Skips loading animation on initialization
    if (!init) {
        await MoveQuestionContainerMiddle()
    }
    ShowHideContinueButton(quiz.questions[currentQuestionIndex])
}

// Creates elements for multiple choice questions (checkboxes & radios)
const loadMultipleChoiceQuestion = (question) => {
    // Generating answer elements
    let quizAnswersUL = document.getElementById(`quiz-answer-list`)
    // questionHTML.id
    for (let i = 0; i < question.answers.length; i++) {
        let quizQuestionDIV = document.createElement(`div`)
        quizQuestionDIV.className = `quiz-answer-text-container-single unselected-answer`
        // Assigns ID as ASCII values (A = 65, B = 66, etc.)
        quizQuestionDIV.id = (i + 65).toString()
        ad_QuizSelectAnswer(quizQuestionDIV)
        // Generate elements
        let quizQuestionPress = document.createElement(`li`)
        let quizQuestionNumerator = document.createElement(`li`)
        let quizQuestionText = document.createElement(`li`)
        // Adding elements to quiz answers
        ed_QuizQuestionElements(question.type, quizQuestionPress, quizQuestionNumerator, quizQuestionDIV, quizQuestionText)
        // Convert ASCII code to text for multiple choice selection
        quizQuestionNumerator.innerText = String.fromCharCode(i + 65)
        quizQuestionText.innerText = question.answers[i]
        // Psuedoparent append
        quizQuestionDIV.append(quizQuestionPress, quizQuestionNumerator, quizQuestionText)
        // Main parent append
        quizAnswersUL.appendChild(quizQuestionDIV)
    }
}

const loadTextFormQuestion = () => {
    // Generating answer elements
    let quizAnswersUL = document.getElementById(`quiz-answer-list`)
    let questionTextarea = document.createElement(`div`);
    questionTextarea.contentEditable = true
    questionTextarea.className = `form-control question-text-form answer-typed-input-form`;
    questionTextarea.setAttribute(`id`, `questionTextarea`);
    questionTextarea.setAttribute(`data-text`, `Enter answer here...`)
    questionTextarea.setAttribute(`onkeydown`, `SaveWrittenAnswers()`)
    questionTextarea.innerHTML = ``
    quizAnswersUL.append(questionTextarea)
}

// Saves short and long form objects to local object
const SaveWrittenAnswers = () => {
    quiz.questions[currentQuestionIndex].entered[0] = document.getElementById(`questionTextarea`).innerHTML
}


// Assigns answered question attributes to elements that have been entered by user previously
const loadPreviousEnteredChoice = (entered) => {
    for (let i = 0; i < entered.length; i++) {
        selectAnswer(entered[i], true)
    }
}

// re-assigns text to short/long form questions
const loadPreviousEnteredText = () => {
    let entered = quiz.questions[currentQuestionIndex].entered
    if (entered.length > 0) {
        let answer = document.getElementById(`questionTextarea`)
        answer.innerHTML = entered[0]
    }
}

// Moves question off screen in a given direction
const MoveQuestionContainer = (first = `up`, second = `down`) => {
    return new Promise((resolve, reject) => {
        // Assigning correct class
        first = `move-container-` + first
        second = `move-container-` + second
        let parent = document.getElementById(`quiz-question-container`);
        parent.classList.add(first, `fadeout`, `fast-transition`);
        setTimeout(() => {
            parent.classList.remove(first, `fast-transition`)
            parent.classList.add(`no-transition`, second)
            resolve()
        }, 200)
    })

}

// Re-centers question on page
const MoveQuestionContainerMiddle = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let parent = document.getElementById(`quiz-question-container`);
            parent.classList.remove(`no-transition`, `fadeout`);
            parent.classList.add(`fast-transition`, `fadein`)
            parent.style.top = `0`
            parent.classList.remove(`move-container-down`, `move-container-up`)
            setTimeout(() => {
                parent.classList.remove(`fadein`)
                resolve()
            }, 200)
        }, 50)
    })
}

// Adds class names to quiz question based on which type of which it is
const ed_QuizQuestionElements = (type, press, numerator, container, text) => {
    // Append classes for different types of questions
    if (type == `single`) {
        // Radio button classes
        press.className = `press-key-label press-label-radio answer-key-numerator unselected-answer-button`
        numerator.className = `answer-key-numerator numerator-radio unselected-answer-button`
        container.classList.add(`question-type-single`)
    } else if (type == `multiple`) {
        // Checkbox classes
        press.className = `press-key-label press-label-checkbox answer-key-numerator unselected-answer-button`
        numerator.className = `answer-key-numerator numerator-checkbox unselected-answer-button`
        container.classList.add(`question-type-multiple`)
    }
    text.className = `quiz-answer-text-item`
    press.innerText = `Press`
}

// Assigns the question's text 
const cr_QuizQuestionText = (question) => {
    // Generating question text
    let quizQuestionTextDIV = document.getElementById(`quiz-question-text-container`)
    let quizQuestionTextSPAN = document.createElement(`span`)
    quizQuestionTextSPAN.className = `quiz-question-text-item`
    quizQuestionTextSPAN.innerText = question
    quizQuestionTextDIV.appendChild(quizQuestionTextSPAN)
}

// Creates continue button
const cr_ContinueButton = () => {
    let continueDIV = document.createElement(`div`)
    let continueBUTTON = document.createElement(`button`)
    let continueSPAN = document.createElement(`span`)
    continueDIV.id = `quiz-continue-button-container`
    continueDIV.className = `quiz-continue-button-container`
    continueBUTTON.className = `quiz-continue-button`
    continueSPAN.className = `quiz-continue-text`
    continueSPAN.id = `quiz-continue-text`
    continueBUTTON.innerHTML = `OK`
    // Moves to next question on click
    continueBUTTON.onclick = function() {
        loadNewQuestion(`next-question-load`)
    }
    continueSPAN.innerHTML = `press ENTER`
    continueDIV.append(continueBUTTON, continueSPAN)
    let parent = document.getElementById(`quiz-question-container`)
    parent.append(continueDIV)
    // Discerns whether or not to show continue button, based on whether or not an answer has been input/selected
    ShowHideContinueButton(quiz.questions[currentQuestionIndex])
}

// Only shows a continue button if a question is selected
const ShowHideContinueButton = (question) => {
    if (question.type == 'short' || question.type == `long`) {
        document.getElementById(`quiz-continue-button-container`).style.display = `initial`
        document.getElementById(`quiz-continue-text`).style.display = `none`
    } else {
        let show = document.getElementById(`quiz-answer-list`).children
        let buttonContainer = document.getElementById(`quiz-continue-button-container`)
        document.getElementById(`quiz-continue-text`).style.display = `initial`
        // Checks if an answer has been selected. If so, shows continue button
        for (let i = 0; i < show.length; i++) {
            if (show[i].classList.contains(`selected-answer`)) {
                buttonContainer.style.display = `initial`
                return
            }
        }
        // If no answer is selected, don't display button
        buttonContainer.style.display = `none`
    }
}

// Function to load next question & possible answers in object
const loadNewQuestion = async (adjustment) => {
    // Saves written answers before moving on to next question
    let type = quiz.questions[currentQuestionIndex].type
    if (type == 'long' || type == 'short') {
        SaveWrittenAnswers()
    }
    // Removes previous question & answers
    if (canLoadNewQuestion(adjustment)) {
        await QuestionContainerLoad(adjustment)
        removeAllChildren(`quiz-answer-list`)
        removeAllChildren(`quiz-question-text-container`)
        // Displays previous questions. Does nothing if no questions to load.
        if (adjustment == `previous-question-load`) {
            loadQuestion(quiz.questions[currentQuestionIndex])
            // Displays next question. Does nothing if no questions to load.
        } else if (adjustment == `next-question-load` && currentQuestionIndex <= quiz.questions.length) {
            loadQuestion(quiz.questions[currentQuestionIndex])
        }
    }
}

// Checks if we have reached the first or last question
const canLoadNewQuestion = (adjustment) => {
    // In/de-crement based on if user is loading next or previous question
    if (adjustment == `next-question-load`) {
        currentQuestionIndex++
    } else {
        currentQuestionIndex--
    }
    // Fail safe if we have reached last quesiton
    if (currentQuestionIndex > quiz.questions.length - 1) {
        currentQuestionIndex--
        return false
        // Fail safe if trying to move before first question
    } else if (currentQuestionIndex < 0) {
        currentQuestionIndex++
        return false
    }
    return true

}

// Discerns which direction the question will fly on/off the page
const QuestionContainerLoad = (adjustment) => {
    return new Promise(async (resolve, reject) => {
        if (adjustment == 'next-question-load') {
            // Moves container up off the screen
            await MoveQuestionContainer(`up`, `down`)
        } else {
            // Moves container down off the screen
            await MoveQuestionContainer(`down`, `up`)
        }
        resolve()
    })
}

// Highlights and unhighlights given answers when a keytap is pressed 
// key indicates the id of the given answer, invoking previous will prevent the function from editing the local answered questions object
const selectAnswer = (key, previous) => {
    let answer = document.getElementById(key)
    if (answer) {
        // If only one answer can be given, unselect all answers before reselecting new answer
        if (answer.classList.contains(`question-type-single`)) {
            unselectAllAnswers(document.getElementById('quiz-answer-list'))
        }
        // If answer is not yet selected, select it
        if (answer.classList.contains(`unselected-answer`)) {
            answer.classList.add(`selected-answer`)
            answer.classList.remove(`unselected-answer`)
            indicateSelectedAnswer(answer)
            if (!previous) {
                storeAnswers(true, key)
            }
            // If answer is already selected, unselect it
        } else if (answer.classList.contains(`selected-answer`)) {
            answer.classList.add(`unselected-answer`)
            answer.classList.remove(`selected-answer`)
            // Unhighlight selected answer buttons
            unselectAnswerButton(answer.children)
            if (!previous) {
                storeAnswers(false, key)
            }
        }
    }
    // Triggers a check to see if we should display continue button
    ShowHideContinueButton(quiz.questions[currentQuestionIndex])
}

// Indicate previous is true in order to skip storing answers in the local object
const storeAnswers = (add, key) => {
    // For adding user's answers to the local object
    if (add) {
        if (quiz.questions[currentQuestionIndex].type == `single`) {
            quiz.questions[currentQuestionIndex].entered.length = 0
        }
        quiz.questions[currentQuestionIndex].entered.push(key)
        // For removing user's answers from the local object
    } else {
        quiz.questions[currentQuestionIndex].entered = quiz.questions[currentQuestionIndex].entered.filter(item => item !== key)
    }
    // Ensures there are no duplicate answers in array
    quiz.questions[currentQuestionIndex].entered = uniq(quiz.questions[currentQuestionIndex].entered)
}

// Changes answer button appearance to show as selected
const indicateSelectedAnswer = (answer) => {
    let button = answer.querySelectorAll('.answer-key-numerator')
    for (let i = 0; i < button.length; i++) {
        button[i].classList.add(`selected-answer-button`)
        button[i].classList.remove(`unselected-answer-button`)
    }
}

// Unselects all answers in a question
const unselectAllAnswers = (answerList) => {
    for (let i = 0; i < answerList.childElementCount; i++) {
        let child = answerList.children[i]
        if (child.classList.contains(`selected-answer`)) {
            child.classList.add(`unselected-answer`)
            child.classList.remove(`selected-answer`)
        }
        // re/un-assigns children attribute elements, such as button coloring classes
        unselectAnswerButton(child.children)
    }
}

// Unselects individual quiz answer buttons (e.g. Press A)
const unselectAnswerButton = (child) => {
    for (let j = 0; j < child.length; j++) {
        let childButton = child[j]
        if (childButton && childButton.classList.contains(`selected-answer-button`)) {
            childButton.classList.add(`unselected-answer-button`)
            childButton.classList.remove(`selected-answer-button`)
        }
    }
}

// Change progress bar styling as quiz is completed
const updateProgessBarStatus = () => {
    // Assigning attributes
    let progress = document.getElementById('quiz-progress-bar')
    let text = document.getElementById('progress-bar-text')
    // Value of progress is set in terms of 0 to 100
    let value = Math.floor((calculateQuizProgress(quiz.questions) / quiz.questions.length) * 100)
    // Changing width and aria value 
    progress.setAttribute('aria-valuenow', value)
    progress.style.width = value + `%`
    // Updates progress bar text
    text.innerText = value + '% complete'
}

// Finds quiz progress by comparing num of questions answers to total number of questions
const calculateQuizProgress = (questions) => {
    let answers = 0
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].entered.length > 0) {
            answers++
        }
    }
    return answers
}

// Assigns function to change answer attributes with given id
const ad_QuizSelectAnswer = (answer) => {
    answer.onclick = () => {
        selectAnswer(answer.id)
    }
}

// Adds iteration capabilities to previous & next buttons 
const ad_QuestionIteration = () => {
    let prev = document.getElementById(`previous-question-load`)
    let next = document.getElementById(`next-question-load`)
    prev.onclick = () => {
        loadNewQuestion(prev.id)
    }
    next.onclick = () => {
        loadNewQuestion(next.id)
    }
}

// Listener for key presses for quiz interaction.
document.onkeydown = function(evt) {
    evt = evt || window.event;
    // console.log(evt.keyCode)
    // Registers key selectors for A to J on multiple choice questions.
    if (evt.keyCode >= 65 && evt.keyCode < 90 || evt.keyCode == 8 || evt.keyCode == 46) {
        selectAnswer(evt.keyCode.toString())
    }
    if (evt.keyCode == 38) {
        loadNewQuestion('previous-question-load')
    }
    // Moves to next question on down arrow tap or enter. Disables iteration using enter key for open ended questions
    let type = quiz.questions[currentQuestionIndex].type
    if (evt.keyCode == 40 || ((type == `single` || type == `multiple`) && evt.keyCode == 13)) {
        loadNewQuestion('next-question-load')
    }
};

init()
</script>

<style>
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
}

div:focus {
    outline: 0;
}

.answer-typed-input-form:focus {
    border: 0;
    box-shadow: initial !important;
    background: none;
    color: rgb(112, 185, 199);
}

/* Experimental fading */
@-webkit-keyframes fadeout {
    100% {
        opacity: 0;
    }
}

@keyframes fadeout {
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Vertically expanding text input box which allows data-text start */
div[contenteditable] {
    height: inherit;
    max-height: 200px;
    overflow: auto;
}

[contentEditable=true]:empty:not(:focus):before {
    content: attr(data-text)
}

/* Vertically expanding text input box which allows data-text end */

.fast-transition {
    transition: top .5s;
}

/* Transition & Modifier Classes */

.fade {
    opacity: 0;
    -webkit-transition: opacity 0.15s linear;
    -moz-transition: opacity 0.15s linear;
    -o-transition: opacity 0.15s linear;
    transition: opacity 0.15s linear;
}

.fade.in {
    opacity: 1;
}

.selected-answer {
    background-color: rgba(115, 190, 200, 0.4);
    color: #0c6165;
    box-shadow: rgba(62, 96, 138, 1) 0px 0px 0px 1px inset;
}

.unselected-answer {
    box-shadow: rgba(115, 190, 200, 0.6) 0px 0px 0px 1px inset;
}

.radian-answer-border {
    border-radius: 50%;
}

/* End Transition & Modifier Classes */

.page-header-container {
    height: 50px;
    background: #fff;
    position: relative;
    margin-bottom: 3em;
}

.page-header-button-container {
    position: absolute;
    right: 30px;
    top: 8px;

}

.page-header-button {
    background-color: inherit;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: .25rem 3rem;
    font-size: 14px;
    height: 33px;
    width: 150px;
}

.page-header-button:hover {
    border: 1px solid #26b;
    cursor: pointer;
}

.quiz-header-container {
    background-color: rgba(205, 234, 239, 0.9);
    position: relative;
    margin-bottom: 3em;
    height: 50px;
    z-index: 2;
}

.quiz-name-text-container {
    position: absolute;
    top: 25%;
    padding-left: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    overflow: hidden;
}

.quiz-name-text {
    color: rgb(56, 189, 207);
    font-size: 19px;
}

.quiz-page-template-container {
    background-color: #f1f9fa;
    padding: 0px;
    overflow: hidden;
    height: 100%;
}

.quiz-main-page {
    text-align: center;
}

.quiz-question-text-container {
    margin-bottom: 30px;
}

.quiz-question-text-item {
    max-width: 100%;
    font-size: 24px;
    line-height: 32px;
    color: rgb(56, 189, 207);
    margin: 0px;
}

.quiz-answer-list {
    list-style-type: none;
    padding-left: 0px;
}

.quiz-answer-text-container {
    position: relative;
}

.quiz-answer-text-container-single {
    color: rgb(115, 190, 200);
    opacity: 1;
    will-change: opacity;
    height: auto;
    border-radius: 4px;
    min-width: 75px;
    min-height: 40px;
    flex-grow: 1;
    align-items: center;
    display: flex;
    padding: 4px 12px 4px;
    margin-top: 10px;
}

.quiz-answer-text-container-single:hover {
    background-color: rgba(115, 190, 200, 0.3);
    cursor: pointer;
}

.quiz-answer-text-container-single:hover .press-key-label {
    display: inherit;
}

.quiz-answer-text-container-single:hover .numerator-radio {
    border-radius: 0 50% 50% 0;
}

/* Added a "dynamic" width as a catch-all until a cleaner solution is implented for long questions/answers */
.quiz-question-container {
    display: inline-block;
    text-align: left;
    width: 75%;
    position: relative;
    top: 0px;
    max-width: 700px;
}

.move-container-up {
    top: -50vh !important;
}

.move-container-down {
    top: 100vh !important;
}

/* 'forwards' makes the ending animation frame permanent */
.fadeout {
    -webkit-animation: fadeout .3s linear forwards !important;
    animation: fadeout .3s linear forwards !important;
}

.fadein {
    -webkit-animation: fadein .5s linear forwards !important;
    animation: fadein .5s linear forwards !important;
}



.answer-key-numerator {
    position: relative;
    width: 24px;
    min-width: 22px;
    height: 24px;
    font-size: 12px;
    line-height: 16px;
    font-family: sans-serif;
    border: 1px solid rgba(115, 190, 200, 0.6);
    font-weight: bold;
    display: flex;
    align-self: flex-start;
    align-items: center;
    box-shadow: transparent 0px 0px 0px 1px;
    margin: 8px;
    -webkit-box-align: center;
    justify-content: center;
}

.answer-typed-input-form {
    line-height: 40px;
    background: 0;
    border: 0px;
    border-bottom: 1px solid rgba(88, 176, 181, 0.5);
    border-radius: 0px;
    font-size: 30px;
    color: rgba(121, 193, 207, 0.6);
    padding-left: 0px;
}

.answer-typed-input-form:hover {
    cursor: text;
}

.press-label-checkbox {
    border-radius: 2px;
}

.press-label-radio {
    border-radius: 5px 0px 0px 5px;
}

.numerator-radio {
    border-radius: 50%;
}

.numerator-checkbox {
    border-radius: 2px;
}

.press-key-label {
    display: none;
    width: 42px;
    border-right: 0px;
    padding-left: 6px;
    position: absolute;
    left: -29px;
    z-index: 1;
    border-right: 0px;
}

.question-iteration-container {
    position: fixed;
    bottom: 1%;
    right: 1%;
}

.question-iteration-container-single {
    padding: .5rem .75rem;
    line-height: 1.5;
    border-radius: .2rem;
    font-size: 20px;
    color: white;
    background-color: #BBE0E5;
    border: 0px;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.question-iteration-container-single:hover {
    cursor: pointer;
    background: #C5E5E9;
}

.progress-bar-container {
    position: absolute;
    top: 12px;
    right: 100px;
    width: 15rem;
}

.progress-bar-text {
    font-size: 14px;
    color: #c8e4e8;
}

.quiz-completion-outer-progress-bar {
    background-color: #bfdfe3;
    display: flex;
    overflow: hidden;
    font-size: .75rem;
    border-radius: .25rem;
}

.quiz-completion-inner-progress-bar {
    background-color: rgb(62, 162, 174);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    transition: width .6s ease;
}

.unselected-answer-button {
    background-color: rgba(241, 249, 250, 1);
    color: rgb(115, 190, 200);
}

.selected-answer-button {
    color: rgba(241, 249, 250, 1);
    background-color: rgb(115, 190, 200);
}

.quiz-continue-button {
    position: relative;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
    min-height: 40px;
    background-color: #bbe0e5;
    color: #2d6c75;
    outline: none;
    margin: 0px;
    padding: 6px 14px;
    border-color: transparent;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.quiz-continue-button:hover {
    background-color: #8abec5;
}

.quiz-continue-text {
    font-size: 13px;
    margin-left: 10px;
    color: #51c5d4;
}

.question-text-form {
    border-radius: .25rem 0px 0px .25rem;
}

/* Flips div for the next button containing the ^ symbol */
.icon-flipped {
    -moz-transform: scale(1, -1);
    -webkit-transform: scale(1, -1);
    -o-transform: scale(1, -1);
    -ms-transform: scale(1, -1);
    transform: scale(1, -1);
}

.question-iteration-icon {
    line-height: 1;
    font-weight: 1000;
    position: relative;
    top: 2px;
}

</style>