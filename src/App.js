import './css/App.css';
import Navigation from './components/Navigation'
import Articles from './components/Articles'
import getTopics from './api'
import { Component } from 'react';
import { Router } from '@reach/router'
import SingleArticle from './components/SingleArticle'
import ErrorPage from './components/ErrorPage'

class App extends Component {
  state = { topics: [], user: 'tickle122', isLoading: true };

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics, isLoading: false })
    })
      .catch(() => { this.setState({ errorPage: true }) })
  }

  render() {
    if (this.state.isLoading) return <p>Loading...</p>
    if (this.state.errorPage) return <ErrorPage />
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

export default App;