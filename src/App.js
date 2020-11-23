import './App.css'
import React from 'react';

export default class App extends React.Component{
  state = {
    rows:6,
    columns:7,
    moves:[],
    history: [{moves:[], playerTurn:'blue'}],
    playerTurn:'red',
    stepNumber: 0,
    winner: null,
    ascending: true,
  };

  resetBoard = ()=>{
    console.log("reset");
    this.setState({moves:[], winner:null, stepNumber:0, playerTurn:'red'});

  }

  getPiece = (x,y)=>{
    // console.log(this.state.stepNumber);
    // console.log(this.state.moves.length);
    let moves = this.state.moves.slice(0, this.state.stepNumber);
    const list = moves.filter((item)=>{
      return (item.x===x && item.y===y);
    });
    return list[0];
  }

  isWinner = (x,y)=>{
    const {winner, winningMoves} = this.state;
    if(!winner){
      return false;
    }
    return winningMoves.some(item=>(item.x===x && item.y===y));
  }

  checkWinner = (x, y, player)=>{
    //check vertically
    let winningMoves=[{x,y}];
    for(let column = x+1; column<x+4; column+=1){
      const checkPiece = this.getPiece(column, y);
      if(checkPiece && checkPiece.player === player){
        winningMoves.push({x:column, y:y});
      }else{
        break;
      }
    }
    for(let column = x-1; column>x-4; column-=1){
      const checkPiece = this.getPiece(column, y);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:column, y:y});
      }else{
        break;
      }
    }

    if(winningMoves.length>3){
      // console.log('winner',winningMoves)
      this.setState({winner:player, winningMoves});
      return true;
    }

    //check horizontally
    winningMoves=[{x,y}];
    for(let row = y+1; row<y+4; row+=1){
      const checkPiece = this.getPiece(x, row);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x, y:row});
      }else{
        break;
      }
    }

    for(let row = y-1; row>y-4; row-=1){
      const checkPiece = this.getPiece(x,row);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x, y:row});
      }else{
        break;
      }
    }

    if(winningMoves.length>3){
      // console.log('winner',winningMoves)
      this.setState({winner:player, winningMoves});
      return true;
    }

    //check diagnalleft
    winningMoves=[{x,y}];
    for(let i = 1; i<4; i+=1){
      const checkPiece = this.getPiece(x+i, y+i);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x+i, y:y+i});
      }else{
        break;
      }
    }

    for(let i = 1; i<4; i+=1){
      const checkPiece = this.getPiece(x-i,y-i);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x-i, y:y-i});
      }else{
        break;
      }
    }

    if(winningMoves.length>3){
      // console.log('winner',winningMoves)
      this.setState({winner:player, winningMoves});
      return true;
    }

    //check diagnalright
    winningMoves=[{x,y}];
    for(let i = 1; i<4; i+=1){
      const checkPiece = this.getPiece(x-i, y+i);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x-i, y:y+i});
      }else{
        break;
      }
    }

    for(let i = 1; i<4; i+=1){
      const checkPiece = this.getPiece(x+i,y-i);
      if(checkPiece && checkPiece.player ===player){
        winningMoves.push({x:x+i, y:y-i});
      }else{
        break;
      }
    }

    if(winningMoves.length>3){
      // console.log('winner',winningMoves)
      this.setState({winner:player, winningMoves});
      return true;
    }
  }

  isDraw(){
   if(this.state.stepNumber===42){
     return true;
   }
   return false;
  }

  addMove = (x,y)=>{
    let playerTurn = this.state.stepNumber % 2 === 0 ? 'red' : 'blue';
    const nextPlayerTurn = playerTurn === 'red' ? 'blue' : 'red';
    let availablePosition = null;
    for(let position=this.state.rows-1; position>=0; position--){
      if(!this.getPiece(x,position)){
        availablePosition = position;
        break;
      }
    }

    let moves = this.state.moves.slice(0, this.state.stepNumber);
    let history = this.state.history.slice(0, this.state.stepNumber);
    if(availablePosition!=null){
      this.setState(
        {
          moves:moves.concat({x, y:availablePosition, player:playerTurn}),
          playerTurn:nextPlayerTurn,
          history:history.concat({moves:moves, player:playerTurn}),
          stepNumber:this.state.stepNumber+1,
        },()=> this.checkWinner(x,availablePosition, playerTurn));
    }
  }


  renderBoard(){
    const {rows, columns, winner}= this.state;
    const rowsDisplay = [];

    for(let row=0; row<this.state.rows; row+=1){
      const columnDisplay = [];
      for(let column=0; column<this.state.columns; column+=1){
        const piece = this.getPiece(column,row);
        const winner= this.isWinner(column, row);
        columnDisplay.push(
          <div onClick={()=>{this.addMove(column, row)}} style={{width:'8vw', height:'8vw', backgroundColor: winner? 'pink':'yellow', boxShadow: winner?'0px 0px 10px #fff':undefined, 
          display:'flex', padding: 5, cursor:'pointer'}}>
            <div style={{borderRadius:'10%', backgroundColor:'white', flex:1, display:'flex'}}>
              {piece? <div style={{backgroundColor: piece.player, flex:1, borderRadius:'50%', border:'1px solid #333'}}/>:undefined}
            </div>
          </div>
        );
      }
      rowsDisplay.push(
      <div style={{display:'flex', flexDirection:'row'}}>{columnDisplay}</div>
      );
    }

    //return draw or win
    return(
      <div style={{backgroundColor: 'white', display:'flex', flexDirection:'column'}}>
        
        {this.isDraw() && <div onClick={this.resetBoard} style={{position:'absolute',left:0,right:0,bottom:0,top:0, zIndex:3, backgroundColor:'rgba(0,0,0, .5)',
        display:'flex', justifyContent:'center', alignContent:'center', color:'#fff', fontWeight:'200', fontSize:'8vw' }}>{`DRAW!!`}</div> }

        {winner && <div onClick={this.resetBoard} style={{position:'absolute',left:0,right:0,bottom:0,top:0, zIndex:3, backgroundColor:'rgba(0,0,0, .5)',
        display:'flex', justifyContent:'center', alignContent:'center', color:'#fff', fontWeight:'200', fontSize:'8vw' }}>{`${winner.toUpperCase()} WINS!!`}</div>}
        {rowsDisplay}
      </div>

      
    );
  }

  jumpTo(move_num) {
    if(this.state.winner !== null) {
      return;
    }

    this.setState({
      stepNumber:move_num+1,
    });
  }

  //reverse time machine order
  reverse() {
    this.setState({
      ascending: !this.state.ascending,
    });
  }

  //time machine
  renderHistory(){    
    let moves = this.state.moves.map((step, move) => {
      const desc = 
        'Go to (' + step.x + ',' + step.y + ')';
      return (
        <li key={move+1}>
          <button onClick={() => this.jumpTo(move)} style={{fontWeight: move === this.state.stepNumber-1 ? '900' : '100'}}>{desc}</button>
        </li>
      );
    });


    let prepend_list = [(<li key={0}><button onClick={() => this.jumpTo(-1)} style={{fontWeight: -1 === this.state.stepNumber-1 ? '900' : '100'}}>Go to game start</button></li>)];
    moves = prepend_list.concat(moves);


    if(!this.state.ascending) {
      return moves.reverse();
    }

    return moves;
  }


  render(){
    // console.log("render");
    const {style} = this.props;
    // console.log(style);
    return (
      <div>
        <h1>Connect 4</h1>
        <div>
          {this.renderBoard()}
          <p>{`Player Turn: ${this.state.playerTurn.toUpperCase()}`}</p>
          <button onClick={this.resetBoard}>Clear Board</button>
          <button onClick={() => this.reverse()}>Reverse order</button>
          <ol id="moves">{this.renderHistory()}</ol>
        </div>
      </div>
      
    );
  }
}