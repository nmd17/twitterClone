import React, { Component } from 'react'
import { ProfileBox, Timeline, UsersSidebar, GeneralHeader, KweetInput } from '../'

import {getMessages} from '../../actions/getMessages'
import {connect} from 'react-redux'

import { timelineStyle, mainStyle } from './style'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageNum: 20
    }

    window.onscroll = () => {
      let scrollHeight, totalHeight
      scrollHeight = document.body.scrollHeight
      totalHeight = window.scrollY + window.innerHeight

      if (
        totalHeight >= scrollHeight
      ) {
        this.setState(state => ({
          messageNum: state.messageNum + 5
        }))

        this.props.getMessages(this.state.messageNum)
      }
    }
  }
  

  componentDidMount() {
    this.props.getMessages(this.state.messageNum)
    window.scrollTo(0,0)
  }

  render() {
      return (
          <React.Fragment>
              <GeneralHeader />
              <div id="main-wrap" style={mainStyle}>
                  <div className="profile-mobile wrap" style={{borderWidth:"0px"}}>
                      <ProfileBox className="mobile" />
                  </div>
                  <div style={timelineStyle} className="wrap">
                      <KweetInput />
                      <Timeline messages={this.props.messages}/>
                  </div>
                  <div className="users-mobile wrap" style={{borderWidth:"0px"}}>
                      <UsersSidebar className="mobile" />
                  </div>
              </div>
          </React.Fragment>
      )
  }
}

function mapStateToProps({ messages }) {
    return {
      messages: messages.messages
    }
  }


const mapDispatchToProps = {
  getMessages
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)



