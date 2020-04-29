import React from "react";
import { Alert, Button } from "react-bootstrap";

export default class AlertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showAlert,
    };
  }

  render() {
    let show = this.state.show;
    return (
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => this.setState({ show: false })}
            variant="outline-success"
          >
            Close me ya'll!
          </Button>
        </div>
      </Alert>
    );
  }
}
