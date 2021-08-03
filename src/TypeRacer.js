import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './TypeRacer.css';

const prompt = "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.";

const TypeRacer = () => {
    
    const splitWords = prompt.split(" ");

    const handleChange = (e) => {

        const newChar = e.nativeEvent.data;
        console.log(newChar);
        if(newChar === null){

            if(currentWordIncorrectChars) {
                SetCurrentWordIncorrectChars(currentWordIncorrectChars.slice(0,currentWordIncorrectChars.length-1));
                SetCurrentWordInput(currentWordInput.slice(0,currentWordInput.length-1));
                SetCharCount(charCount === 0 ? 0 : charCount-1);
                return;
            }

            //Backspace pressed
            SetCurrentWordInput(currentWordInput.slice(0,currentWordInput.length-1));
            SetCurrentWordCompletedChars(currentWordCompletedChars.slice(0,currentWordCompletedChars.length-1));
            SetCurrentWordIncompleteChars(currentWordCompletedChars.slice(-1) + currentWordIncompleteChars);
            SetCharCount(charCount === 0 ? 0 : charCount-1);
            return;
        }

        if(newChar != " ") {

            if(currentWordIncorrectChars) {
                //if there's any typos already, the next character is automatically a typo
                SetCurrentWordIncorrectChars(currentWordIncorrectChars.concat(newChar));
                SetCurrentWordInput(e.target.value);
                SetCharCount(charCount+1);
                return;
            }

            //User entered correct character
            if(newChar === splitWords[wordCount][charCount]) {
                SetCurrentWordIncompleteChars(splitWords[wordCount].slice(charCount + 1));
                SetCurrentWordInput(e.target.value);
                SetCurrentWordCompletedChars(currentWordCompletedChars.concat(newChar));
                SetCharCount(charCount + 1);
                return;
            }
            else {
                //user entered wrong character
                SetCurrentWordIncorrectChars(currentWordIncorrectChars.concat(newChar));
                SetCurrentWordInput(e.target.value);
                SetCharCount(charCount+1);
                return;
            }
        }

        if(currentWordInput == (splitWords[wordCount])) {
            //Word is correct
            SetCompletedWords(completedWords.concat(splitWords[wordCount] + " "));
            SetWordCount(wordCount + 1);
            SetCurrentWordInput("");
            SetIncompleteWords(incompleteWords.slice(splitWords[wordCount + 1].length + 1)) //To-do: When does wordCount get updated?
            SetCharCount(0);
            SetCurrentWordCompletedChars("");
            SetCurrentWordIncompleteChars(splitWords[wordCount+1]);
        }

    }

    const [currentWordInput, SetCurrentWordInput] = useState("");
    const [completedWords, SetCompletedWords] = useState("");
    const [currentWordCompletedChars, SetCurrentWordCompletedChars] = useState("");
    const [currentWordIncorrectChars, SetCurrentWordIncorrectChars] = useState("");
    const [currentWordIncompleteChars, SetCurrentWordIncompleteChars] = useState(splitWords[0]);
    const [wordCount, SetWordCount] = useState(0);
    const [incompleteWords, SetIncompleteWords] = useState(prompt.slice(splitWords[0].length));
    const [charCount, SetCharCount] = useState(0);

    return(
    <div>
        <div class="test-prompt">
            <p class="correct-words">{completedWords}</p>
            <p class="current-word-correct">{currentWordCompletedChars}</p>
            <p class="current-word-incorrect">{currentWordIncorrectChars}</p>
            <p class="current-word-incomplete">{currentWordIncompleteChars}</p>
            <p class="incomplete-words">{incompleteWords}</p>
        </div>
        <input 
            type="text"
            value={currentWordInput}
            onChange={handleChange}/>
    </div>);
};

export default TypeRacer;