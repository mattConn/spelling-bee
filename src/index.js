import React from 'react';
import ReactDOM from 'react-dom';
import Controls from './controls';
import './index.css';


class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <p>{this.props.message}</p>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: '',
      wordList: this.props.wordList,
      message: ''
    }

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
  enterHandler() {
    // clear old word
    this.setState({ currentWord: '' });

    // success conditions
    // USE OBJ
    if (this.state.currentWord.length < 4) // not long enough
    {
      this.setState({ message: 'Too short.' });
      return;
    }
    if (!this.state.wordList.hasOwnProperty(this.state.currentWord)) // not in list
    {
      this.setState({ message: 'Not in list.' });
      return;
    }
    if (this.state.wordList[this.state.currentWord]) // already found
    {
      this.setState({ message: 'Aready found.' });
      return;
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

        <Controls letters={this.props.letters} enterHandler={()=>this.enterHandler()}/>


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

          <Message message={this.state.message} />
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