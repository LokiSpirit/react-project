import { Component, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  click?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface State {
  error: boolean;
}

class Button extends Component<ButtonProps, State> {
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
        <button type="button" onClick={this.handleError}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
