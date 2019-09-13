/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, prevDice, winningScore;
init();

function hideAllDice(){
    document.querySelectorAll('.dice').forEach(function(dice){
        dice.style.display='none';
    });
}

function blockAllDice(){
    document.querySelectorAll('.dice').forEach(function(dice){
        dice.style.display='block';
    });
}

function init() {
    winningScore=100;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevDice = 0;

    hideAllDice();

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value=0;

    gamePlaying = true;

}




document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        console.log(activePlayer + " "+dice1+" "+dice2);
        

        var dice1DOM = document.querySelector('#dice-1');
        var dice2DOM = document.querySelector('#dice-2');

        var currentDOM = document.querySelector('#current-' + activePlayer);
        blockAllDice();

        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        // if (dice !== 1 && !(prevDice === dice1 && prevDice ===6)) {
        //     prevDice=dice1;
        //     roundScore = roundScore + dice1+dice2;
        //     currentDOM.textContent = roundScore;
        // }  else {
        //     nextPlayer();
        // }

        if (dice1 !== 1 && dice2 !==1) {
            roundScore = roundScore + dice1+dice2;
            currentDOM.textContent = roundScore;
        }  else {
            nextPlayer();
        }
    }

});


document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        scores[activePlayer] = scores[activePlayer] + roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            console.log("===" + scores[activePlayer])
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

            document.querySelector('.final-score').value=scores[activePlayer];

        } else {
            nextPlayer();
        }
    }


});

function nextPlayer() {
    var currentDOM = document.querySelector('#current-' + activePlayer);
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = activePlayer == 0 ? 1 : 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    currentDOM.textContent = roundScore;
    hideAllDice();
    prevDice=0;
}

document.querySelector('.btn-new').addEventListener('click', init);
