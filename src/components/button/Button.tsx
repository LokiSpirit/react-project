import { Component, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  click: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.props.click} />
      </div>
    );
  }
}

export default Button;
