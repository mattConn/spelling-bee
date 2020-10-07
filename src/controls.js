import React from 'react';
import ReactDOM from 'react-dom';

class Letter extends React.Component {
  render() {
    return (
      <button className="letter" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    // list of all letters as components
    this.letterComponents = this.props.letters.map(
      (letter, index) => <Letter value={letter} key={index} />
    );
  }
  render() {
    return (
      <div className="controls">
        {this.letterComponents}
        <button className="enter" onClick={() => this.props.enterHandler()}>Enter</button>
      </div>
    );
  }
}

export default Controls;