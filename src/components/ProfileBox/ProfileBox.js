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

library.add(faEdit)

class ProfileBox extends Component {
  state = {
    edit: false
  }

  componentDidMount() {
    this.props.setCurrentUserInfo({
      id: this.props.id
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEdit = e => {
    const { displayName, about, edit } = this.state
    const { id, editUser, editPicture } = this.props

    this.setState({ edit: !edit })

    e.preventDefault()

    editUser({
      editData: { displayName, about }
    })

    const formData = new FormData(e.target)
    editPicture({
      file: formData,
      id: id
    })
  }

  render() {
    const { handleChange, handleEdit } = this
    const { displayName, username, bio, pic, updated } = this.props
    const { edit } = this.state

    return (
      <Card style={cardStyle}>
        <Card.Img style={cardImgStyle} variant="top" src={pic} key={updated} />
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
    )
  }
}

function mapStateToProps({ auth, currentUser }) {
  return {
    id: auth.login.id,
    displayName: currentUser.displayName,
    username: currentUser.username,
    bio: currentUser.bio,
    pic: currentUser.pic,
    updated: currentUser.updated
  }
}

const mapDispatchToProps = {
  setCurrentUserInfo,
  editUser, 
  editPicture
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileBox)
