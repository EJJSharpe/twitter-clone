import React, { Component } from 'react';
import { editVotes } from '../api'

class Voter extends Component {
    state = { vote_change: 0 }


    handleVote = (vote) => {
        const { comment_id } = this.props;
        const inc_votes = vote;

        this.setState({ vote_change: inc_votes })
        editVotes(comment_id, { inc_votes })
            .catch(() => { this.setState({ vote_change: 0 }) })
    }



    render() {
        const { vote_change } = this.state;
        const { votes } = this.props;

        return (
            <>
                <p>votes: {votes + vote_change}</p>
                <button onClick={() => this.handleVote(1)}>👍</button>
                <button onClick={() => this.handleVote(-1)}>👎</button>
            </>
        );
    }
}

export default Voter;