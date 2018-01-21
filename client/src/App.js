import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestInput from "./adminka";
import List from "./list";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: []
        }

    }
        getAll()
        {
           fetch('/api/getall').
            then(res => res.json()).
            then(posts=> this.setState({postList:posts})).catch(err => console.log(err))
        }
     
         componentDidMount() {
        
        this.getAll();
      
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <List postList={this.state.postList}/>
          <TestInput renew={this.getAll.bind(this)} />
      </div>
    );
  }
}

export default App;
