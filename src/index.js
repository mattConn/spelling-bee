import React from 'react';
import ReactDOM from 'react-dom';
import Letter from './letter';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: 'spelling bee',
      wordList: this.props.wordList,
      displayingMessage: false
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
    if(this.state.displayingMessage)
    {
      this.setState({
        currentWord: letter,
        displayingMessage: false
      });
      return;
    }

    // max word length
    if (this.state.currentWord.length >= 18) {
      this.setState({ currentWord: '' });
      this.displayMessage('Too long.');
      return;
    }
    this.setState({ currentWord: 
      this.state.currentWord === 'spelling bee' ? letter : this.state.currentWord+ letter 
    });
  }

  // check entered word for correctness
  enterHandler() {
    if (this.state.currentWord.length === 0) return;
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
        this.displayMessage(message);
        return;
      }
    }

    // mark word as found
    let wordList = this.state.wordList;
    wordList[this.state.currentWord] = true;
    this.setState({ wordList: wordList });
  }

  deleteHandler() {
    if(this.state.currentWord.length === 0) return;
    this.setState({ currentWord: this.state.currentWord.slice(0, -1) });
  }

  displayMessage(message) {
    this.setState({ 
      currentWord: message,
      displayingMessage: true 
    });

    // clear message
    setTimeout(
      () => this.setState({ 
        currentWord: this.state.displayingMessage ? '' : this.state.currentWord,
        displayingMessage: false
      }),
      1500);
  }

  render() {
    return (
      <div className="wrapper">

        <div className="currentWord">
          {this.state.currentWord.length === 0 ? <p>&nbsp;</p> : <p>{this.state.currentWord}</p>}
        </div>

        {/* letters and enter button */}
        <div className="controls">
          {this.letterComponents}
          <button className="delete" onClick={() => this.deleteHandler()}>Del</button>
          <button className="enter" onClick={() => this.enterHandler()}>Enter</button>
        </div>


        <div className="status">
          <div className="foundWords">
            {/* show how many words found */}
            <p className="count">
              {Object.keys(this.state.wordList).filter(key => 
                this.state.wordList[key]).length}/{Object.keys(this.state.wordList).length}
                </p>

            {/* show all words found */}
            {
              Object.keys(this.state.wordList).filter(
                key => this.state.wordList[key]).map(word => <p>{word}</p>)
            }
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