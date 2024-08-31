


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// //import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import './Login.css';

// const Login = ({ onVerify }) => {
//   const [mail, setMail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);


//   const handleSendOtp = async () => {
//     try {
//       await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/send-otp/${mail}`);
//       setStep(2);
//       setMessage('OTP sent successfully.');
//     } catch (error) {
//       console.error('Error sending OTP', error);
//       setMessage('Error sending OTP.');
//     }
//   };

//   const handleRedirect = () => {
//     // window.location.href = 'http://localhost:5173/';
//     navigate('*')
//   };

//   const handleAdminLogin = () => {
//     // window.location.href = 'http://localhost:5173/adminloginpage';
//     navigate('/adminloginpage');
//   }



//   // const handleVerifyOtp = async () => {
//   //   try {
//   //     const response = await axios.post(`http://localhost:8080/verify-otp/${mail}/${otp}`);
//   //     const responseData = response.data;
//   //     setMessage(responseData);

//   //     if (responseData === 'Go To Register Page') {
//   //       onVerify();  // Call the onVerify function passed as a prop
//   //       navigate('/user-form', { state: { email: mail } });  // Navigate to the user form with email
//   //       console.log(mail);
//   //     } else if (responseData === 'Go to Main Page') {
//   //       onVerify();  // Call the onVerify function passed as a prop
//   //       navigate('/main', { state: { email: mail } });  // Navigate to the main page
//   //     }
//   //   } catch (error) {
//   //     console.error('Error verifying OTP', error);
//   //     setMessage('Error verifying OTP.');
//   //   }
//   // };

//   const handleVerifyOtp = async () => {
//     try {
//       const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/verify-otp/${mail}/${otp}`);
//       const responseData = response.data;
//       setMessage(responseData);

//       if (responseData === 'Go To Register Page') {
//         onVerify();
//         navigate('/user-form', { state: { email: mail } });
//       } else if (responseData === 'Go to Main Page') {
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP', error);
//       setMessage('Error verifying OTP.');
//     }
//   };


//   const handleClose = () => setShowModal(false);

//   const handleAudioClick = () => {
//     navigate('/main', { state: { email: mail } });
//   };

//   const handleImageClick = () => {
//     navigate('/image', { state: { email: mail } });
//   };




//   return (
//     <div className='login-page'>
//       <div className="login-container">
//         <h2>Login with email</h2>
//         {step === 1 ? (
//           <>
//             <input
//               type="email"
//               value={mail}
//               onChange={(e) => setMail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//             />
//             <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
//             <button onClick={handleAdminLogin} className='btn btn-warning'>Admin Login</button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP here"
//               className="input-field"
//             />
//             <div className='resend-submit-container'>
//               <button onClick={handleVerifyOtp} className="submit-button">Submit</button>
//               <button onClick={handleRedirect} className="redirect-button">Resend</button>
//             </div>
//           </>
//         )}
//         <p>{message}</p>
//       </div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Data Type</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>What type of data do you want to give?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleAudioClick}>
//             Audio
//           </Button>
//           <Button variant="secondary" onClick={handleImageClick}>
//             Image
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login;




//it working without loader and set Timeout
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button, Spinner } from 'react-bootstrap';
// import './Login.css';

// const Login = ({ onVerify }) => {
//   const [mail, setMail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Loader state
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const handleSendOtp = async () => {
//     setLoading(true); // Start loader
//     try {
//       await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/send-otp/${mail}`);
//       setStep(2);
//       setMessage('OTP sent successfully.');
//     } catch (error) {
//       console.error('Error sending OTP', error);
//       setMessage('Error sending OTP.');
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true); // Start loader
//     try {
//       const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/verify-otp/${mail}/${otp}`);
//       const responseData = response.data;
//       setMessage(responseData);

//       if (responseData === 'Go To Register Page') {
//         onVerify();
//         navigate('/user-form', { state: { email: mail } });
//       } else if (responseData === 'Go to Main Page') {
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP', error);
//       setMessage('Error verifying OTP.');
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   const handleRedirect = () => {
//     navigate('*');
//   };

//   const handleAdminLogin = () => {
//     navigate('/adminloginpage');
//   };

//   const handleClose = () => setShowModal(false);

//   const handleAudioClick = () => {
//     navigate('/main', { state: { email: mail } });
//   };

//   const handleImageClick = () => {
//     navigate('/image', { state: { email: mail } });
//   };

//   return (
//     <div className='login-page'>
//       <div className="login-container">
//         <h2>Login with email</h2>
//         {loading ? (
//           <Spinner animation="border" variant="primary" /> // Show loader
//         ) : (
//           <>
//             {step === 1 ? (
//               <>
//                 <input
//                   type="email"
//                   value={mail}
//                   onChange={(e) => setMail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="input-field"
//                 />
//                 <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
//                 <button onClick={handleAdminLogin} className='btn btn-warning'>Admin Login</button>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP here"
//                   className="input-field"
//                 />
//                 <div className='resend-submit-container'>
//                   <button onClick={handleVerifyOtp} className="submit-button">Submit</button>
//                   <button onClick={handleRedirect} className="redirect-button">Resend</button>
//                 </div>
//               </>
//             )}
//             <p>{message}</p>
//           </>
//         )}
//       </div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Data Type</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>What type of data do you want to give?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleAudioClick}>
//             Audio
//           </Button>
//           <Button variant="secondary" onClick={handleImageClick}>
//             Image
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login;



//Perfect with no loader at otp verifier

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import './Login.css';

// const Login = ({ onVerify }) => {
//   const [mail, setMail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState('');
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false); // Loader state

