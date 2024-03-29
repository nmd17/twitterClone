import React, { Component } from "react"
import { connect } from "react-redux"
import Card from "react-bootstrap/Card"
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { setCurrentUserInfo, editUser, editPicture } from "../../actions"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { cardStyle, cardTitleStyle, cardTextStyle, cardImgStyle } from "./style"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

library.add(faEdit)

class ProfileBox extends Component {
  state = {
    edit: false
  }

  componentDidMount() {
    this.props.setCurrentUserInfo({
      id: this.props.id,
      token: this.props.token
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEdit = e => {
    const { displayName, about, edit } = this.state
    const { token, id, editUser, editPicture } = this.props

    this.setState({ edit: !edit })

    e.preventDefault()

    editUser({
      editData: { displayName, about },
      token: token
    })

    const formData = new FormData(e.target)
    
    editPicture({
      file: formData,
      token: token,
      id: id
    })
  }

  render() {
    const { handleChange, handleEdit } = this
    const { displayName, username, bio, pic, updated } = this.props
    const { edit } = this.state

    return (
        <ReactCSSTransitionGroup
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={300}
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={true}
            transitionLeave={true}
        >
            <Card style={cardStyle}>
              <ReactCSSTransitionGroup
                style={cardImgStyle}
                transitionName="fade"
                transitionEnter={true}
                transitionEnterTimeout={2000}
                transitionLeave={true}
                transitionLeaveTimeout={300}
                transitionAppear={false}
                transitionAppearTimeout={2000}
              >
                <Card.Img variant="top" src={pic} key={updated} />
              </ReactCSSTransitionGroup>
                {edit ? (
                  <Form onSubmit={handleEdit} style={{ marginTop: "30px" }}>
                      <Form.Group controlId="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="displayName"
                            placeholder={displayName}
                            onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            name="about"
                            maxlength="100"
                            as="textarea"
                            rows="3"
                            placeholder={bio}
                            onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Picture Upload</Form.Label>
                        <Form.Control
                            name="picture"
                            placeholder="picture"
                            title="picture"
                            type="file"
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        value="Submit"
                        style={{ marginBottom: "30px" }}
                      >
                        Save
                      </Button>
                  </Form>
                ) : (
                  <Card.Body>
                      <Link to='/userProfile'>
                          <Card.Title style={cardTitleStyle}>{displayName}</Card.Title>
                      </Link>
                      <Link to='/userProfile'>
                          <small>@{username}</small>
                      </Link>
                      <Card.Text style={cardTextStyle}>{bio}</Card.Text>
                      <Button onClick={() => this.setState({ edit: !edit })}>
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                  </Card.Body>
                )}
            </Card>
        </ReactCSSTransitionGroup>
    )
  }
}

export default connect(
  ({ auth, currentUser }) => ({
    id: auth.login.id,
    token: auth.login.token,
    displayName: currentUser.displayName,
    username: currentUser.username,
    bio: currentUser.bio,
    pic: currentUser.pic,
    updated: currentUser.updated
  }),
  { setCurrentUserInfo, editUser, editPicture }
)(ProfileBox)
