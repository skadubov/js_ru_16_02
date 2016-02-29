import React, { Component, PropTypes } from 'react'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        return (
			<span>{this.props.comment.text}</span>
		)
    }
}

export default Comment
