import React, { Component } from "react";
import ReactDOM from "react-dom";

import Video from './video';

import "./styles.css";

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');

const config = require('../firebase_auth').default;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firebase: null
    }
  }

  componentWillMount() {
    firebase.initializeApp(config);
    
    this.setState({
      firebase: firebase
    });
  }

  render() {
    return (<div>
      <Video firebase={this.state.firebase} />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
