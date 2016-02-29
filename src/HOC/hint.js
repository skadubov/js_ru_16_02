import React, { Component } from 'react'

export default function (CustomComponent) {
    return class extends Component {
        render() {
            return <CustomComponent {...this.props} hint="This is hint" />
        }
    }
}
