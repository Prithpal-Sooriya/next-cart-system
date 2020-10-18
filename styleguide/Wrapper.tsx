import React, { Component } from 'react'

import '../styles/styles.global.css'

export default class Wrapper extends Component {
  render(): JSX.Element {
    return <>{this.props.children}</>
  }
}
