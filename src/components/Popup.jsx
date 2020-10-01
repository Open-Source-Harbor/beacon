// import React, { Component } from "react";

// export default class Popup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       seen: false,
//     };
//     this.togglePop = this.togglePop.bind(this);
//   }

//   togglePop() {
//     this.setState({
//       seen: !this.state.seen,
//     });
//   }

//   render() {
//     return (
//       <div className="modal">
//         <div className="modal_content">
//           <span className="close" onClick={this.togglePop}>
//             &times;{" "}
//           </span>
//           <p>I'm A Pop Up!!!</p>
//         </div>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Register!</h3>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
