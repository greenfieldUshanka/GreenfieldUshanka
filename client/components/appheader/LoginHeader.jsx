// import React, { Component } from 'react'; 
// import axios from 'axios';
// import logo from '../../images/logopb.png';
// import './index.css';

// export default class HeaderLogin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     };
//   }

//   handleOnChange(e) {
//     const { name, value } = e.target; 
//     this.setState({
//       [name]: value
//     });
//   }

//   handleLogin(event) {
//     event.preventDefault();
//     let component = this;
//     axios
//       .get(`/Login/${this.state.username}/${this.state.password}`)
//       .then(response => {
//         if (response.data === 'wrong') {
//           alert('Wrong username or password!');
//         } else {
//           component.props.setAuth(response.data.id);
//           component.setState({
//             isLoggedIn: true
//           });
//         }
//       })
//       .catch(err => {
//         console.log('Error from handleLogin', err);
//       });
//   }

//   render () {
//     return (
//       <div className="header">
//         <div className="row">
//           <div className="col-1-of-2">
//             <img className="logo" src={logo} /> 
//             <div className="appName">
//               petBook
//             </div> 
//           </div>
//           <div className="col-1-of-2">
//             <form className="loginForm" onSubmit={this.handleLogin.bind(this)}>
//               <div className="loginContainer">
//                 <div className="label">Email</div>
//                 <input onChange={this.handleOnChange.bind(this)} className="input" name="email" /> 
//               </div> 
//               <div className="loginContainer">
//                 <div className="label">Password</div>
//                 <input onChange={this.handleOnChange.bind(this)} className="input" name="password" type="password" />
//               </div> 
//               <input className="loginBtn" type="submit" value="Log In" />
//             </form>
//             <div className="forgotAccount">
//               <a>Forgot Account?</a> 
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }