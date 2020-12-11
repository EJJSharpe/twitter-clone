import './css/App.css';
import Navigation from './components/Navigation'
import Articles from './components/Articles'
import getTopics from './api'
import { Component } from 'react';
import PostBar from './components/PostBar'
import { Router } from '@reach/router'
import SingleArticle from './components/SingleArticle'

class App extends Component {
  state = { topics: [], user: 'tickle122' };

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics })
    })
  }

  handleError(error) {
    console.log('hello')
  }

  render() {
    if (this.state.errorPage === true) return <p>what you doing you muppet</p>
    else {
      return (
        <div className="App">
          <Navigation />
          <Router>
            <Articles path='/' topics={this.state.topics} />
            <Articles path='/:topic' topics={this.state.topics} />
            <SingleArticle path='/article/:article_id' username={this.state.user} topics={this.state.topics} />
          </Router>
        </div>
      );
    }
  }
}

export default App;