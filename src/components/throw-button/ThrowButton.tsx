import { Component, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  click?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type State = {
  error: boolean;
};

class ThrowButton extends Component<ButtonProps, State> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  handleError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('Simulated error. Throw Error button was clicked');
    }
    return (
      <div>
        <button className="button" type="button" onClick={this.handleError}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default ThrowButton;
