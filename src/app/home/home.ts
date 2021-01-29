import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    public inputValue = "";
    public currentPlayer = "";
    public count = 1;
    public player = false;
    public msg = "";
    public playerOneScore = 0;
    public playerTwoScore = 0;
    public wins = [7, 56, 448, 73, 146, 292, 273, 84];

  constructor(private navCtrl: NavController) {

  }

checkWin(score){
    for(var i = 0; i < this.wins.length; i++){
        if((this.wins[i] & score)  === this.wins[i]){
            if(this.currentPlayer == "Player One"){
                this.newGame();
                alert("Player 1 Wins");
            } else{
                this.newGame();
                alert("Player 2 Wins");
            }
        }    
    }
    if(this.count == 10){
        alert("TIE");
        this.newGame();
    }
}
    
    
    placeTile(param){
      console.log("param " + param);
      this.count += 1;
      if(this.count %2 == 0){
        this.currentPlayer = "Player One";
        console.log(this.currentPlayer);
        var tile = <HTMLInputElement> document.getElementById(param);
        tile.disabled = true;
        document.getElementById(param).textContent="X";
        this.playerOneScore += Number(param);
        console.log("Player 1's score:" + this.playerOneScore);
        this.checkWin(this.playerOneScore);
      }
      else if(this.count %2 != 0){
        this.currentPlayer = "Player Two";
        this.msg= "O";
        var tile = <HTMLInputElement> document.getElementById(param);
        tile.disabled = true;
        this.playerTwoScore += Number(param);
        document.getElementById(param).textContent="O";
        console.log("Player 2's score:"+this.playerTwoScore);          
        this.checkWin(this.playerTwoScore);
      }
  }
    
newGame(){
    console.log("starting new game");
    for(var i = 1; i < 512; i*2 ){
        var tile = <HTMLInputElement> document.getElementById(i.toString()); 
        if(tile != null || tile != undefined){
            tile.textContent="";
            tile.disabled = false;
            i+=i;
            console.log(i);
        }
    }
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.count=1;
    }
}



