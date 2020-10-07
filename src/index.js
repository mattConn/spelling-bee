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

    this.state = {
      currentWord: '',
      wordList: this.props.wordList
    }


    // list of all letters as components
    this.letterComponents = this.letters.map(
      (letter, index) => this.renderLetter(letter, index)
    );

    // list of all found words
    this.foundWords = Object.keys(this.state.wordList).filter(key => this.state.wordList[key]);
    // list of all found words as components
    this.foundWordsComponents = this.foundWords.map(word => <p>{word}</p>);
  }

  // update currentWord state
  letterClickHandler(letter) {
    this.setState({ currentWord: this.state.currentWord + letter });
  }

  // check entered word for correctness
  enterHandler(){
    // clear old word
    this.setState({currentWord: ''});

    // success conditions
    const conditions = [
      this.state.currentWord.length > 3, // long enough
      this.state.wordList.hasOwnProperty(this.state.currentWord), // in list
      !this.state.wordList[this.state.currentWord] // not already found
    ];

    // bitwise AND all conditions (all must be true)
    if(!conditions.reduce((ax, val)=>ax & val)) return;

    // mark word as found
      let wordList = this.state.wordList;
      wordList[this.state.currentWord] = true;
      this.setState({ wordList: wordList });
  }


  // return letter component
  renderLetter(letter, key) {
    return <Letter key={key} value={letter} onClick={() => this.letterClickHandler(letter)} />
  }

  render() {
    return (
      <div className="game">

          <div className="currentWord-ctn">
            {this.state.currentWord.length === 0 ? <p>&nbsp;</p> : <p>{this.state.currentWord}</p>}
          </div>

        <div className="controls">

          {/*letters*/}
          {this.letterComponents}

          <div className="buttons">
            <button className="enter" onClick={() => this.enterHandler()}>Enter</button>
          </div>

        </div>{/*end controls*/}

        <div className="foundWords">
          {/* show how many words found */}
          <p>{Object.keys(this.state.wordList).filter(key => this.state.wordList[key]).length}/{Object.keys(this.state.wordList).length}</p>

          {/* show all words found */}
          {
            Object.keys(this.state.wordList).filter(
              key => this.state.wordList[key]).map(word => <p>{word}</p>)
          }
        </div>

      </div>
    );
  }
}


const letters = [...'alyorp'];
const words = [
  'royal',
  'allay',
  'alloy',
  'ally',
  'yall',
  'olay',
  'opal',
  'pallor',
  'rally',
  'play',
  'polar',
  'ploy',
];
const wordList = {};
words.forEach(word=>wordList[word]=false);

ReactDOM.render(
  <App
    letters={letters}
    wordList={wordList}
  />,
  document.getElementById('root')
);