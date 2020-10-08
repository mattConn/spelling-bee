import React from 'react';
import ReactDOM from 'react-dom';
import Letter from './letter';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: '',
      wordList: this.props.wordList,
      message: ''
    }

    this.letterComponents = this.props.letters.map(
      (letter, index) => <Letter value={letter} key={index} onClick={() => this.letterHandler(letter)} />
    );

    // list of all found words
    this.foundWords = Object.keys(this.state.wordList).filter(key => this.state.wordList[key]);
    // list of all found words as components
    this.foundWordsComponents = this.foundWords.map(word => <p>{word}</p>);
  }

  // update currentWord state
  letterHandler(letter) {
    this.setState({ currentWord: this.state.currentWord + letter });
  }

  // check entered word for correctness
  enterHandler() {
    // clear old word
    this.setState({ currentWord: '' });

    // success conditions
    // USE OBJ
    const successConditions = {
      'Too short.': this.state.currentWord.length < 4,
      'Not in list.': !this.state.wordList.hasOwnProperty(this.state.currentWord),
      'Aready found.': this.state.wordList[this.state.currentWord]
    };

    for (const message in successConditions) {
      if (successConditions[message]) {

        this.setState({ message: message });

        // clear message
        setTimeout(
          ()=>this.setState({ message: '' }),
          1500);
        return;
      }
    }

    // mark word as found
    let wordList = this.state.wordList;
    wordList[this.state.currentWord] = true;
    this.setState({ wordList: wordList });
  }


  render() {
    return (
      <div className="game">

        <div className="currentWord-ctn">
          {this.state.currentWord.length === 0 ? <p>&nbsp;</p> : <p>{this.state.currentWord}</p>}
        </div>

        {/* letters and enter button */}
        <div className="controls">
          {this.letterComponents}
          <button className="enter" onClick={() => this.enterHandler()}>Enter</button>
        </div>


        <div className="words-ctn">
          <div className="foundWords">
            {/* show how many words found */}
            <p>{Object.keys(this.state.wordList).filter(key => this.state.wordList[key]).length}/{Object.keys(this.state.wordList).length}</p>

            {/* show all words found */}
            {
              Object.keys(this.state.wordList).filter(
                key => this.state.wordList[key]).map(word => <p>{word}</p>)
            }
          </div>


          <div className="message">
            <p>{this.state.message}</p>
          </div>
        </div>{/* end words ctn */}

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
words.forEach(word => wordList[word] = false);

ReactDOM.render(
  <App
    letters={letters}
    wordList={wordList}
  />,
  document.getElementById('root')
);