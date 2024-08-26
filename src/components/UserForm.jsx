// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json'; // Import the JSON data

// const UserForm = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (state) {
//       setCities(statesAndCities[state]);
//     } else {
//       setCities([]);
//     }
//   }, [state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = { name, age, gender, specialty, state, city };
    
//     try {
//       // Simulate form submission
//       console.log(formData);
//       navigate('/main');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className='user-form-container'>
//       <h2>User Information Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='form-group'>
//           <label htmlFor='name'>Name:</label>
//           <input
//             type='text'
//             id='name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='age'>Age:</label>
//           <input
//             type='number'
//             id='age'
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='gender'>Gender:</label>
//           <select
//             id='gender'
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             required
//           >
//             <option value=''>Select gender</option>
//             <option value='Male'>Male</option>
//             <option value='Female'>Female</option>
//             <option value='Other'>Other</option>
//           </select>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='specialty'>Specialty:</label>
//           <input
//             type='text'
//             id='specialty'
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='state'>State:</label>
//           <select
//             id='state'
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           >
//             <option value=''>Select state</option>
//             {Object.keys(statesAndCities).map((stateKey, index) => (
//               <option key={index} value={stateKey}>
//                 {stateKey}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='city'>City:</label>
//           <select
//             id='city'
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//             disabled={!state}
//           >
//             <option value=''>Select city</option>
//             {cities.map((cityOption, index) => (
//               <option key={index} value={cityOption}>
//                 {cityOption}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type='submit' className='submit-button'>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './UserForm.css';

// const UserForm = () => {
//   const location = useLocation();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle form submission logic here
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled // to make the email field non-editable
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//             />
//           </div>

//           <div className='form-group'>
//           <label htmlFor='age'>Age:</label>
//           <input
//             type='number'
//             id='age'
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//           />
//         </div>
          
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;



// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json'; // Import the JSON data

// const UserForm = () => {
//   const [email, setEmail] = useState('')
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);
  
  
//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle form submission logic here
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           {/* <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled // to make the email field non-editable
//             />
//           </div> */}

// <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled // to make the email field non-editable
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//             />
//           </div>
          
          
          
//           <div className="form-group">
//             <label>Age:</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Enter your age"
//               className="input-field"
//             />
//           </div>
//                  <div className='form-group'>
//            <label htmlFor='gender'>Gender:</label>
//            <select
//             id='gender'
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             required
//           >
//             <option value=''>Select gender</option>
//             <option value='Male'>Male</option>
//             <option value='Female'>Female</option>
//             <option value='Other'>Other</option>
//           </select>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='specialty'>Specialty:</label>
//           <input
//             type='text'
//             id='specialty'
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor='state'>State:</label>
//           <select
//             id='state'
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           >
//             <option value=''>Select state</option>
//             {Object.keys(statesAndCities).map((stateKey, index) => (
//               <option key={index} value={stateKey}>
//                 {stateKey}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='city'>City:</label>
//           <select
//             id='city'
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//             disabled={!state}
//           >
//             <option value=''>Select city</option>
//             {cities.map((cityOption, index) => (
//               <option key={index} value={cityOption}>
//                 {cityOption}
//               </option>
//             ))}
//           </select>
//         </div>
          
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;


// ////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './UserForm.css';

// const UserForm = () => {
//   const location = useLocation();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');
  

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle form submission logic here
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled // to make the email field non-editable
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//             />
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json';

// const UserForm = () => {
//   const location = useLocation();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     if (state) {
//       setCities(statesAndCities[state]);
//     } else {
//       setCities([]);
//     }
//   }, [state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //add logic for submit button 
//     const user = { email, name, age, gender, specialty, state, city };

//     try {
//       const response = await fetch('http://localhost:8080/adduser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
      
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>Age:</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Enter your age"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>Gender:</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Specialty:</label>
//             <input
//               type="text"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//               placeholder="Enter your specialty"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>State:</label>
//             <select
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select state</option>
//               {Object.keys(statesAndCities).map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="input-field"
//               disabled={!state}
//             >
//               <option value="">Select city</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//           </div>
//           <button onClick={handleSubmit} type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json';

