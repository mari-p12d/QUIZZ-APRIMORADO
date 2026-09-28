/* =========================================
   QUIZ NAIL DESIGN
========================================= */

const questions = [

    {
        question: "Qual formato de unha é conhecido por ter laterais retas e uma ponta reta?",
        answers: [
            "Stiletto",
            "Quadrada",
            "Amendoada",
            "Bailarina"
        ],
        correct: 1
    },

    {
        question: "Qual técnica utiliza um molde para construir e alongar a unha com gel?",
        answers: [
            "Alongamento em gel",
            "Esmaltação comum",
            "Nail art",
            "Francesinha"
        ],
        correct: 0
    },

    {
        question: "Qual formato possui uma ponta fina e alongada, semelhante a uma ponta de lança?",
        answers: [
            "Oval",
            "Squoval",
            "Stiletto",
            "Quadrada"
        ],
        correct: 2
    },

    {
        question: "Na nail art, o que é uma francesinha?",
        answers: [
            "Uma decoração feita somente com glitter",
            "Uma técnica com a ponta da unha destacada",
            "Um tipo de alongamento",
            "Uma técnica para remover cutículas"
        ],
        correct: 1
    },

    {
        question: "Qual produto é utilizado para preparar a superfície da unha antes de determinados procedimentos de alongamento?",
        answers: [
            "Top coat",
            "Primer",
            "Óleo secante",
            "Esmalte cremoso"
        ],
        correct: 1
    },

    {
        question: "Qual formato de unha lembra visualmente o formato de uma amêndoa?",
        answers: [
            "Amendoada",
            "Quadrada",
            "Bailarina",
            "Coffin"
        ],
        correct: 0
    },

    {
        question: "Qual produto normalmente é utilizado para finalizar e proporcionar brilho à esmaltação em gel?",
        answers: [
            "Primer",
            "Top coat",
            "Desidratador",
            "Removedor"
        ],
        correct: 1
    },

    {
        question: "O que caracteriza principalmente o formato bailarina?",
        answers: [
            "Ponta totalmente arredondada",
            "Laterais muito largas e ponta redonda",
            "Laterais afinadas e ponta reta",
            "Formato curto e totalmente quadrado"
        ],
        correct: 2
    },

    {
        question: "Qual é uma finalidade importante da preparação adequada da unha natural?",
        answers: [
            "Melhorar a aderência dos produtos",
            "Deixar a unha permanentemente maior",
            "Mudar a cor natural da unha",
            "Eliminar completamente a necessidade de manutenção"
        ],
        correct: 0
    },

    {
        question: "Qual item é especialmente utilizado para criar detalhes e desenhos delicados na nail art?",
        answers: [
            "Pincel fino",
            "Alicate de cutícula",
            "Lixa banana",
            "Palito de madeira"
        ],
        correct: 0
    }

];


/* =========================================
   ELEMENTOS
========================================= */

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("next-button");

const currentQuestionElement =
    document.getElementById("current-question");

const totalQuestionsElement =
    document.getElementById("total-questions");

const progressFill =
    document.getElementById("progress-fill");

const progressPercent =
    document.getElementById("progress-percent");

const quizCard =
    document.getElementById("quiz-card");

const resultCard =
    document.getElementById("result-card");

const scoreElement =
    document.getElementById("score");

const resultTitle =
    document.getElementById("result-title");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-button");


/* =========================================
   VARIÁVEIS
========================================= */

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let answerLocked = false;


/* =========================================
   CONFIGURAÇÃO INICIAL
========================================= */

totalQuestionsElement.textContent =
    questions.length;


/* =========================================
   CARREGAR PERGUNTA
========================================= */

