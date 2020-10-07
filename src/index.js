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
  constructor(props) {
    super(props);

    this.letters = this.props.letters;
    this.centerLetter = this.props.centerLetter;

    this.state = {
      currentWord: '',
      message: '',
      wordList: this.props.wordList
    }


    // list of all letters as components
    this.letterComponents = this.letters.map(
      (letter, index) => this.renderLetter(letter, index)
    );
  }

  // update currentWord state
  letterClickHandler(letter) {
    this.setState({ currentWord: this.state.currentWord + letter });
  }

  // check entered word on enter
  enterHandler() {
    let message = '';

    // check if word is long enough
    if(this.state.currentWord.length < 4)
      message = 'Word is too short.';
    // check for center letter
    else if (this.state.currentWord.indexOf(this.centerLetter) < 0)
      message = `Word must contain ${this.centerLetter}.`;
     // word not in list
    else if (!this.state.wordList.hasOwnProperty(this.state.currentWord))
      message = `${this.state.currentWord} not in word list.`;
     // word already found
    else if (this.state.wordList[this.state.currentWord])
      message = `${this.state.currentWord} already found.`;
    // valid word found 
    else 
    {
      let wordList = this.state.wordList;
      wordList[this.state.currentWord] = true;
      this.setState({wordList: wordList});
      message = 'Word found!';
    }


    // clear old word
    this.setState({ currentWord: '' }, () => this.displayMessage(message));

    console.log(this.state.wordList);
  }

  displayMessage(message) {
    this.setState({ message: message });
    setTimeout(
      () => this.setState({ message: '' }), 1500
    );
  }


  deleteHandler() {
    // remove last letter from current word
    this.setState({ currentWord: this.state.currentWord.slice(0, -1) });
  }

  renderLetter(letter, key) {
    return <Letter key={key} value={letter} onClick={() => this.letterClickHandler(letter)} />
  }

  render() {
    return (
      <div className="game">
        <div className="currentWord-ctn">
          {this.state.currentWord.length === 0 ? <p>&nbsp;</p> : <p>{this.state.currentWord}</p>}
        </div>

        {/*letters*/}
        {this.letterComponents}
        {this.renderLetter(this.centerLetter, 'center')}

        <div className="buttons">
          <button className="delete" onClick={() => this.deleteHandler()}>Del</button>
          <button className="enter" onClick={() => this.enterHandler()}>Enter</button>
        </div>

        <div className="message-ctn">
         {this.state.message.length === 0 ? <p>&nbsp;</p> : <p>{this.state.message}</p>}
        </div>

      </div>
    );
  }
}


const letters = ['r', 'i', 'o', 'y', 'f', 'l'];
const centerLetter = 'g';
const wordList = {
  foggy: false,
  groggy: false
}

ReactDOM.render(
  <App 
  letters={letters} 
  centerLetter={centerLetter} 
  wordList={wordList}
  />,
  document.getElementById('root')
);