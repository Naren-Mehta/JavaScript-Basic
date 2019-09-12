/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores=[0,0];
roundScore=0;
activePlayer=0;

document.querySelector('.dice').style.display='none';
document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;

document.getElementById('current-0').textContent=0;
document.getElementById('current-1').textContent=0;


document.querySelector('.btn-roll').addEventListener('click',function(){
    var dice=Math.floor(Math.random()*6)+1;
    var diceDOM= document.querySelector('.dice');
    var currentDOM=document.querySelector('#current-'+activePlayer);
    diceDOM.style.display='block';
    diceDOM.src='dice-'+dice+'.png';

    if(dice!==1){
        roundScore=roundScore+dice;
        currentDOM.textContent=roundScore;
    }else{
        roundScore=0;
        document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
        activePlayer=activePlayer === 0? activePlayer=1: activePlayer=0;
        currentDOM.textContent=roundScore;
        document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');

    }
});


document.querySelector('.btn-hold').addEventListener('click',function(){
    var currentDOM=document.querySelector('#current-'+activePlayer);
    var diceDOM= document.querySelector('.dice');

    scores[activePlayer]=scores[activePlayer]+roundScore;
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');

    activePlayer=activePlayer == 0? 1: 0;
    roundScore=0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');

    currentDOM.textContent=roundScore;
    diceDOM.style.display='none';

});

