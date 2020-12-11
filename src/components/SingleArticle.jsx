import React, { Component } from 'react';
import { getSingleArticle, getComments, postComment, deleteComment } from '../api'
import Voter from './Voter'
import styles from '../css/SingleArticle.module.css'

class SingleArticle extends Component {
    state = {
        isLoading: true,
        body: ''
    }


    componentDidMount() {

        Promise.all([
            getSingleArticle(this.props.article_id),
            getComments(this.props.article_id)]
        ).then(([article, comments]) => {
            this.setState({ article, comments, isLoading: false })
        })

    }

    handleCommentPost = (event) => {
        event.preventDefault()
        const { article_id, username } = this.props;
        const { body } = this.state;
        console.log(this.state.comments)
        this.setState({
            comments: [{
                author: username,
                body: body,
                created_at: new Date(),
                votes: 0
            }, ...this.state.comments,
            ]
        })
        postComment(article_id, { body, username })
    }


    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDeleteComment = (id) => {
        const comments = [...this.state.comments]
        const newComments = comments.filter(comment => {
            return comment.comment_id !== id
        })
        deleteComment(id)
        this.setState({ comments: newComments })
    }


    render() {


        if (this.state.isLoading) return <p>Loading...</p>
        else {
            const { title, body, topic, author, created_at } = this.state.article
            return (
                <>
                    <div className={styles.singleArticle}>
                        <h3>{title}</h3>
                        <p>{body}</p>
                        <p>{topic}</p>
                        <p>{author}</p>
                        <p>{new Date(created_at).toDateString()}</p>
                    </div>
                    <div className={styles.addComment}>
                        <form className={styles.formContainer} onSubmit={this.handleCommentPost}>
                            <input className={styles.formTextInput} id='body' type='text' value={this.state.body} onChange={this.handleChange} placeholder='type your comment here'></input>
                            <button className={styles.submitButton} type='submit'>Post</button>
                        </form>
                    </div>
                    <div className={styles.commentsSection}>
                        {this.state.comments.map(comment => {
                            const { comment_id, author, body, created_at, votes } = comment
                            return (
                                <div key={comment_id} className={styles.singleComment}>
                                    <p>{body}</p>
                                    <p>{author}</p>
                                    <Voter comments={this.state.comments} votes={votes} comment_id={comment_id} />
                                    <p>{new Date(created_at).toDateString()}</p>
                                    {author === this.props.username ? <button onClick={() => { this.handleDeleteComment(comment_id) }}>Delete</button> : null}
                                </div>

                            )
                        })}
                    </div>

                </>

            );
        }
    }

}

export default SingleArticle;