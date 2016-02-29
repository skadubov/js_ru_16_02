import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './HOC/toggleOpen'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,

        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    render() {
        const actionText = this.props.isOpen ? 'hide comments' : 'show comments'

        const comments = this.props.comments.map((comment) => <p key={comment.id}><Comment comment = {comment}/></p>)
        return (
            <div>
                <a href = "#" onClick = {this.props.toggleOpen}>{actionText}</a>
	            <div className="comments">
    	            {this.props.isOpen ? comments : null}
	            </div>
            </div>
        )
    }
}

export default toggleOpen(CommentList)
