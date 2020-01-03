import React from "react"
import PropTypes from "prop-types"
import { firebase } from "../firebase"

const Checkbox = ({ id }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      })
  }
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
    >
      <span className="checkbox" />
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired
}

export default Checkbox
