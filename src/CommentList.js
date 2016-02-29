import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './HOC/toggleOpen'
import hint from './HOC/hint'

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
                <a href="#" title={this.props.hint} onClick={this.props.toggleOpen}>{actionText}</a>
	            <div className="comments">
    	            {this.props.isOpen ? comments : null}
	            </div>
            </div>
        )
    }
}

export default hint(toggleOpen(CommentList))