//   const handleSendOtp = async () => {
//     try {
//       setStep(2);
//       setResendDisabled(true);
//       await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/send-otp/${mail}`);
//       setMessage('OTP sent successfully.');

//       // Enable resend button after 45 seconds
//       setTimeout(() => {
//         setResendDisabled(false);
//       }, 45000);
//     } catch (error) {
//       console.error('Error sending OTP', error);
//       setMessage('Error sending OTP.');
//     }
//   };

//   const handleRedirect = () => {
//     navigate('*');
//   };

//   const handleAdminLogin = () => {
//     navigate('/adminloginpage');
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/verify-otp/${mail}/${otp}`);
//       const responseData = response.data;
//       setMessage(responseData);

//       if (responseData === 'Go To Register Page') {
//         onVerify();
//         navigate('/user-form', { state: { email: mail } });
//       } else if (responseData === 'Go to Main Page') {
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP', error);
//       setMessage('Error verifying OTP.');
//     }finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   const handleClose = () => setShowModal(false);

//   const handleAudioClick = () => {
//     navigate('/main', { state: { email: mail } });
//   };

//   const handleImageClick = () => {
//     navigate('/image', { state: { email: mail } });
//   };

//   return (
//     <div className='login-page'>
//       <div className="login-container">
//         <h2>Login with email</h2>
//         {step === 1 ? (
//           <>
//             <input
//               type="email"
//               value={mail}
//               onChange={(e) => setMail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//             />
//             <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
//             <button onClick={handleAdminLogin} className='btn btn-warning'>Admin Login</button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP here"
//               className="input-field"
//             />
//             <div className='resend-submit-container'>
//               <button onClick={handleVerifyOtp} className="submit-button">Submit</button>
//               <button
//                 onClick={handleRedirect}
//                 className="redirect-button"
//                 disabled={resendDisabled}
//                 style={{ backgroundColor: resendDisabled ? 'gray' : 'green', cursor: resendDisabled ? 'not-allowed' : 'pointer' }}
//               >
//                 Resend
//               </button>
//             </div>
//           </>
//         )}
//         <p>{message}</p>
//       </div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Data Type</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>What type of data do you want to give?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleAudioClick}>
//             Audio
//           </Button>
//           <Button variant="secondary" onClick={handleImageClick}>
//             Image
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Login




//runs perfectly with loader and set timeout 45 seconds.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './Login.css';


const Login = ({ onVerify }) => {
  const [mail, setMail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state


  const handleSendOtp = async () => {
    try {
      setStep(2);
      setResendDisabled(true);
      await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/send-otp/${mail}`);
      setMessage('OTP sent successfully.');


      // Enable resend button after 45 seconds
      setTimeout(() => {
        setResendDisabled(false);
      }, 45000);
    } catch (error) {
      console.error('Error sending OTP', error);
      setMessage('Error sending OTP.');
    }
  };


  const handleRedirect = () => {
    navigate('*');
  };


  const handleAdminLogin = () => {
    navigate('/adminloginpage');
  };


  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/verify-otp/${mail}/${otp}`);
      const responseData = response.data;
      setMessage(responseData);


      if (responseData === 'Go To Register Page') {
        onVerify();
        navigate('/user-form', { state: { email: mail } });
      } else if (responseData === 'Go to Main Page') {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
      setMessage('Error verifying OTP.');
    } finally {
      setLoading(false); // Stop loader
    }
  };


  const handleClose = () => setShowModal(false);


  const handleAudioClick = () => {
    navigate('/main', { state: { email: mail } });
  };


  const handleImageClick = () => {
    navigate('/image', { state: { email: mail } });
  };


  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>Login with email</h2>
        {step === 1 ? (
          <>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
            />
            <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
            <button onClick={handleAdminLogin} className='btn btn-warning'>Admin Login</button>
          </>
        ) : (
          <>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP here"
              className="input-field"
            />
            <div className='resend-submit-container'>
              <button onClick={handleVerifyOtp} className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Verifying...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              <button
                onClick={handleRedirect}
                className="redirect-button"
                disabled={resendDisabled}
                style={{ backgroundColor: resendDisabled ? 'gray' : 'green', cursor: resendDisabled ? 'not-allowed' : 'pointer' }}
              >
                Resend
              </button>
            </div>
          </>
        )}
        <p>{message}</p>
      </div>
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


export default Login;	