function loadQuestion() {

    selectedAnswer = null;

    answerLocked = false;

    nextButton.disabled = true;

    const question = questions[currentQuestion];

    questionElement.textContent =
        question.question;

    currentQuestionElement.textContent =
        currentQuestion + 1;

    const percentage =
        Math.round(
            ((currentQuestion + 1) /
            questions.length) * 100
        );

    progressFill.style.width =
        percentage + "%";

    progressPercent.textContent =
        percentage + "%";

    answersElement.innerHTML = "";

    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.classList.add(
                "answer-button"
            );

            const letter =
                document.createElement("span");

            letter.classList.add(
                "answer-letter"
            );

            letter.textContent =
                String.fromCharCode(
                    65 + index
                );

            const text =
                document.createElement("span");

            text.textContent =
                answer;

            button.appendChild(letter);

            button.appendChild(text);

            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );

            answersElement.appendChild(
                button
            );
        }
    );

    quizCard.style.animation = "none";

    void quizCard.offsetWidth;

    quizCard.style.animation =
        "cardIn 0.45s ease";
}


/* =========================================
   SELECIONAR RESPOSTA
========================================= */

function selectAnswer(index, button) {

    if (answerLocked) {
        return;
    }

    selectedAnswer = index;

    document
        .querySelectorAll(".answer-button")
        .forEach(btn => {
            btn.classList.remove(
                "selected"
            );
        });

    button.classList.add("selected");

    nextButton.disabled = false;
}


/* =========================================
   PRÓXIMA PERGUNTA
========================================= */

nextButton.addEventListener(
    "click",
    () => {

        if (
            selectedAnswer === null ||
            answerLocked
        ) {
            return;
        }

        answerLocked = true;

        const correctAnswer =
            questions[currentQuestion].correct;

        const buttons =
            document.querySelectorAll(
                ".answer-button"
            );

        /* Mostra a resposta correta */

        buttons[
            correctAnswer
        ].classList.add("correct");

        /* Mostra erro caso necessário */

        if (
            selectedAnswer !==
            correctAnswer
        ) {

            buttons[
                selectedAnswer
            ].classList.add("wrong");

        } else {

            score++;

        }

        nextButton.disabled = true;

        nextButton.innerHTML =
            "Carregando...";

        setTimeout(
            () => {

                currentQuestion++;

                if (
                    currentQuestion >=
                    questions.length
                ) {

                    showResult();

                } else {

                    nextButton.innerHTML =
                        'Próxima pergunta <span>→</span>';

                    loadQuestion();

                }

            },
            850
        );
    }
);


/* =========================================
   MOSTRAR RESULTADO
========================================= */

function showResult() {

    quizCard.classList.add(
        "hidden"
    );

    resultCard.classList.remove(
        "hidden"
    );

    scoreElement.textContent =
        score;

    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultTitle.textContent =
            "Nail Designer Expert! ✨";

        resultMessage.textContent =
            "Incrível! Você demonstrou um excelente conhecimento sobre Nail Design. Suas respostas mostram que você entende muito bem técnicas, formatos e produtos.";

    }

    else if (percentage >= 70) {

        resultTitle.textContent =
            "Você arrasou! 💗";

        resultMessage.textContent =
            "Você tem um ótimo conhecimento sobre Nail Design. Com um pouco mais de prática, pode dominar ainda mais técnicas.";

    }

    else if (percentage >= 50) {

        resultTitle.textContent =
            "Está no caminho certo! 🌸";

        resultMessage.textContent =
            "Você já conhece vários conceitos de Nail Design. Continue estudando e praticando para evoluir cada vez mais.";

    }

    else {

        resultTitle.textContent =
            "Hora de praticar! 💅";

        resultMessage.textContent =
            "Não desanime! O Nail Design possui muitos detalhes. Continue aprendendo e praticando para melhorar seu conhecimento.";

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   REINICIAR
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        selectedAnswer = null;

        answerLocked = false;

        resultCard.classList.add(
            "hidden"
        );

        quizCard.classList.remove(
            "hidden"
        );

        nextButton.innerHTML =
            'Próxima pergunta <span>→</span>';

        loadQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================
   INICIAR
========================================= */

loadQuestion();
