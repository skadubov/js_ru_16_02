import React, { Component, PropTypes } from 'react'
import { deleteComment } from './actions/comments'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        return (
            <div>
                <a href = "#" onClick = {this.props.clickDelete}>Delete comment</a>
                <p>{this.props.comment.text}</p>
            </div>
        )
    }
}

export default Comment
