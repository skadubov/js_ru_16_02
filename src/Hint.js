import React, { Component, PropTypes } from 'react'
const style = {
  position: 'fixed',
  top: 0,
  left: 200,
  height: 20,
  padding: 6,
  margin: 3,
  border: '1px solid #606060',
  background: '#aed'
}

class Hint extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    render() {
        return (
            <div style={style}>
                {this.props.text}
            </div>
        )
    }
}

export default Hint