// const UserForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     if (state) {
//       setCities(statesAndCities[state]);
//     } else {
//       setCities([]);
//     }
//   }, [state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = { email, name, age, gender, specialty, state, city };

//     try {
//       const response = await fetch('http://localhost:8080/adduser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });

//       if (response.ok) {
//         navigate('/main');
//       } else {
//         console.error('Failed to submit form');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>Age:</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Enter your age"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>Gender:</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Specialty:</label>
//             <input
//               type="text"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//               placeholder="Enter your specialty"
//               className="input-field"
//             />
//           </div>
//           <div className="form-group">
//             <label>State:</label>
//             <select
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select state</option>
//               {Object.keys(statesAndCities).map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="input-field"
//               disabled={!state}
//             >
//               <option value="">Select city</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json';
// import axios from 'axios'

// const UserForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     if (state) {
//       setCities(statesAndCities[state]);
//     } else {
//       setCities([]);
//     }
//   }, [state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = { email, name, age, gender, specialty, state, city };

//     try {
//       // const response = await fetch('http://localhost:8080/adduser', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(user),
//       // });

//       const response = axios.post('http://localhost:8080/adduser')
//       console.log(response.data)
//       if (response.data == "saved") {
//         //console.log(response.data)
//         navigate('/main');
        
//       } else {
//         console.error('Failed to submit form');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Age:</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Enter your age"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Gender:</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="input-field"
//               required
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Specialty:</label>
//             <input
//               type="text"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//               placeholder="Enter your specialty"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>State:</label>
//             <select
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="input-field"
//               required
//             >
//               <option value="">Select state</option>
//               {Object.keys(statesAndCities).map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="input-field"
//               disabled={!state}
//               required
//             >
//               <option value="">Select city</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;

//below code is working code
//////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json';

// const UserForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(location.state?.email || '');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     if (state) {
//       setCities(statesAndCities[state]);
//     } else {
//       setCities([]);
//     }
//   }, [state]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = { email, name, age, gender, specialty, state, city };

//     console.log('Submitting user:', user);

//     try {
//       const response = await axios.post('http://localhost:8080/adduser', user, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(response.data)
//       if (response.status === 200) { 
//         if(response.data == "saved"){
//           navigate('/main', { state: { email: email } } );
//           console.log(email);
//         }
//         else{
//           alert("Go to Main Page You are Registered already")
//           navigate('/main');
//         }
        
//       } else {
//         console.error('Failed to submit form:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='user-form-page'>
//       <div className="user-form-container">
//         <h2>User Registration Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="input-field"
//               disabled
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Age:</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               placeholder="Enter your age"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Gender:</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="input-field"
//               required
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Specialty:</label>
//             <input
//               type="text"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//               placeholder="Enter your specialty"
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>State:</label>
//             <select
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="input-field"
//               required
//             >
//               <option value="">Select state</option>
//               {Object.keys(statesAndCities).map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="input-field"
//               disabled={!state}
//               required
//             >
//               <option value="">Select city</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;





import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import './UserForm.css';
import statesAndCities from '../data/states_and_cities.json';
import medicalSpecializations from '../data/medicalSpecializations.json'; // Import the JSON file

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || '');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    if (state) {
      setCities(statesAndCities[state]);
    } else {
      setCities([]);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, name, age, gender, specialty, state, city };

    console.log('Submitting user:', user);

    try {
      const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/adduser', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data)
      if (response.status === 200) { 
        if(response.data === "saved"){
          navigate('/main', { state: { email: email } } );
          console.log(email);
        } else {
          alert("Go to Main Page You are Registered already")
          navigate('/main');
        }
      } else {
        console.error('Failed to submit form:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const specializationOptions = medicalSpecializations.map(specialization => ({
    value: specialization,
    label: specialization
  }));

  return (
    <div className='user-form-page'>
      <div className="user-form-container">
        <h2>User Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Specialty:</label>
            <Select
              options={specializationOptions}
              value={specializationOptions.find(option => option.value === specialty)}
              onChange={(selectedOption) => setSpecialty(selectedOption.value)}
              className="input-field"
              placeholder="Select your specialty"
              isSearchable
              required
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select state</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>City:</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field"
              disabled={!state}
              required
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
