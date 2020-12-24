// import React from 'react';
// import Keyboard from 'react-virtual-keyboard';
// import {  } from '@/components/Search'

// const VirtualKeyboard: React.FC = () => {
//   onInputChanged = (data) => {
//     this.setState({ input: data });
//   }

//   onInputSubmitted = (data) => {
//     console.log("Input submitted:", data);
//   }

//   render() {
//     return (
//       <Keyboard
//         value={this.state.input}
//         name='keyboard'
//         options={{
//           type:"input",
//           layout: "qwerty",
//           alwaysOpen: true,
//           usePreview: false,
//           useWheel: false,
//           stickyShift: false,
//           appendLocally: true,
//           color: "light",
//           updateOnChange: true,
//           initialFocus: true,
//           display: {
//             "accept" : "Submit"
//           }
//         }}
//         onChange={this.onInputChanged}
//         onAccepted={this.onInputSubmitted}
//         ref={k => this.keyboard = k}
//       />
//     )
//   }
// }

// export default VirtualKeyboard;
