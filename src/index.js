import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//           {this.renderSquare(6)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//           {this.renderSquare(9)}
//           {this.renderSquare(10)}
//           {this.renderSquare(11)}
//           {this.renderSquare(12)}
//           {this.renderSquare(13)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(14)}
//           {this.renderSquare(15)}
//           {this.renderSquare(16)}
//           {this.renderSquare(17)}
//           {this.renderSquare(18)}
//           {this.renderSquare(19)}
//           {this.renderSquare(20)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(21)}
//           {this.renderSquare(22)}
//           {this.renderSquare(23)}
//           {this.renderSquare(24)}
//           {this.renderSquare(25)}
//           {this.renderSquare(26)}
//           {this.renderSquare(27)}
//         </div>
//          <div className="board-row">
//           {this.renderSquare(28)}
//           {this.renderSquare(29)}
//           {this.renderSquare(30)}
//           {this.renderSquare(31)}
//           {this.renderSquare(32)}
//           {this.renderSquare(33)}
//           {this.renderSquare(34)}
//         </div>
//          <div className="board-row">
//           {this.renderSquare(35)}
//           {this.renderSquare(36)}
//           {this.renderSquare(37)}
//           {this.renderSquare(38)}
//           {this.renderSquare(39)}
//           {this.renderSquare(40)}
//           {this.renderSquare(41)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [
//         {
//           squares: Array(42).fill(null)
//         }
//       ],
//       stepNumber: 0,
//       xIsNext: true
//     };
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares
//         }
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={i => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// ReactDOM.render(<Game />, document.getElementById("root"));

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2, 3],
//     [4, 5, 6, 7],
//     [8, 9, 10, 11],
//     [12, 13, 14, 15],
    
//     [0, 4, 8, 12],
//     [1, 5, 9, 13],
//     [2, 6, 10, 14],
//     [3, 7, 11, 15],
    
//     [0, 5, 10, 15],
//     [3, 6, 9, 12],
   
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

