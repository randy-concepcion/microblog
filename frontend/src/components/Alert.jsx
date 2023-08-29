import PropTypes from 'prop-types'

function Alert (props) {
  return (
      <div
          data-testid="test-alert-msg"
          className="w3-pale-red w3-text-red w3-border w3-border-red w3-round-large"
          style={{ padding: '1rem', marginTop: '1rem' }}>
          {props.message}
      </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string
}

export default Alert
