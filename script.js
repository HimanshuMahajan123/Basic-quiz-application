document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");


    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain",
            ],
            answer: "William Shakespeare",
        },
    ];


    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            showResult();
        }
    })

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
    })

    function startQuiz() {
        startBtn.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        resultContainer.classList.add("hidden");

        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "";
        let answered = false;

        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            choicesList.appendChild(li);
            li.addEventListener('click', (e) => {
                const allChoices = choicesList.querySelectorAll("li");
                allChoices.forEach(choiceEl => choiceEl.classList.remove("select"));

                // Add 'select' to the clicked choice
                e.target.classList.add("select");

                // Check answer only once
                if (!answered) {
                    if(choice === questions[currentQuestionIndex].answer){
                        score++;
                        answered = true;
                    }
                }
                else{
                    answered = false;
                    score--;
                }
                nextBtn.classList.remove("hidden");
            });
        })
    }


    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");

        scoreDisplay.textContent = `${score} out of ${questions.length}`;

    }

})