import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    errorMessage: 'error-message-hidden'
  }


  incrementCheck = () => {
    if (this.state.counter === 0) {
      this.setState({ errorMessage:'error-message-hidden'})
    }
    this.setState({ counter: this.state.counter + 1 });

  }

  decrementCheck = () => {
    this.state.counter !== 0 ? this.setState({ counter: this.state.counter - 1 })
                             : this.setState({ errorMessage:'error-message-show'});
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        <button
          data-test="increment-button"
          onClick={ this.incrementCheck }
        >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={ this.decrementCheck }
        >
          Increment counter
        </button>
        <div
          data-test='error-message-div'
          className={this.state.errorMessage}>You can`t go under 0</div>
      </div>
    );
  }
}

export default App;
