import React, { Component, PropTypes } from 'react'
import hint from './HOC/hint'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        return (
			<span title={this.props.hint}>{this.props.comment.text}</span>
		)
    }
}

export default hint(Comment)
