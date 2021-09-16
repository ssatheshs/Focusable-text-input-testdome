import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// React is loaded and is available as React and ReactDOM
// imports should NOT be used
class Input extends React.PureComponent {
  render() {
    let {forwardedRef, ...otherProps} = this.props; 
    return <input {...otherProps} ref={forwardedRef} />;
  }
}

const TextInput = React.forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />
});

class FocusableInput extends React.Component {
  
  textInput = React.createRef()

  render() {
    return <TextInput ref={this.textInput} />;
  }

  // When the focused prop is changed from false to true, 
  // and the input is not focused, it should receive focus.
  // If focused prop is true, the input should receive the focus.
  // Implement your solution below:
  componentDidUpdate(prevProps) {
    console.log( prevProps.focused && !this.props.focused )
    if( prevProps.focused !== this.props.focused && this.props.focused ){
      this.textInput.current.focus()
    }
  }
  
  componentDidMount() {
    if(this.props.focused){
      this.textInput.current.focus()
    }
  }
}

FocusableInput.defaultProps = {
  focused: true
};

const App = (props) => <FocusableInput focused={props.focused} />;

document.body.innerHTML = "<div id='root'></div>";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
