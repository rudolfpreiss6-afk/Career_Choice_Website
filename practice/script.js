

const questions = [
    // Big Five: Conscientiousness
    {
        text: "I see myself as someone who does a very thorough job.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        text: "I see myself as someone who is a reliable worker.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        text: "I see myself as someone who tends to be lazy.",
        trait: "conscientiousness",
        reverse: true
    },

    // Big Five: Openness
    {
        text: "I see myself as someone who has an active imagination.",
        trait: "openness",
        reverse: false
    },
    {
        text: "I see myself as someone who is original and comes up with new ideas.",
        trait: "openness",
        reverse: false
    },
    {
        text: "I see myself as someone who has few artistic interests.",
        trait: "openness",
        reverse: true
    },

    // Big Five: Extraversion
    {
        text: "I see myself as someone who is outgoing and sociable.",
        trait: "extraversion",
        reverse: false
    },
    {
        text: "I see myself as someone who is full of energy.",
        trait: "extraversion",
        reverse: false
    },
    {
        text: "I see myself as someone who is reserved.",
        trait: "extraversion",
        reverse: true
    },

    // Big Five: Agreeableness
    {
        text: "I see myself as someone who is generally trusting.",
        trait: "agreeableness",
        reverse: false
    },
    {
        text: "I see myself as someone who is helpful and unselfish with others.",
        trait: "agreeableness",
        reverse: false
    },
    {
        text: "I see myself as someone who tends to find fault with others.",
        trait: "agreeableness",
        reverse: true
    },

    // Big Five: Neuroticism
    {
        text: "I see myself as someone who gets nervous easily.",
        trait: "neuroticism",
        reverse: false
    },
    {
        text: "I see myself as someone who worries a lot.",
        trait: "neuroticism",
        reverse: false
    },
    {
        text: "I see myself as someone who is relaxed and handles stress well.",
        trait: "neuroticism",
        reverse: true
    },

    // RIASEC: Investigative
    {
        text: "I would enjoy analyzing complex data to find hidden patterns.",
        trait: "investigative",
        reverse: false
    },
    {
        text: "I would enjoy developing a new scientific procedure or algorithm.",
        trait: "investigative",
        reverse: false
    },

    // RIASEC: Conventional
    {
        text: "I would enjoy keeping highly accurate, detailed records of business operations.",
        trait: "conventional",
        reverse: false
    },
    {
        text: "I would enjoy auditing financial systems to ensure absolute compliance.",
        trait: "conventional",
        reverse: false
    },

    // RIASEC: Realistic
    {
        text: "I would enjoy assembling complex hardware or electronic components.",
        trait: "realistic",
        reverse: false
    },
    {
        text: "I would enjoy operating and repairing heavy machinery or systems.",
        trait: "realistic",
        reverse: false
    },

    // RIASEC: Artistic
    {
        text: "I would enjoy designing artwork, layouts, or branding for a magazine.",
        trait: "artistic",
        reverse: false
    },
    {
        text: "I would enjoy writing original content, scripts, or creative copy.",
        trait: "artistic",
        reverse: false
    },

    // RIASEC: Enterprising
    {
        text: "I would enjoy starting, managing, and scaling my own business.",
        trait: "enterprising",
        reverse: false
    },
    {
        text: "I would enjoy negotiating contracts and persuading clients to close a deal.",
        trait: "enterprising",
        reverse: false
    },

    // RIASEC: Social
    {
        text: "I would enjoy counseling people who are dealing with personal or career problems.",
        trait: "social",
        reverse: false
    },
    {
        text: "I would enjoy teaching, mentoring, or training others on new skills.",
        trait: "social",
        reverse: false
    },

    // Work environment preferences
    {
        text: "I would much rather work entirely remotely from my own space than commute to collaborate in-person at a bustling office.",
        trait: "remote_vs_onsite",
        reverse: false
    },
    {
        text: "I prefer the fast-paced, unpredictable environment of a young startup over the structured, predictable stability of a large corporation.",
        trait: "startup_vs_corporate",
        reverse: false
    },
    {
        text: "I want to work in an English-speaking, internationally focused environment rather than a company built specifically for the local Czech market.",
        trait: "international_vs_local",
        reverse: false
    }
];

let current_question = 0;

const answers = [];

const question_text =
    document.querySelector(".question-card legend");           //connection question text

const question_counter =
    document.querySelector(".question-card > p");               // connection question counter UI

const next_button =
    document.getElementById("next-button");

const previous_button =
    document.getElementById("previous-button");

const radio_buttons =
    document.querySelectorAll('input[name="answer"]');


function showQuestion(index) {
    question_text.textContent = questions[index].text;

    question_counter.textContent =
        "Question " + (index + 1) + " of " + questions.length;    
    
        next_button.textContent =
        index === questions.length - 1 ? "Get results" : "Next";    //display of question and counter
}


function getSelectedAnswer() {
    const selected =
        document.querySelector('input[name="answer"]:checked');        // tracks radio input selection

    if (selected) {
        return Number(selected.value);
    }

    return null;
}


function saveCurrentAnswer() {
    const selected_answer = getSelectedAnswer();

    if (selected_answer !== null) {
        answers[current_question] = selected_answer;
        return true;
    }

    return false;
}


function restoreAnswer() {
    const saved_answer = answers[current_question];

    const radios =
        document.querySelectorAll('input[name="answer"]');

    radios.forEach(function(radio) {
        radio.checked =
            Number(radio.value) === saved_answer;                   //// wtf?????
    });
}

radio_buttons.forEach(function(radio) {
    radio.addEventListener("change", goToNextQuestion);
});


next_button.addEventListener("click", goToNextQuestion);

function goToNextQuestion () {
    const answer_was_saved = saveCurrentAnswer();

    if (!answer_was_saved) {
        return;
    }

    if (current_question < questions.length - 1) {
        current_question++;
        showQuestion(current_question);
        restoreAnswer();
    } else {
        getResults();
    }
}


previous_button.addEventListener("click", function() {

    saveCurrentAnswer();

    if (current_question > 0) {
        current_question--;
        showQuestion(current_question);
        restoreAnswer();
    }

});

function getResults() {
    next_button.textContent = "Get results";
    
    document.querySelector(".question-card").hidden = true;
    document.querySelector(".sub-explanations").hidden = true;
    document.querySelector(".secondary-sub-explanations").hidden = true;
    document.querySelector(".intro-section").hidden = true;
    document.getElementById("results").hidden = false;


    document.getElementById("results-content").textContent =
    "Your answers: " + answers.join(", ");
}

showQuestion(current_question);