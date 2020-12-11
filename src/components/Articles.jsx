import React, { Component } from 'react';
import { getArticles } from '../api'
import { Link } from '@reach/router'
import styles from '../css/Articles.module.css'
import ErrorPage from './ErrorPage';

class Articles extends Component {

    state = { articles: [], topic: undefined, sort_by: 'created_at', order: 'desc', errorPage: false }

    componentDidMount() {
        getArticles(this.props.topic).then(articles => {
            this.setState({ articles, errorPage: false })
        }).catch(() => {
            this.setState({ errorPage: true })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { sort_by, order } = this.state;
        if (prevProps.topic !== this.props.topic) {
            getArticles(this.props.topic).then(articles => {
                this.setState({ articles, errorPage: false })
            })
        }

        if (prevState.sort_by !== sort_by || prevState.order !== order) {
            getArticles(this.props.topic, sort_by, order).then(articles => {
                this.setState({ articles })
            })
        }
    }

    handleSortByDate = async () => {
        const { sort_by, order } = this.state;
        if (sort_by !== 'created_at') {
            this.setState({ sort_by: 'created_at', order: 'desc' })
        }
        if (sort_by === 'created_at' && order === 'desc') {
            this.setState({ order: 'asc' })
        } else {
            this.setState({ order: 'desc' })
        }
    }

    handleSortByVoteCount = async () => {
        const { sort_by, order } = this.state;
        if (sort_by !== 'votes') {
            this.setState({ sort_by: 'votes', order: 'desc' })
        }
        if (sort_by === 'votes' && order === 'desc') {
            this.setState({ sort_by: 'votes', order: 'asc' })

        } else {
            this.setState({ sort_by: 'votes', order: 'desc' })
        }
    }




    render() {
        const { articles, errorPage } = this.state
        if (errorPage) {
            return <ErrorPage />
        }
        return (
            <div className='Articles'>
                <div className={styles.sortButtonsContainer}>
                    <p className={styles.sortByHeading}>Sort By</p>
                    <div>
                        <button className={styles.sortButton} onClick={this.handleSortByDate}>date</button>
                        <button className={styles.sortButton} onClick={this.handleSortByVoteCount}>votes</button>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {articles.map(article => {
                        return (
                            <div className={styles.articleCard}>
                                <Link to={`/article/${article.article_id}`}><h3>{article.title}</h3></Link>
                                <p className='topic-tag'>{article.topic}</p>
                                <p>{article.author}</p>
                                <p>{article.votes}</p>
                                <p>{new Date(article.created_at).toDateString()}</p>
                            </div>
                        )
                    })
                    }

                </div >
            </div >
        );
    }
}

export default Articles;