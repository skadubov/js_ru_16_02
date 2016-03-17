import React, { Component, PropTypes } from 'react'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object
    };

    render() {
        const {id, timeStamp, user, text} = this.props.comment
        const date = new Date(Date.parse(timeStamp)).toLocaleDateString()
        const time = new Date(Date.parse(timeStamp)).toLocaleTimeString()

        return (
            <div className="comment">
                #{id} &middot; {date} <span className="time">{time}</span> &middot; <span className="username">{user}</span>
                <p>{text}</p>
            </div>
        )
    }
}

export default Comment