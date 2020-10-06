import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Letter extends React.Component {
    render() {
      return (
        <button className="letter" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
 }

 class App extends React.Component {
   constructor(props){
     super(props);

      this.letters = ['r','i','o','y','f','l'];
      this.centerLetter = 'g';

     this.state = {
       currentWord: '',
       foundWords: [],
       possibleWords: []
     }


     this.letterComponents = this.letters.map(
       (letter,index) => this.renderLetter(letter,index)
       );
   }

     letterClickHandler(letter)
     {
       this.setState({currentWord: this.state.currentWord+letter});
     }

    enterHandler(){
      // clear old word
      this.setState({currentWord: ''});
    }

    deleteHandler(){
      // remove last letter from current word
      this.setState({currentWord: this.state.currentWord.slice(0,-1)});
    }

   renderLetter(letter,key){
     return <Letter key={key} value={letter} onClick={()=>this.letterClickHandler(letter)}/>
   }

   render(){
     return (
       <div>
         <div>{this.state.currentWord}</div>
        {this.letterComponents}
        {this.renderLetter(this.centerLetter,'center')}
        <div>
       <button className="shuffle">Shuffle</button>
       <button className="delete" onClick={()=>this.deleteHandler()}>Delete</button>
       <button className="Enter" onClick={()=>this.enterHandler()}>Enter</button>
       </div>
       </div>
     );
   }
 }


ReactDOM.render(
    <App />,
    document.getElementById('root')
);