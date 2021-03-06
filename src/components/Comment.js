import React, { Component, PropTypes } from 'react'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        return (
            <div className="comment">
                #{this.props.comment.id}
                <p>{this.props.comment.text}</p>
            </div>
        )
    }
}

export default Comment