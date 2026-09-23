# Hope: first working question

This milestone displays one question and remembers a selected answer while the page is open. It does not calculate results yet. The styling is a starting point, pending review of the Base44 reference.

## Run the website

Install a supported Node.js LTS release (with npm) from https://nodejs.org/ if your terminal does not recognize `node` or `npm`. Restart the VS Code terminal afterward.

In the repository folder, run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Keep the terminal running while you work; Ctrl+C stops the development server.

## How the files fit together

- `index.html` is the document the browser opens. Its root element is where React displays the app.
- `src/main.jsx` contains the question interface and its behavior. JSX lets us describe HTML-like structure inside JavaScript.
- `src/styles.css` controls colors, spacing, and layout.
- `package.json` lists the libraries and the commands used to run the project.
- `.gitignore` keeps installed libraries and generated build files out of Git.

## What happens when you choose 8?

1. The radio input triggers its `onChange` function.
2. `setAnswer(8)` updates React's state.
3. React updates the selected radio and the sentence below the question.

`useState(null)` starts with no answer. Refreshing the page starts the app again, so this answer is not saved permanently.

The `choices.map(...)` expression produces one radio input for each number. Native radio inputs also provide keyboard support: Tab enters the group, and arrow keys move through its options.

## Try a small change

Change the heading in `src/main.jsx`, save the file, and observe the browser update. Then change the background color in `src/styles.css`. These demonstrate the difference between content and presentation.

## Check the milestone

Select 1, then 10: the displayed answer and selection should agree. Try the keyboard and a narrow browser window. Refresh: the answer should reset.

`npm run build` creates the deployable website in `dist/`. `npm run preview` lets you inspect that build locally. Neither command publishes it online.

## Next milestone: two questions with Back/Next navigation

You will write this milestone yourself. The instructions below explain what to change and why, without supplying a finished implementation. Work through one step at a time, save, and check the browser before continuing.

The finished behavior should be:

- Show one question at a time, with “Question 1 of 2” or “Question 2 of 2”.
- Give each question its own answer from 1 to 10.
- Use Next and Back to move between questions without losing either answer.
- Disable Back on the first question and Next on the last question.

For this exercise, allow Next even when a question is unanswered. Refreshing will still clear all answers. Scoring, permanent storage, and a results page are later milestones.

### 1. Understand the file before editing it

Open `src/main.jsx`. Read it as three parts:

1. **Imports at the top:** these bring in React, the tool that attaches React to the page, and your stylesheet.
2. **The App function:** the part before `return` prepares data and behavior. The part inside `return` describes what appears on screen.
3. **The last line:** this attaches App to the root element in `index.html`. Leave it as it is.

JavaScript handles values and behavior. JSX is the HTML-like markup inside JavaScript. CSS handles appearance. A React component such as `App` is a function that returns JSX.

Some punctuation has different meanings depending on where it appears:

| Syntax | Meaning in this project |
| --- | --- |
| `const` | Gives a value a name that you cannot reassign. It does not make an object immutable. |
| `'text'` or `"text"` | A string: text treated as a value. |
| `[1, 2, 3]` | An array: an ordered list of values. |
| `{ id: 'example', text: 'Example text' }` | An object: a value with named properties. |
| `item.text` | Read the property called text from an object called item. |
| `items[0]` | Read the first item of an array. JavaScript counts positions from zero. |
| `function App() { ... }` | Braces enclosing the instructions in a function. |
| `{answer}` inside JSX | Insert a JavaScript value into the displayed markup. |
| `===` | Compare two values for equality; it does not assign a value. |
| `() => ...` | A small function, often used as an event handler. |

The examples in this table are vocabulary, not code to paste into the app.

**Try explaining:** Which file would you edit to change the question wording? Which would you edit to change the card's background?

### 2. Turn question wording into data

Currently the first question is written directly inside `<legend>`. You want one reusable question interface that can display different data.

Above the App function, below the imports, declare a constant called `questions`. Make its value an array containing two objects. Each object should have:

- `id`: a unique, stable string, such as `thoroughness` and `reliability`.
- `text`: the full question wording.

Use these questions from the README:

1. “I see myself as someone who does a very thorough job.”
2. “I see myself as someone who is a reliable worker.”

To construct the array, open square brackets, put an object inside braces for each question, and separate the objects with a comma. Inside each object, separate the properties with a comma. Each property name is followed by a colon and its value. Put quotation marks around text values.

Inside App, before `return`, create a constant called `currentQuestion` that reads the first object from `questions`. For now, use array position zero.

Replace the fixed wording inside the legend with a JSX expression that reads `currentQuestion.text`. Keep the legend tags themselves.

**Check:** The browser should look the same. Temporarily read array position one instead: the second question should appear. Return to position zero afterward. You have separated the data from its presentation.

### 3. Remember which question is visible

React **state** is memory that also tells React to update the screen when it changes. An ordinary variable does not provide that update mechanism.

Find the existing line that uses `useState`. Its square brackets give names to two things returned by React: the current value and a function that updates it. The initial value goes inside the parentheses after `useState`.

Add another state declaration inside App, before `currentQuestion`:

- Name its current value `questionIndex`.
- Name its updating function `setQuestionIndex`.
- Start it at zero.

Now make `currentQuestion` use `questionIndex` instead of a fixed array position. Keep state declarations at the top level of App, outside conditions and event handlers.

Replace “PERSONALITY · FIRST QUESTION PREVIEW” with a progress label. Display the current index plus one, followed by the total number of questions. Read the total using the array's `length` property so the label still works if you add more questions later.

**Check:** You should see the first question and “Question 1 of 2”. The index is zero internally; people see question number one.

### 4. Give each question its own answer

