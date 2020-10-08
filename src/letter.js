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

export default Letter;