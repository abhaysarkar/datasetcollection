// import React, { useState } from 'react';
// import './AdminLoginForm.css';
// import axios from 'axios'

// const AdminLoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState('')

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     console.log('Submitting:', { email, password });

//     try{
//         const response = await axios.get(`http://localhost:8080/admin-check/${email}/${password}`)
//         console.log(response.data)
//         if(response.data == 'Admin'){
//             window.location.href = 'http://localhost:5173/adminpage'
//         }else{
//             setMessage('You are not Admin or Try Again')
//         }

//     }catch(error){
//         console.log("Error while validating")
//     }

//     // setEmail('')
//     // setPassword('')
//   };





//   // const handleForgotPassword = () => {
//   //   console.log('Forgot Password clicked');
//   // };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {/* {isSubmitting ? 'Submitting...' : 'Login'} */}
//           Login
//         </button>
//         <p>{message}</p>
//       </form>
//       {/* <button onClick={handleForgotPassword} className="forgot-password">
//         Forgot Password?
//       </button> */}
//     </div>
//   );
// };

// export default AdminLoginForm;



import React, { useState } from 'react';
import './AdminLoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); // Clear any previous message

    console.log('Submitting:', { email, password });

    try {
      const response = await axios.get(`https://datacollection-backend-eb040f587829.herokuapp.com/admin-check/${email}/${password}`);
      console.log(response.data);

      if (response.data === 'Admin') {
        //window.location.href = 'http://localhost:5173/audio-adminpage';
        //navigate('/audio-adminpage');
        setShowModal(true)
      } else {
        setMessage('You are not an Admin or try again.');
      }
    } catch (error) {
      console.error('Error while validating:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleClose = () => setShowModal(false);

  const handleAudioClick = () => {
    navigate('/audio-adminpage');
  };

  const handleImageClick = () => {
    navigate('/image-adminpage');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
        {message && <p>{message}</p>}
      </form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Data Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What type of data do you want to give?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAudioClick}>
            Audio
          </Button>
          <Button variant="secondary" onClick={handleImageClick}>
            Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLoginForm;