The current single `answer` state can remember only one number. If you reuse it for every question, selecting 8 on the first question will also appear to answer the second question with 8.

Replace that state declaration with state called `answers` and an updating function called `setAnswers`. Start it with an empty object. This object will associate each question's ID with its selected number.

For example, after answering the first question, the object would contain a property named `thoroughness` whose value is your selected number. After answering the second, it should contain both properties.

Create a derived constant named `answer`, below `currentQuestion`, that:

1. Looks up the current question's ID in `answers` using square brackets.
2. Falls back to `null` if that ID has no saved answer.






***finished progress for the day***


The JavaScript operator to look up for the fallback is **nullish coalescing**, written `??`. A missing object property gives `undefined`; converting it to `null` lets your existing “no answer yet” checks keep working. This derived value does not need its own state: it can be calculated from the other state each time App runs.

Next, change the radio input's `onChange` handler. It must update the answers object, rather than call the old `setAnswer` function. Build the update in this order:

1. Call `setAnswers` with a function that receives the previous answers object.
2. Inside that function, return a **new object**.
3. Copy the previous properties into it using **object spread**: three dots followed by the previous object's name.
4. After that copy, add the current question's ID as a property with the chosen `value`.

For step 4, the property name comes from a variable, so use a **computed property name**: put `currentQuestion.id` inside square brackets where the property name goes, then a colon, then the selected value.

Use an explicit `return` inside your updater function's braces if that is easier to read. Do not directly assign into the existing state object. Creating a new object preserves the other answers and lets React receive the updated value.

Finally, change the input's fixed `name` from `thoroughness` to an expression reading the current question's ID. All ten radio options for the visible question should share that name. Keep the existing labels, `checked` comparison, and keyboard focus styling.

**Check:** Select 8. The selected option and answer sentence should still agree. If you see “setAnswer is not defined”, find the remaining use of the old setter and update it.

### 5. Add navigation

Inside the question card, after the answer paragraph, add a container with two native `<button>` elements. Label them Back and Next, and give each `type="button"`. Give the container a class name such as `navigation`, using the JSX attribute `className`.

Each button needs an `onClick` handler:

- Back should use `setQuestionIndex` to subtract one from the previous index.
- Next should use `setQuestionIndex` to add one to the previous index.

Pass a function to `onClick`, following the pattern of the existing `onChange`. Do not call the setter immediately while constructing the JSX: the update must happen when someone clicks. Use the setter's function form to calculate the new index from the previous one.

Set each button's `disabled` attribute using a JavaScript comparison inside JSX braces:

- Back is disabled when the index equals zero.
- Next is disabled when the index equals the questions array's length minus one.

Use actual boolean expressions, not the string `"false"`. Native disabled buttons prevent clicks and communicate their disabled state to the browser. These boundaries keep the index inside the array.

**Check:** Answer the first question with 8, click Next, and confirm the second starts unanswered. Answer it with 3. Click Back: 8 should reappear. Click Next: 3 should reappear.

### 6. Style the navigation after it works

Open `src/styles.css`. A CSS rule consists of a **selector**, followed by braces containing **declarations**. Each declaration has a property name, a colon, a value, and a semicolon.

Read the existing `.card` rule as an example: `.card` selects elements whose class is card; `padding` adds space inside the element; `background` sets its background color.

Useful selectors in this file:

| Selector | What it selects |
| --- | --- |
| `button` | Every button element. |
| `.navigation` | Elements with the navigation class. |
| `.navigation button` | Buttons inside that container. |
| `.navigation button:disabled` | Those buttons when disabled. |
| `.navigation button:focus-visible` | Those buttons when the browser shows keyboard focus. |

Add your navigation rules before the existing `@media` block. The media block contains adjustments used when the screen is at most 600 pixels wide; leave those existing adjustments in place.

Write a container rule using `display: flex` to place the buttons in a row. Try `justify-content: space-between` to put them at opposite ends, `gap` to keep space between them, and `margin-top` to separate them from the answer text. Choose spacing values in `px` by looking at nearby rules.

Then write a button rule. Choose `padding`, `border`, `border-radius`, `background`, `color`, and `font: inherit` so the controls fit the existing card. Experiment with one declaration at a time and watch what changes.

Add a disabled rule that makes unavailable buttons visibly different, for example by lowering `opacity`. Keep the labels readable. Preserve a visible focus outline; you can follow the idea in the existing `:focus-visible` rule for the answer options. A visual disabled style does not replace the JSX `disabled` attribute.

**Check:** Narrow the browser window. Both buttons should fit without overlapping. Use Tab to reach an enabled button and Enter or Space to activate it. You should be able to see which control has focus.

### 7. Verify your milestone

Run this small manual test after saving:

1. Refresh: question 1 appears, no answer is selected, and Back is disabled.
2. Click Next without answering: question 2 appears unanswered, and Next is disabled.
3. Go Back and select 8. Go Next and select 3.
4. Move back and forth: each question retains its own number and the progress label agrees.
5. Change the first answer to 10: the second answer remains 3.
6. Use the keyboard and a narrow window to check the controls.
7. Refresh: both answers reset, as expected for this milestone.
8. Run `npm run build` in a second terminal. A successful build checks that the project can compile; the browser checks above verify its behavior.

If something breaks, read the first error in the browser or terminal and inspect the indicated line. Check matching brackets, closing JSX tags, and spelling first. An error involving the text property of `undefined` often means the question index has moved outside the array. If answering one question erases the other answer, check whether the state update copies the previous properties before adding the current one.

Before calling this done, explain in your own words: Why do we need both `questionIndex` and `answers`? Why can `currentQuestion` and `answer` be calculated instead of stored as separate state? Why does navigating preserve answers while refreshing clears them?
