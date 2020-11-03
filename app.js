const choice = ["rock","paper","scissors"]

window.onload = ()=>{
    document.querySelector('.button-container').addEventListener('click',findWinner)
    
}

computerChoice = () => choice[Math.floor(Math.random() * choice.length)]


function findWinner(e){
    
    if(e.target.classList.contains("btn-circle")){
        
        const userChoice = e.target.getAttribute('data-choice');
        const appChoice =  computerChoice();
        getWinner(userChoice,appChoice)
    
    }
}


function getWinner(userChoice,appChoice){
    
    if(userChoice === appChoice){
        renderDom(userChoice,appChoice,true,true)
        
    }
        
    else
    if( userChoice === 'scissors' && appChoice === 'paper' ||
        userChoice === 'paper' && appChoice === 'rock' ||
        userChoice === 'rock' && appChoice === 'scissors'){
            renderDom(userChoice,appChoice,true,false)
            updateScore('user')
        }
        
    else{
        renderDom(userChoice,appChoice,false,true)
        updateScore('computer')
    }
        
}

function renderDom(userChoice,appChoice,userWins,compWins){
    const btnContainer = document.querySelector('.button-container');
    const resultContainer = document.querySelector('.result-container');
    
    btnContainer.classList.toggle('hide')
    resultContainer.innerHTML = 
                                `
                                <div class="left">
                                <div class="pick-heading">
                                    You Picked
                                </div>
                                <div class="button-${userChoice} result-btn  ${(userWins)?`winner`:``}">
                                    <button class="btn-circle">
                                        <img src="images/icon-${userChoice}.svg" />
                                    </button>
                                </div>
                                </div>
                                <div class="result">
                                    
                                </div>
                                <div class="right">
                                    <div class="pick-heading">
                                        The House Picked
                                    </div>
                                    <div class="button-${appChoice} result-btn ${(compWins)?`winner`:``}">
                                        <button class="btn-circle">
                                            <img src="images/icon-${appChoice}.svg" />
                                        </button>
                                    </div>
                                </div>
                                `
    resultContainer.classList.toggle('hide')
    resultContainer.addEventListener('animationend',function(){
            const resultBox = document.querySelector('.result')
            resultBox.innerHTML = 
                                    ` 
                                    <div id = "winning-message" class="winning-message">
                                        ${
                                            (userWins && compWins)?"DRAW":(userWins)?"YOU WIN":"YOU LOOSE"
                                        }
                                    </div>
                                    <div>
                                        <button class="playBtn">Play Again</button>
                                    </div>
                                    `
        document.querySelector('.playBtn').addEventListener('click',()=>{
            resultContainer.innerHTML = "";
            resultContainer.classList.toggle('hide');
            btnContainer.classList.toggle('hide')
        });
        })
        
    
}

function updateScore(winner){
    const scoreContainer = document.getElementById('score')
    let currentScore = scoreContainer.textContent

    if(winner === 'draw'){
        
    }
    else
    if(winner === 'user'){
        scoreContainer.textContent = +currentScore + 1
    }
    else
    if(winner === 'computer'){
        scoreContainer.textContent = +currentScore - 1
    }
}
