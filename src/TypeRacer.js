import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './TypeRacer.css';

const prompt = "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.";

const TypeRacer = () => {
    
    const splitWords = prompt.split(" ");

    const handleChange = (e) => {

        const newChar = e.nativeEvent.data;

        if(newChar != " ") {
            SetCurrentWordInput(e.target.value);
            return;
        }

        const index = currentWordInput.length;
        //console.log(e);
        if(currentWordInput == (splitWords[wordCount])) {
            //Word is correct
            console.log("dasdsa");
            SetCompletedWords(completedWords.concat(splitWords[wordCount] + " "));
            SetWordCount(wordCount + 1);
            SetCurrentWordInput("");
            SetIncompleteWords(incompleteWords.slice(splitWords[wordCount].length + 1)) //To-do: When does wordCount get updated?
            
        }
        else {
            //
            console.log("TYPO");
        }

    }

    const [currentWordInput, SetCurrentWordInput] = useState("");
    const [completedWords, SetCompletedWords] = useState("");
    const [currentWordCompleted, SetCurrentWordCompleted] = useState("");
    const [currentWordIncomplete, SetCurrentWordIncomplete] = useState("");
    const [wordCount, SetWordCount] = useState(0);
    const [incompleteWords, SetIncompleteWords] = useState(prompt);

    return(
    <div>
        <div class="test-prompt">
            <p class="correct-words">{completedWords}</p>
            <p class="incomplete-words">{incompleteWords}</p>
        </div>
        <input 
            type="text"
            value={currentWordInput}
            onChange={handleChange}/>
    </div>);
};

export default TypeRacer;