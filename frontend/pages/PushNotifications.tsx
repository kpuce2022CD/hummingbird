import React from "react";

import { getToken, onMessageListener } from "./firebase";
import Snackbar from "@material-ui/core/Snackbar";

type MyProps = {
  // using `interface` is also ok
  message?: string;
};
type MyState = {
  show: boolean;
  notification: any;
  isTokenFound: boolean;
  open: boolean;
};
class PushNotifications extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      show: false,
      notification: { title: "", body: "" },
      isTokenFound: false,
      open: false,
    };
  }

  componentDidMount() {
    getToken(this.setTokenFound);

    onMessageListener()
        .then((payload) => {
          this.setState({
            show: true,
            notification: {
              title: payload.notification.title,
              body: payload.notification.body,
            },
          });
          console.log(payload);
          this.setState({ open: true });
        })
        .catch((err: any) => console.log("failed: ", err));
  }

  setTokenFound = (token: any) => {
    this.setState({ isTokenFound: token });
  };

  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
        <>
          <div>
            <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={this.state.open}
                autoHideDuration={60000}
                onClose={this.handleClose}
                message={this.state.notification.body}
            />
          </div>
        </>
    );
  }
}

export default PushNotifications;
