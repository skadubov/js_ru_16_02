import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import { addComment, deleteComment } from './actions/comments'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array
    };

    state = {
        isOpen: false,
        comment: ''
    }

    render() {
        const { isOpen } = this.state
        const actionText = isOpen ? 'hide comments' : 'show comments'

        const comments = this.props.comments.map((comment) =>
			<li key={comment.id}><Comment comment = {comment} clickDelete={this.handleDelete.bind(this, comment.id)} /></li>)
        return (
            <div className="comments">
                <a href = "#" onClick = {this.toggleOpen}>{actionText}</a>
                <ul>
					{isOpen ? comments : null}
				</ul>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.comment} onChange={this.handleChange} placeholder='Input new comment' />
					<input type="submit" value="Add comment" />
				</form>
            </div>
        )
    }

	handleChange = (ev) => {
		this.setState({	comment: ev.target.value })
		};

	handleSubmit = (ev) => {
        ev.preventDefault()
		if(!this.state.comment) return;
		addComment({id: this.props.id, comment: {id: +new Date(), text:this.state.comment} })
		this.setState({	comment: ''	})
		};

	handleDelete = (id) => {
		deleteComment(this.props.id, id)
		};

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default CommentList
