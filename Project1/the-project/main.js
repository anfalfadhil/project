console.log("I did it")
// going to need two pages
// page one has a text box and a button for player one to inpt the word and the word should be kept hidden no one can see it
// after p1 adds the word and press the button it will take them to page two
//page two has four sections:
// 1- for the incorrect letters
// 2- for the correct letters
// 3- section for the spaceship
// 4- for the timer and the scores
//5- for p2 to enter the wrong letters


//section for p2 to enter the letters
// section one (the wrong letters) will have to put them next to each others on the screen in that section
// section two (the correct letters) will have boxes as many letters there are in the word
// when p2 enters a correct letter it should appear in the correct position

// when they are all filled p2 wins

// section three( the spaceship )
// should be able to add new piece for evey wrong letter p2 provide
// when all the pieces are added and the boxes for the correct word are not full p2 loos.

//section four (the timer)
// will have a timer
// score section for p1 and p2

// at the the scores will pop up and a message with the result
// and every thing will be empty for the next round



//////////////////

let secretBoxes =[];
let globalLettersArray =[];
let picsArray = ['spaceship/0.jpg', 'spaceship/1.jpg', 'spaceship/1.jpg', 'spaceship/2.jpg', 'spaceship/3.jpg', 'spaceship/4.jpg', 'spaceship/5.jpg', 'spaceship/6.jpg', 'spaceship/7.jpg', 'spaceship/8.jpg', 'spaceship/9.jpg', 'spaceship/10.jpg', 'spaceship/11.jpg', 'spaceship/12.jpg', 'spaceship/13.jpg', 'spaceship/14.jpg', 'spaceship/15.jpg', 'spaceship/16.jpg', 'spaceship/17.jpg' ];
let img = document.createElement('img');
document.querySelector("body > div:nth-child(2) > div.spaceship").append(img);
img.src = 'spaceship/empty.jpg';
img.setAttribute('class', 'img');

let isInput = true;
const checkInput = () => {
   if (document.getElementById("input-box").value === '' ){
        alert('please enter a word first');
         isInput = true;
        
    } else {
        appendFuction;
    }
}

const appendFuction = () => {
    checkInput();
let enteredWord = document.getElementById("input-box").value.toLowerCase();
let lettersArray = enteredWord.split('');
globalLettersArray= lettersArray;
document.getElementById('input-box').value = '';
document.querySelector("body > div.first-container").style.visibility = "hidden";
document.querySelector("body > div:nth-child(2)").style.visibility = 'unset';
    for (let i = 0; i< lettersArray.length; i++) {
        let box = document.createElement('div');
        document.querySelector('.boxes').append(box);
        box.setAttribute('id', 'secret-letter');
        box.innerText = lettersArray[i];
        secretBoxes.push(box);
        console.log(secretBoxes);
    } 
} 

let enterButton = document.querySelector("body > div.first-container > div > form > button");
enterButton.onclick = appendFuction;

////////////////

let checkButton = document.querySelector("body > div.second-container > div.p2-input-container > form > button");
let indexes = [];
let mistakesCounter = 0;
let revealedLetters = [];

let endGame = () => {
    if ( mistakesCounter > 18) {
        mistakesCounter = 0;
        indexes = [];
        globalLettersArray = [];
        checkButton.remove();
    }
}

let checkEnd = () => {
    if ( globalLettersArray.every(element => revealedLetters.includes(element))) {
        console.log(revealedLetters); 
        console.log('p2 wins');
        checkButton.remove();
        let result = document.createElement('h1');
        result.setAttribute('class', 'result');
        document.querySelector("body > div.third-container").append(result);
        result.innerText = 'Player Two Wins, The spaceman is Gone';
        document.querySelector("body > div.second-container").style.opacity=    '0';
        document.querySelector("body > div.third-container").style.visibility = 'unset';
        endGame();
    } else if (mistakesCounter > 18) {
        let result = document.createElement('h1');
        result.setAttribute('class', 'result');
        document.querySelector("body > div.third-container").append(result);
        result.innerText = 'Player One Wins, The spaceman is Safe';
        document.querySelector("body > div.second-container").style.opacity= '0';
        document.querySelector("body > div.third-container").style.visibility = 'unset';
        endGame();
    }
} 

let checkingFunction = () => {
    let enteredLetter = document.querySelector(".p2-input-box").value.toLowerCase();
        if (globalLettersArray.includes(enteredLetter)){
            let index = globalLettersArray.indexOf(enteredLetter);
            console.log(index);
            console.log('match');
            console.log(secretBoxes);
            checkEnd();
            // to empty the input box after clicking on the button
            document.querySelector('.p2-input-box').value = '';
// https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array

                let getAllMatchingLetters = (array, letter) => {
                     i = -1;
                    while ((i = array.indexOf(letter, i+1)) != -1){
                        indexes.push(i);
                        revealedLetters.push(globalLettersArray[index]);
                    }
                    return indexes;
                }
                 getAllMatchingLetters(globalLettersArray, enteredLetter);
                for( let i=0; i< indexes.length; i++) {
                    secretBoxes[indexes[i]].style.color = 'white';
                    checkEnd();
                }  
        } else {
            img.src = 'spaceship/' + mistakesCounter +'.jpg'
            mistakesCounter ++; 
            document.querySelector("body > div.second-container > div.wrong-letters").append(enteredLetter, ", ");
            checkEnd();
            
        }
}

const playAgainFunction = () => {
    console.log('play again function');
    endGame();
    document.querySelector("body > div.third-container").style.visibility = 'hidden';
    document.querySelector("body > div.first-container").style.visibility = 'unset';
    document.querySelector("body > div:nth-child(2)").style.visibility = 'visible';
  
    enterButton.onclick = appendFuction;
    checkButton.onclick = checkingFunction;
    // document.querySelector("body > div.third-container").style.visibility = 'unset';
}
// checkInput();
checkButton.onclick = checkingFunction;
const playAgainButton = document.querySelector("body > div.third-container > button");
playAgainButton.onclick = playAgainFunction;






