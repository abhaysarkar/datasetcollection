



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Select from 'react-select';
// import './UserForm.css';
// import statesAndCities from '../data/states_and_cities.json';
// import medicalSpecializations from '../data/medicalSpecializations.json'; // Import the JSON file

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
//       const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/adduser', user, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(response.data)
//       if (response.status === 200) { 
//         if(response.data === "saved"){
//           navigate('/main', { state: { email: email } } );
//           console.log(email);
//         } else {
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

//   const specializationOptions = medicalSpecializations.map(specialization => ({
//     value: specialization,
//     label: specialization
//   }));

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
//             <Select
//               options={specializationOptions}
//               value={specializationOptions.find(option => option.value === specialty)}
//               onChange={(selectedOption) => setSpecialty(selectedOption.value)}
//               className="input-field"
//               placeholder="Select your specialty"
//               isSearchable
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
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import './UserForm.css';
import statesAndCities from '../data/states_and_cities.json';
import medicalSpecializations from '../data/medicalSpecializations.json';

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
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal

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

      if (response.status === 200) {
        if (response.data === "saved") {
          setShowModal(true); // Show the modal after a successful submission
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

  const handleAudioClick = () => {
    setShowModal(false);
    navigate('/main', { state: { email } });
  };

  const handleImageClick = () => {
    setShowModal(false);
    navigate('/image', { state: { email } });
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Data Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What type of data do you want to give?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAudioClick}>Audio</Button>
          <Button variant="secondary" onClick={handleImageClick}>Image</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserForm;

