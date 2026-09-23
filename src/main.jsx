import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const questions = [
  {"id": "1", "text": "I see myself as someone who does a very thorough job."},
  {"id": "2", "text": "I see myself as someone who is a reliable worker."}
];

function App() {
  // State remembers the answer and tells React to update the screen.
  // null means the visitor has not selected an answer yet.

  const [answers, setAnswers] = useState({});
  const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];
  const answer = answers[currentQuestion.id] ?? null;

  return (
    <main>
      <header><a className="brand" href="/">hope<span>.</span></a><span>Find your direction</span></header>
      <section className="intro">
        <p className="eyebrow">A SELF-DISCOVERY YOU NEED</p>
        <h1>Your next chapter<br />starts with you.</h1>
        <p>Take a moment to reflect on how you work, what you enjoy, and where you feel at home.</p>
      </section>
      <section className="card" aria-label="Questionnaire prototype">
        <p className="eyebrow">Question {questionIndex + 1} of {questions.length}</p>
        <fieldset>
          <legend>{currentQuestion.text}</legend>
          <p id="scale-help">Choose the number that best describes you. There are no right or wrong answers.</p>
          <div className="choices" aria-describedby="scale-help">
            {choices.map((value) => (
              <label className="choice" key={value}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={value}
                  checked={answer === value}
                  onChange={() => {
                  setAnswers((previousAnswers) => {
                  return {
                  ...previousAnswers,
                  [currentQuestion.id]: value,
                  };
                  });
                  }}
                  aria-label={`${value} out of 10`}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
          <div className="scale-labels"><span>1 — Strongly disagree</span><span>10 — Strongly agree</span></div>
        </fieldset>
        <p className="answer" aria-live="polite">
          {answer === null ? 'Your answer will appear here.' : `Your answer: ${answer} / 10`}
        </p>
        <div className="navigation">
        <button type="button">Back</button>
        <button type="button">Next</button>
        </div>
      </section>
      <footer>Learning prototype · Answers reset when you refresh the page.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
