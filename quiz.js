// ========================================
// NAVAL AIRCRAFT PERSONALITY QUIZ
// ========================================


// ========================================
// AIRCRAFT RESULTS
// ========================================

const aircraftResults = {

    th73: {
        name: "🚁 TH-73A — The Eager Overachiever",
        description: `
            You are the TH-73A: enthusiastic, determined, and approximately
            three seconds away from asking, "Wait... can you explain that again?"

            <br><br>

            You genuinely want to do well. You study. You prepare. You make plans.
            You may even make a color-coded study guide that you will absolutely
            never look at again.

            <br><br>

            You're still figuring things out, but somehow you've developed the
            confidence to say, "I got it" approximately 14 seconds before
            realizing you absolutely do not have it.

            <br><br>

            <strong>Your toxic trait:</strong> You think being stressed means
            you're being productive.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    mh60: {
        name: "🚁 MH-60 — The Problem Solver",
        description: `
            You are the MH-60.

            <br><br>

            Give you a problem and your immediate response is:

            <br><br>

            "Alright. What needs fixing?"

            <br><br>

            You are adaptable, competent, and suspiciously calm when everyone
            else is losing their minds. You don't necessarily need a perfect
            plan—you just need enough information to start making things happen.

            <br><br>

            You're the person everyone wants around when things get weird.

            <br><br>

            Unfortunately, this has led you to believe that every problem is
            your problem.

            <br><br>

            <strong>Your toxic trait:</strong> You say "I can handle it" when
            you absolutely should be delegating.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    mh65: {
        name: "🚁 MH-65 — The Calm Menace",
        description: `
            You are the MH-65.

            <br><br>

            On the outside: calm, professional, collected.

            <br><br>

            On the inside: feral raccoon with a checklist.

            <br><br>

            You somehow manage to stay composed when everything around you is
            falling apart, which is impressive considering your internal
            monologue is approximately 47 simultaneous emergency procedures.

            <br><br>

            You don't need everything to go according to plan. You just need
            everyone to stop making the situation worse.

            <br><br>

            <strong>Your toxic trait:</strong> You are convinced that
            "I've seen worse" is a legitimate coping mechanism.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    ch53: {
        name: "🚁 CH-53 — The Absolute Unit",
        description: `
            You are the CH-53.

            <br><br>

            You don't simply enter a situation.

            <br><br>

            <strong>You ARRIVE.</strong>

            <br><br>

            You have approximately 900% more confidence than necessary and have
            somehow convinced yourself that if something doesn't work, the
            solution is simply to apply more aircraft.

            <br><br>

            You're dependable, powerful, and surprisingly good at carrying
            everyone else's problems.

            <br><br>

            You are also completely incapable of admitting that you might be wrong.

            <br><br>

            <strong>Your toxic trait:</strong> Your solution to every problem is "more."

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    mv22b: {
        name: "✈️ MV-22B — The Weird One",
        description: `
            You are the MV-22B.

            <br><br>

            Nobody completely understands you.

            <br><br>

            Not even you.

            <br><br>

            You are versatile, adaptable, slightly chaotic, and somehow capable
            of making a completely reasonable situation unnecessarily complicated.

            <br><br>

            You thrive when the situation changes because apparently normal
            circumstances are boring.

            <br><br>

            People may question your methods.

            <br><br>

            You will simply tiltrotor away from them.

            <br><br>

            <strong>Your toxic trait:</strong> You genuinely believe that being
            complicated makes you interesting.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    uh1y: {
        name: "🚁 UH-1Y — The Reliable One",
        description: `
            You are the UH-1Y.

            <br><br>

            You show up.

            You do the job.

            You don't make a big deal about it.

            <br><br>

            You're the friend everyone calls because they know you'll actually
            answer the phone. You're dependable, practical, and just chaotic
            enough to keep things interesting.

            <br><br>

            You don't need to be the center of attention.

            <br><br>

            You'd rather quietly save the day and then pretend it wasn't
            a big deal.

            <br><br>

            <strong>Your toxic trait:</strong> You have accidentally become
            everyone's backup plan.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    e2d: {
        name: "📡 E-2D — The Human Spreadsheet",
        description: `
            You are the E-2D.

            <br><br>

            You know things.

            <br><br>

            Too many things.

            <br><br>

            You notice everything. You remember everything. You probably know
            exactly what happened three weeks ago at 1437 and have the
            documentation to prove it.

            <br><br>

            You're organized, analytical, and always approximately six steps
            ahead of everyone else.

            <br><br>

            The problem is that you have started expecting everyone else
            to keep up.

            <br><br>

            They will not.

            <br><br>

            <strong>Your toxic trait:</strong> You think saying "it's pretty
            straightforward" makes something straightforward.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    fa18: {
        name: "✈️ F/A-18 — The Main Character",
        description: `
            You are the F/A-18.

            <br><br>

            You have never met a problem that couldn't be solved with
            confidence, speed, and possibly unnecessary aggression.

            <br><br>

            You're competitive. You're capable. You like being good at things
            and you would prefer everyone know that you're good at things.

            <br><br>

            You walk into a room like the background music just changed.

            <br><br>

            And honestly?

            <br><br>

            Sometimes you deserve it.

            <br><br>

            <strong>Your toxic trait:</strong> You think confidence and
            competence are the same thing.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    p8: {
        name: "🛩️ P-8 — The Long-Game Enjoyer",
        description: `
            You are the P-8.

            <br><br>

            You are patient.

            You are analytical.

            You have accepted that some things take approximately eleven
            years longer than they should.

            <br><br>

            While everyone else is sprinting around trying to solve the problem
            immediately, you're sitting there drinking coffee thinking:

            <br><br>

            "Eventually, this will become my problem. I should probably
            understand it really well."

            <br><br>

            You're calm, methodical, and weirdly knowledgeable about things
            nobody else thought to ask about.

            <br><br>

            <strong>Your toxic trait:</strong> You can turn a five-minute
            explanation into a 45-minute lecture.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    },


    c130: {
        name: "✈️ C-130 — The One Carrying Everyone",
        description: `
            You are the C-130.

            <br><br>

            You're dependable.

            You're practical.

            You're somehow carrying everyone's crap and nobody has bothered
            to ask if you're okay.

            <br><br>

            You're the person everyone relies on because you always seem to
            get the job done. You don't need the spotlight. You just need
            enough coffee and approximately 14 business days to accomplish
            whatever ridiculous task has been assigned to you.

            <br><br>

            You are the definition of "fine, I'll do it."

            <br><br>

            <strong>Your toxic trait:</strong> You keep saying yes because you
            secretly enjoy being indispensable.

            <br><br>

            <strong>Now that you know, GO STUDY YOU FOOL</strong>
        `
    }

};


// ========================================
// QUIZ QUESTIONS
// ========================================

const questions = [

    // QUESTION 1
    {
        text: "🎵 What would your walk-up song be?",
        answers: [
            {
                text: "Danger Zone",
                scores: { fa18: 3, th73: 1 }
            },
            {
                text: "In The Air Tonight",
                scores: { mh60: 2, p8: 2 }
            },
            {
                text: "Free Bird",
                scores: { mh60: 2, c130: 1 }
            },
            {
                text: "The Imperial March",
                scores: { e2d: 3, p8: 1 }
            },
            {
                text: "Something completely unhinged that nobody else understands",
                scores: { mv22b: 3, mh65: 2 }
            }
        ]
    },


    // QUESTION 2
    {
        text: "🧠 What aviation thing scratches your brain just right?",
        answers: [
            {
                text: "Watching rotor blades spool up",
                scores: { uh1y: 3, mh65: 1 }
            },
            {
                text: "Listening to an engine start",
                scores: { fa18: 2, ch53: 2 }
            },
            {
                text: "That beautiful turbine winding-down sound",
                scores: { mh60: 2, c130: 1 }
            },
            {
                text: "Watching someone absolutely nail a landing",
                scores: { th73: 3, p8: 1 }
            },
            {
                text: "Hearing an absolutely CRISP radio call",
                scores: { e2d: 2, fa18: 1 }
            }
        ]
    },


    // QUESTION 3
    {
        text: "🔥 What's your biggest aviation hot take?",
        answers: [
            {
                text: "Fixed-wing pilots are just helicopter pilots who haven't discovered the joy of hovering.",
                scores: { uh1y: 3, mh65: 2 }
            },
            {
                text: "If you need more than three acronyms to explain it, it's probably too complicated.",
                scores: { e2d: 3, p8: 2 }
            },
            {
                text: "Cockpit coffee is a required aircraft system.",
                scores: { c130: 3, mh60: 2 }
            },
            {
                text: "“Stand by” is aviation's way of saying “I have absolutely no idea.”",
                scores: { mv22b: 3, fa18: 1 }
            },
            {
                text: "There is no such thing as a “quick flight.”",
                scores: { ch53: 3, th73: 1 }
            }
        ]
    },


    // QUESTION 4
    {
        text: "🕶️ On a scale of 1–10, how much do you love Top Gun?",
        answers: [
            {
                text: "1 — I actively resent it.",
                scores: { e2d: 3 }
            },
            {
                text: "5 — I'll watch it if it's on.",
                scores: { uh1y: 2, mh60: 1 }
            },
            {
                text: "7 — It's objectively terrible and I know every line.",
                scores: { mh65: 2, mv22b: 1 }
            },
            {
                text: "9 — I have quoted it during training.",
                scores: { th73: 2, fa18: 2 }
            },
            {
                text: "10 — I am legally required to stand when Danger Zone starts.",
                scores: { fa18: 4, ch53: 1 }
            }
        ]
    },


    // QUESTION 5
    {
        text: "📻 ATC says something you absolutely did not catch. What do you do?",
        answers: [
            {
                text: "Ask for a repeat like a responsible adult.",
                scores: { th73: 3, p8: 1 }
            },
            {
                text: "Pretend I heard it and hope context saves me.",
                scores: { fa18: 3, mv22b: 1 }
            },
            {
                text: "Wait three seconds hoping someone else answers.",
                scores: { c130: 2, uh1y: 2 }
            },
            {
                text: "Stare at the radio like it personally betrayed me.",
                scores: { mh65: 3, ch53: 1 }
            },
            {
                text: "Look at the other pilot like they definitely heard it.",
                scores: { mh60: 2, mv22b: 2 }
            }
        ]
    },


    // QUESTION 6
    {
        text: "☠️ What is the most toxic pilot phrase?",
        answers: [
            {
                text: "“It's just a quick flight.”",
                scores: { c130: 3, uh1y: 1 }
            },
            {
                text: "“I've done this before.”",
                scores: { fa18: 3, ch53: 2 }
            },
            {
                text: "“Watch this.”",
                scores: { mv22b: 3, mh65: 1 }
            },
            {
                text: "“It'll be fine.”",
                scores: { mh60: 3, uh1y: 1 }
            },
            {
                text: "“We have plenty of gas.”",
                scores: { p8: 3, c130: 2 }
            }
        ]
    },


    // QUESTION 7
{
    text: "😨 What scares you most?",
    answers: [
        {
            text: "Realizing I forgot something immediately after takeoff.",
            scores: { th73: 3, uh1y: 2 }
        },
        {
            text: "Sharks.",
            scores: { mh65: 3, ch53: 1 }
        },
        {
            text: "Hearing, “We will talk about that when we get back.”",
            scores: { e2d: 3, p8: 2 }
        },
        {
            text: "Saying “good morning” to the CO when it's well into the afternoon.",
            scores: { fa18: 3, mv22b: 2 }
        },
        {
            text: "Catching strays from anyone and everyone.",
            scores: { mh60: 3, c130: 2 }
        }
    ]
},


    // QUESTION 8
    {
        text: "🔄 Your instructor says, “Let's do that again.” What does your brain hear?",
        answers: [
            {
                text: "No big deal.",
                scores: { uh1y: 3, mh60: 1 }
            },
            {
                text: "I have failed.",
                scores: { th73: 3, mh65: 1 }
            },
            {
                text: "Interesting. What did I screw up?",
                scores: { e2d: 3, p8: 1 }
            },
            {
                text: "Okay. ROUND TWO.",
                scores: { fa18: 3, ch53: 2 }
            },
            {
                text: "Act like I totally know why we're doing it again.",
                scores: { mv22b: 2, c130: 2 }
            }
        ]
    },


    // QUESTION 9
{
    text: "🛫 What is your preflight personality?",
    answers: [
        {
            text: "Silent and focused.",
            scores: { e2d: 3, p8: 2 }
        },
        {
            text: "Talking through absolutely everything out loud.",
            scores: { th73: 3, c130: 2 }
        },
        {
            text: "Making jokes until someone tells me to stop.",
            scores: { uh1y: 3, mh60: 2 }
        },
        {
            text: "Checking the same thing approximately 47 times.",
            scores: { mh65: 3, p8: 2 }
        },
        {
            text: "I somehow turn a 10-minute preflight into a full archaeological expedition.",
            scores: { mv22b: 3, ch53: 2 }
        }
    ]
},


    // QUESTION 10
    {
        text: "⏰ Your alarm goes off for a 0500 brief. What happens next?",
        answers: [
            {
                text: "I'm already awake. I've been awake since 0330.",
                scores: { e2d: 3, p8: 2 }
            },
            {
                text: "Snooze. Snooze. Snooze. OH GOD.",
                scores: { mv22b: 3, fa18: 1 }
            },
            {
                text: "I immediately start mentally reviewing everything I need to do.",
                scores: { th73: 3, mh60: 1 }
            },
            {
                text: "I stare at the ceiling questioning every decision that led me here.",
                scores: { mh65: 3, c130: 1 }
            },
            {
                text: "Somehow I'm dressed, caffeinated, and functioning before my brain has loaded.",
                scores: { uh1y: 3, ch53: 2 }
            }
        ]
    },


    // QUESTION 11
    {
        text: "📚 How do you study the night before an important check?",
        answers: [
            {
                text: "Planned, organized review.",
                scores: { e2d: 3, p8: 2 }
            },
            {
                text: "Study until I physically cannot anymore.",
                scores: { th73: 3, ch53: 1 }
            },
            {
                text: "Suddenly become an expert at cleaning my room.",
                scores: { mv22b: 3, mh65: 1 }
            },
            {
                text: "Stare at the gouge until words stop having meaning.",
                scores: { fa18: 2, c130: 2 }
            },
            {
                text: "Convince myself that sleeping is actually part of studying.",
                scores: { uh1y: 2, mh60: 2 }
            }
        ]
    },


    // QUESTION 12
    {
        text: "🫠 Something completely unexpected happens. What's your first reaction?",
        answers: [
            {
                text: "Fix the problem.",
                scores: { mh60: 3, uh1y: 1 }
            },
            {
                text: "Figure out why it happened.",
                scores: { e2d: 3, p8: 2 }
            },
            {
                text: "Look at whoever is next to me.",
                scores: { mh65: 2, mv22b: 2 }
            },
            {
                text: "Say, “Well, that's not ideal.”",
                scores: { c130: 3, th73: 1 }
            },
            {
                text: "Immediately start making a backup plan.",
                scores: { ch53: 3, th73: 1 }
            }
        ]
    },


    // QUESTION 13
    {
        text: "🎤 You have to brief something you've studied approximately 900 times. How do you do it?",
        answers: [
            {
                text: "Extremely professionally.",
                scores: { e2d: 3, p8: 1 }
            },
            {
                text: "Confidently... perhaps slightly too confidently.",
                scores: { fa18: 3, ch53: 1 }
            },
            {
                text: "Like I'm discovering the information alongside the audience.",
                scores: { th73: 3, mv22b: 1 }
            },
            {
                text: "Like I'm personally offended that anyone asked.",
                scores: { mh65: 3, c130: 1 }
            },
            {
                text: "I somehow turn it into a 20-minute TED Talk.",
                scores: { p8: 3, e2d: 1 }
            }
        ]
    },


    // QUESTION 14
    {
        text: "💪 What is your greatest aviation strength?",
        answers: [
            {
                text: "Staying calm.",
                scores: { mh60: 3, mh65: 2 }
            },
            {
                text: "Knowing random information nobody asked for.",
                scores: { e2d: 3, p8: 2 }
            },
            {
                text: "Being adaptable.",
                scores: { mv22b: 3, uh1y: 1 }
            },
            {
                text: "Making everyone laugh when things get stressful.",
                scores: { c130: 3, ch53: 1 }
            },
            {
                text: "Being extremely confident for absolutely no reason.",
                scores: { fa18: 3, ch53: 2 }
            }
        ]
    },


    // QUESTION 15
    {
        text: "🙋 Someone asks for a volunteer. What do you do?",
        answers: [
            {
                text: "Immediately raise my hand. I have no fear.",
                scores: { fa18: 3, ch53: 2 }
            },
            {
                text: "Make aggressive eye contact with the floor.",
                scores: { mh65: 3, c130: 1 }
            },
            {
                text: "Wait to see if someone else volunteers, then suddenly become extremely interested in something else.",
                scores: { p8: 3, e2d: 1 }
            },
            {
                text: "Raise my hand and immediately regret it.",
                scores: { th73: 3, mv22b: 1 }
            },
            {
                text: "Volunteer because apparently I enjoy making my own problems.",
                scores: { mh60: 3, uh1y: 2 }
            }
        ]
    }

];


// ========================================
// QUIZ STATE
// ========================================

let currentQuestion = 0;

let scores = {
    th73: 0,
    mh60: 0,
    mh65: 0,
    ch53: 0,
    mv22b: 0,
    uh1y: 0,
    e2d: 0,
    fa18: 0,
    p8: 0,
    c130: 0
};


// ========================================
// GET HTML ELEMENTS
// ========================================

const startButton = document.getElementById("start-quiz-button");

const quizStart = document.getElementById("quiz-start");

const quizQuestion = document.getElementById("quiz-question");

const quizResult = document.getElementById("quiz-result");

const quizProgress = document.getElementById("quiz-progress");

const questionText = document.getElementById("question-text");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-question-button");

const restartButton = document.getElementById("restart-quiz-button");

const resultAircraft = document.getElementById("result-aircraft");

const resultDescription = document.getElementById("result-description");


// ========================================
// START QUIZ
// ========================================

startButton.addEventListener("click", startQuiz);


function startQuiz() {

    currentQuestion = 0;

    scores = {
        th73: 0,
        mh60: 0,
        mh65: 0,
        ch53: 0,
        mv22b: 0,
        uh1y: 0,
        e2d: 0,
        fa18: 0,
        p8: 0,
        c130: 0
    };

    quizStart.hidden = true;

    quizResult.hidden = true;

    quizQuestion.hidden = false;

    showQuestion();
}


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    const question = questions[currentQuestion];

    quizProgress.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent = question.text;

    answerButtons.innerHTML = "";

    nextButton.hidden = true;

    question.answers.forEach((answer) => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("quiz-answer");

        button.addEventListener("click", () => {

            selectAnswer(answer, button);

        });

        answerButtons.appendChild(button);

    });
}


// ========================================
// SELECT ANSWER
// ========================================

function selectAnswer(answer, selectedButton) {

    // Remove the selected styling from all answers
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.classList.remove("selected");
    });

    // Highlight the answer currently selected
    selectedButton.classList.add("selected");

    // Remember which answer is currently selected
    answerButtons.dataset.selectedAnswer = JSON.stringify(answer.scores);

    // Change button text on final question
    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "See My Aircraft ✈️";

    } else {

        nextButton.textContent = "Next Question →";

    }

    // Show the next button
    nextButton.hidden = false;
}


// ========================================
// NEXT QUESTION
// ========================================

nextButton.addEventListener("click", nextQuestion);


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}


// ========================================
// CALCULATE RESULT
// ========================================

function showResult() {

    quizQuestion.hidden = true;

    quizResult.hidden = false;


    let winningAircraft = null;

    let highestScore = -Infinity;


    for (const aircraft in scores) {

        if (scores[aircraft] > highestScore) {

            highestScore = scores[aircraft];

            winningAircraft = aircraft;

        }

    }


    const result = aircraftResults[winningAircraft];


    resultAircraft.textContent = result.name;

    resultDescription.innerHTML = result.description;
}


// ========================================
// RESTART QUIZ
// ========================================

restartButton.addEventListener("click", () => {

    quizResult.hidden = true;

    quizStart.hidden = false;

});