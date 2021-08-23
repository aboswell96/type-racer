import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './TypeRacer.css';

const prompt = "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.";

const TypeRacer = () => {
    
    const splitWords = prompt.split(" ");

    const handleChange = (e) => {

        const newChar = e.nativeEvent.data;
        if(newChar === null){

            if(currentWordIncorrectChars) {
                //more typos than the length of the current word
                if(charCount > splitWords[wordCount].length) {
                    SetCurrentWordIncorrectChars(currentWordIncorrectChars.slice(0,currentWordIncorrectChars.length-1));
                    SetIncompleteWords(currentWordIncorrectChars.slice(-1).concat(incompleteWords));
                    SetCharCount(charCount === 0 ? 0 : charCount-1);
                    SetCurrentWordInput(currentWordInput.slice(0,currentWordInput.length-1));
                    return;
                } else {
                    //current user input is shorter than the current prompt word
                    SetCurrentWordIncorrectChars(currentWordIncorrectChars.slice(0,currentWordIncorrectChars.length-1));
                    SetCurrentWordIncompleteChars(currentWordIncorrectChars.slice(-1).concat(currentWordIncompleteChars));
                    SetCharCount(charCount === 0 ? 0 : charCount-1);
                    SetCurrentWordInput(currentWordInput.slice(0,currentWordInput.length-1));
                    return;
                }

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
                //user entered wrong character
                if(charCount < splitWords[wordCount].length) {
                    //typo is within the current word length
                    SetCurrentWordIncorrectChars(currentWordIncorrectChars.concat(splitWords[wordCount][charCount]));
                    SetCurrentWordIncompleteChars(currentWordIncompleteChars.slice(1));
                }
                else {
                    //typos have spilled into the incomplete words
                    SetIncompleteWords(incompleteWords.slice(1));
                    SetCurrentWordIncorrectChars(currentWordIncorrectChars.concat(incompleteWords[0]));
                }
            
                SetCurrentWordInput(e.target.value);
                SetCharCount(charCount+1);
                return;
            }

            if(charCount >= splitWords[wordCount].length) {
                //typed too many chars - doesn't matter what character it's automatically an error
                console.log(incompleteWords[0]);
                SetCurrentWordIncorrectChars(incompleteWords[0].concat(currentWordIncorrectChars));
                SetIncompleteWords(incompleteWords.slice(1));
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
                if(charCount < splitWords[wordCount].length) {
                    //still in the current word
                    SetCurrentWordIncorrectChars(currentWordIncorrectChars.concat(splitWords[wordCount][charCount]));
                    SetCurrentWordIncompleteChars(currentWordIncompleteChars.slice(1));
                }
                else {
                    //typos are longer than the current word length
                    SetIncompleteWords(incompleteWords.slice(1));
                }
            
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
            class="input__field"
            type="text"
            value={currentWordInput}
            onChange={handleChange}/>
    </div>);
};

export default TypeRacer;