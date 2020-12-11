import React, { Component } from 'react';
import getTopics from '../api'
import { Link } from '@reach/router'
import styles from '../css/Navigation.module.css'

class Navigation extends Component {

    state = { topics: [] }

    componentDidMount() {
        getTopics().then(topics => {
            this.setState({ topics })
        })
    }

    render() {

        const { topics } = this.state
        return (
            <>
                <div className='Navigation'>

                    <Link className={styles.siteHeader} to='/'><h1>NEWS</h1></Link>
                    <div className={styles.loggedIn}>
                        <p>Welcome tickle122</p>
                    </div>
                    <ul className={styles.topicsList}>
                        {topics.map(topic => {
                            return (
                                <Link className={styles.topicLink} key={topic.slug} to={`/${topic.slug}`}><li className={styles.topicListItem}>
                                    {topic.slug}
                                </li></Link>)
                        })}
                    </ul>


                </div>
            </>
        );
    }
}

export default Navigation;