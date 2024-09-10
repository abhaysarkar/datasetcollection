

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { useLocation } from 'react-router-dom';
// import ApiService from '../services/ApiService';
// import { useSwipeable } from 'react-swipeable';
// import './MainPage.css';
// import FileUpload from './FileUpload';

// const ImageMainPage = () => {
//   const location = useLocation();
//   const [medicalFields, setMedicalFields] = useState([]);
//   const [selectedMedicalField, setSelectedMedicalField] = useState(null);
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [flag, setFlag] = useState(false);
//   const [sid, setSid] = useState('');
//   const [email, setEmail] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [norec, setNorec] = useState(0)

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     fetchMedicalFields();
//   }, []);

//   const fetchMedicalFields = () => {
//     ApiService.img_getAllMedicalFields()
//       .then(response => {
//         const options = response.data.map(field => ({ value: field.id, label: field.name }));
//         setMedicalFields(options);
//       })
//       .catch(error => {
//         console.error('Error fetching medical fields:', error);
//       });
//   };

//   const handleMedicalFieldChange = selectedOption => {
//     setSelectedMedicalField(selectedOption);
//     setSelectedSubDepartment('')
//     fetchSubDepartments(selectedOption.value);
//     fetchNoOfRec(email, selectedMedicalField)
//   };

//   const fetchSubDepartments = (medicalFieldId) => {
//     ApiService.img_getSubDepartmentsByMedicalFieldId(medicalFieldId)
//       .then(response => {
//         const options = response.data.map(subDept => ({ value: subDept.id, label: subDept.name, flag: subDept.flag }));
//         setSubDepartments(options);
//         setCurrentIndex(0); // Reset the index when the medical field changes
//         setSelectedSubDepartment(options[0]); // Automatically select the first sub-department
//         fetchSubDepartmentDescription(selectedMedicalField?.value, options[0]?.value);
//         fetchSubDepartmentFlag(email, options[0]?.value);
//       })
//       .catch(error => {
//         console.error('Error fetching sub-departments:', error);
//       });
//       fetchNoOfRec(email, selectedMedicalField)

//   };

//   const handleSubDepartmentChange = (selectedOption) => {
//     const index = subDepartments.findIndex(subDept => subDept.value === selectedOption.value);
//     setCurrentIndex(index);
//     setSelectedSubDepartment(selectedOption);
//     fetchSubDepartmentDescription(selectedMedicalField.value, selectedOption.value);
//     fetchSubDepartmentFlag(email, selectedOption.value);
//     fetchNoOfRec(email, selectedMedicalField)
//   };

//   const fetchSubDepartmentDescription = (medicalFieldId, subDepartmentId) => {
//     ApiService.img_getSubDepartmentDescription(medicalFieldId, subDepartmentId)
//       .then(response => {
//         setDescription(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching sub-department description:', error);
//       });
//   };

//   const fetchSubDepartmentFlag = (email, subDepartmentId) => {
//     setSid(subDepartmentId);
//     ApiService.img_getSubDepartmentFlag(email, subDepartmentId)
//       .then(response => {
//         setFlag(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching sub-department flag:', error);
//       });
//   };

//   const handleLeftClick = () => {
//     if (currentIndex > 0) {
//       handleSubDepartmentChange(subDepartments[currentIndex - 1]);
//     }
//   };

//   const handleRightClick = () => {
//     if (currentIndex < subDepartments.length - 1) {
//       handleSubDepartmentChange(subDepartments[currentIndex + 1]);
//     }
//   };

//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       color: state.data.flag ? 'green' : 'black',
//     }),
//     singleValue: (provided, state) => ({
//       ...provided,
//       color: state.data.flag ? 'green' : 'black',
//     }),
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleRightClick,
//     onSwipedRight: handleLeftClick,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const fetchNoOfRec = (email, selectedMedicalField) => {
//     ApiService.img_getReadPrescription(email, selectedMedicalField.value)
//       .then(response => {
//         setNorec(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching no of read recording', error);
//       });
//   };


  

//   return (
//     <div>
//       <div className='header fixed-top'>Medical Fields and Sub-Departments</div>
//       <div className="container mt-5 p-5">
//         <label className='email-label'>Your data will be saved to this Account</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="input-field"
//           disabled
//           required
          
//         />
//         <div className="row">
//           <div className="col">
//             <label htmlFor="medicalField">Medical Field:</label>
//             <Select
//               id="medicalField"
//               options={medicalFields}
//               onChange={handleMedicalFieldChange}
//               value={selectedMedicalField}
//               placeholder="Select a medical field"
//             />
//           </div>
//           <div className="col">
//             <label htmlFor="subDepartment">Sub-Department:</label>
//             <Select
//               id="subDepartment"
//               options={subDepartments}
//               onChange={handleSubDepartmentChange}
//               value={selectedSubDepartment}
//               placeholder="Select a sub-department"
//               styles={customStyles}
//             />
//           </div>
//         </div>
//         {description && (
//           <div className="description-container" {...swipeHandlers}>
//             <h5>{norec}/{subDepartments.length}</h5>
//             <h3>Description:</h3>
//             <div className="description-scrollable">
//               <p style={{ color: flag ? 'green' : 'black' }}>{description}</p>
//             </div>
//             <div className="navigation-buttons">
//               <button className="left-button" onClick={handleLeftClick} disabled={currentIndex === 0}>
//                 <i className="fas fa-arrow-left"></i>
//               </button>
//               <button className="right-button" onClick={handleRightClick} disabled={currentIndex === subDepartments.length - 1}>
//                 <i className="fas fa-arrow-right"></i>
//               </button>
//             </div>
//             <FileUpload email={email} medicalField={selectedMedicalField?.label} subDepartment={selectedSubDepartment?.label} sid={sid} mfid={selectedMedicalField.value}/>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageMainPage;







// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSwipeable } from 'react-swipeable';
// import { useLocation } from 'react-router-dom';
// import FileUpload from './FileUpload';
// import Loader from './Loader'; // Import the Loader component
// import './MainPage.css';

// const ImageMain = () => {
//   const [medicalFields, setMedicalFields] = useState([]);
//   const [selectedFieldId, setSelectedFieldId] = useState('');
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [selectedSubDeptId, setSelectedSubDeptId] = useState('');
//   const [description, setDescription] = useState('');
//   const [readSubDepartments, setReadSubDepartments] = useState(new Set());
//   const [isRead, setIsRead] = useState(false);
//   const [loading, setLoading] = useState(true); // New state to track loading status
//   const location = useLocation();
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     fetch('https://datacollection-backend-eb040f587829.herokuapp.com/apii/medical-fields')
//       .then(response => response.json())
//       .then(data => {
//         setMedicalFields(data);
//         setLoading(false); // Set loading to false once data is fetched
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false); // Set loading to false even if there's an error
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedFieldId) {
//       const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
//       if (selectedField) {
//         setSubDepartments(selectedField.subDepartments);
//         setSelectedSubDeptId('');
//         setDescription('');
//         setIsRead(false); // Reset read status when changing the medical field
//       }
//     }
//   }, [selectedFieldId, medicalFields]);

//   useEffect(() => {
//     if (selectedSubDeptId) {
//       const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (selectedSubDept) {
//         setDescription(selectedSubDept.description);

//         fetch(`https://datacollection-backend-eb040f587829.herokuapp.com/apii/read-status?email=${email}&subDeptId=${selectedSubDeptId}`)
//           .then(response => response.json())
//           .then(data => {
//             if (data.read) {
//               setReadSubDepartments(prevState => new Set(prevState).add(selectedSubDeptId));
//               setIsRead(true);
//             } else {
//               setIsRead(false);
//             }
//           })
//           .catch(error => console.error('Error fetching read status:', error));
//       }
//     }
//   }, [selectedSubDeptId, subDepartments, email]);

//   const handlePrevious = () => {
//     if (selectedSubDeptId) {
//       const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (currentIndex > 0) {
//         setSelectedSubDeptId(subDepartments[currentIndex - 1].id);
//       }
//     }
//   };

//   const handleNext = () => {
//     if (selectedSubDeptId) {
//       const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (currentIndex < subDepartments.length - 1) {
//         setSelectedSubDeptId(subDepartments[currentIndex + 1].id);
//       }
//     }
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrevious,
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   const markAsRead = () => {
//     if (selectedSubDeptId) {
//       setReadSubDepartments(prevState => new Set(prevState).add(selectedSubDeptId));
//       setIsRead(true);

//       fetch('https://datacollection-backend-eb040f587829.herokuapp.com/apii/mark-as-read', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           subDeptId: selectedSubDeptId,
//         }),
//       })
//         .then(response => response.json())
//         .then(data => console.log('Marked as read:', data))
//         .catch(error => console.error('Error marking as read:', error));
//     }
//   };

//   const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
//   const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));


//   console.log(subDepartments.length);

//   return (
//     <div className="container bg-info-subtle mt-5">
//       <header className='text-center fixed-top fw-bold bg-dark text-white p-3'>Medical Field and Sub department</header>
      
//       {/* Show loader while loading */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <label className='email-label'>Your data will be saved to this Account</label>
//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             className="input-field"
//             disabled
//             required
//           />
//           <div className="d-flex align-items-center mb-3">
//             <div className="me-3" style={{ flex: 1 }}>
//               <label htmlFor="medical-field-select" className="form-label">Select Medical Field:</label>
//               <select
//                 id="medical-field-select"
//                 className="form-select"
//                 value={selectedFieldId}
//                 onChange={e => {
//                   setSelectedFieldId(e.target.value);
//                   setSelectedSubDeptId('');
//                   setDescription('');
//                   setIsRead(false);
//                 }}
//               >
//                 <option value="">-- Select a Medical Field --</option>
//                 {medicalFields.map(field => (
//                   <option key={field.id} value={field.id}>
//                     {field.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div style={{ flex: 1 }}>
//               <label htmlFor="sub-dept-select" className="form-label">Select Sub-Department:</label>
//               <select
//                 id="sub-dept-select"
//                 className="form-select"
//                 value={selectedSubDeptId}
//                 onChange={e => setSelectedSubDeptId(e.target.value)}
//                 disabled={!subDepartments.length}
//               >
//                 <option value="">-- Select a Sub-Department --</option>
//                 {subDepartments.map(subDept => (
//                   <option key={subDept.id} value={subDept.id}>
//                     {subDept.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {description && (
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={handlePrevious}
//                   disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === 0}>
//                   &larr;
//                 </button>
//                 <h5 className="mb-0">Description</h5>
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={handleNext}
//                   disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === subDepartments.length - 1}>
//                   &rarr;
//                 </button>
//               </div>
//               <div {...swipeHandlers} className="card-body" style={{ maxHeight: '200px', overflowY: 'auto', color: isRead ? 'green' : 'black' }}>
//                 <p className="card-text mb-5" style={{ fontWeight: 'bold', color: isRead ? 'green' : 'black' }}>{description}</p>
//               </div>
//               <FileUpload email={email} medicalField={selectedField.name} subDepartment={selectedSubDept.name} markAsRead={markAsRead}  />
//             </div>
            
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageMain;



// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSwipeable } from 'react-swipeable';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Loader from './Loader';
// import AudioRecordingComponent from './AudioRecordingComponent';
// import './MainPage.css';



// const ImageMain = () => {
//   const [medicalFields, setMedicalFields] = useState([]);
//   const [selectedFieldId, setSelectedFieldId] = useState('');
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [selectedSubDeptId, setSelectedSubDeptId] = useState('');
//   const [description, setDescription] = useState('');
//   const [readSubDepartments, setReadSubDepartments] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const [email, setEmail] = useState('');






//   useEffect(() => {
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);


//   useEffect(() => {
//     axios.get('https://datacollection-backend-eb040f587829.herokuapp.com/apii/medical-fields')
//       .then(response => {
//         setMedicalFields(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);


//   useEffect(() => {
//     if (selectedFieldId) {
//       const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
//       if (selectedField) {
//         setSubDepartments(selectedField.subDepartments);
//         setSelectedSubDeptId('');
//         setDescription('');
//       }
//     }
//   }, [selectedFieldId, medicalFields]);


//   const getAgain = () => {
//     axios.get('http://localhost:8080/apii/get-all-read-status')
//       .then(response => {
//         const readStatusData = response.data;
//         const readSubDepts = new Set();


//         readStatusData.forEach(status => {
//           if (status.read && status.email === email) {
//             readSubDepts.add(`${status.medicalFieldId}-${status.subDeptId}`);
//           }
//         });


//         setReadSubDepartments(readSubDepts);
//       })
//       .catch(error => {
//         console.error('Error fetching read status data:', error);
//       });
//   };


//   useEffect(() => {
//     if (email) {
//       getAgain(); // Call getAgain when the email is available
//     }
//   }, [email]);


//   useEffect(() => {
//     if (selectedSubDeptId) {
//       const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (selectedSubDept) {
//         setDescription(selectedSubDept.description);


//         // Mark as read when a sub-department is selected
//         // markAsRead(email, selectedFieldId, selectedSubDeptId);
//       }
//     }
//   }, [selectedSubDeptId, subDepartments, email, selectedFieldId]);


//   const handlePrevious = () => {
//     if (selectedSubDeptId) {
//       const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (currentIndex > 0) {
//         setSelectedSubDeptId(subDepartments[currentIndex - 1].id);
//       }
//     }
//   };


//   const handleNext = () => {
//     if (selectedSubDeptId) {
//       const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
//       if (currentIndex < subDepartments.length - 1) {
//         setSelectedSubDeptId(subDepartments[currentIndex + 1].id);
//       }
//     }
//   };


//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrevious,
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });


//   const markAsRead = (email, medicalFieldId, subDeptId) => {


//     const data = {
//       email: email,
//       medicalFieldId: parseInt(medicalFieldId),
//       subDeptId: parseInt(subDeptId),
//       read: true,
//     };


//     console.log(data)


//     axios.post('http://localhost:8080/apii/mark-read', data)
//       .then(response => {
//         console.log('Marked as read:', response.data);
//         setReadSubDepartments(prev => new Set(prev).add(`${medicalFieldId}-${subDeptId}`));
//       })
//       .catch(error => {
//         console.error('Error marking as read:', error);
//       });
//   };




//   const markAsReadHelper = () =>{
//     markAsRead(email, selectedFieldId, selectedSubDeptId);
//   }


 


//   const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
//   const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));


//   console.log("Medical Field Name  " + selectedField?.name || 'None');
//   console.log("selected subdepartment name  " + selectedSubDept?.name || 'None');


//   return (
//     <div className="container bg-info-subtle mt-5">
//       <header className='text-center fixed-top fw-bold bg-dark text-white p-3'>Medical Field and Sub department</header>


//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <label className='email-label'>Your data will be saved to this Account</label>
//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             className="input-field"
//             disabled
//             required
//           />
//           <div className="d-flex align-items-center mb-3">
//             <div className="me-3" style={{ flex: 1 }}>
//               <label htmlFor="medical-field-select" className="form-label">Select Medical Field:</label>
//               <select
//                 id="medical-field-select"
//                 className="form-select"
//                 value={selectedFieldId}
//                 onChange={e => {
//                   setSelectedFieldId(e.target.value);
//                   setSelectedSubDeptId('');
//                   setDescription('');
//                 }}
//               >
//                 <option value="">-- Select a Medical Field --</option>
//                 {medicalFields.map(field => (
//                   <option key={field.id} value={field.id}>
//                     {field.name}
//                   </option>
//                 ))}
//               </select>
//             </div>


//             <div style={{ flex: 1 }}>
//               <label htmlFor="sub-dept-select" className="form-label">Select Sub-Department:</label>
//               <select
//                 id="sub-dept-select"
//                 className="form-select"
//                 value={selectedSubDeptId}
//                 onChange={e => setSelectedSubDeptId(e.target.value)}
//                 disabled={!subDepartments.length}
//               >
//                 <option value="">-- Select a Sub-Department --</option>
//                 {subDepartments.map(subDept => (
//                   <option
//                     key={subDept.id}
//                     value={subDept.id}
//                     style={{
//                       fontWeight: 'bold',
//                       color: readSubDepartments.has(`${selectedFieldId}-${subDept.id}`) ? 'green' : 'black',
//                     }}
//                   >
//                     {subDept.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>


//           {description && (
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={handlePrevious}
//                   disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === 0}>
//                   &larr;
//                 </button>
//                 <h5 className="mb-0">Description</h5>
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={handleNext}
//                   disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === subDepartments.length - 1}>
//                   &rarr;
//                 </button>
//               </div>
//               <div {...swipeHandlers} className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//                 <p
//                   id={`description-${selectedSubDeptId}`}
//                   className="card-text"
//                   style={{
//                     fontWeight: 'bold',
//                     color: readSubDepartments.has(`${selectedFieldId}-${selectedSubDeptId}`) ? 'green' : 'black',
//                   }}>
//                   {description}
//                 </p>
//               </div>
//               {/* <button className='btn btn-danger' onClick={() => { markAsReadHelper(email, selectedFieldId, selectedSubDeptId); }}>Mark as read</button> */}
//               {/* Display the selected Medical Field and Sub-Department names */}
//               {/* <div className="mt-3">
//                 <p><strong>Selected Medical Field:</strong> {selectedField?.name || 'None'}</p>
//                 <p><strong>Selected Sub-Department:</strong> {selectedSubDept?.name || 'None'}</p>
//               </div> */}


//               {/* <AudioRecordingComponent email={email} medicalField={selectedField?.name} subDepartment={selectedSubDept?.name} markAsReadHelper={markAsReadHelper}/> */}


//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };


// export default ImageMain;




import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSwipeable } from 'react-swipeable';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import FileUpload from './FileUpload';
import './MainPage.css';



const ImageMain = () => {
  const [medicalFields, setMedicalFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [subDepartments, setSubDepartments] = useState([]);
  const [selectedSubDeptId, setSelectedSubDeptId] = useState('');
  const [description, setDescription] = useState('');
  const [readSubDepartments, setReadSubDepartments] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [readCount, setReadCount] = useState('');






  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);


  useEffect(() => {
    axios.get('https://datacollection-backend-eb040f587829.herokuapp.com/apii/medical-fields')
      .then(response => {
        setMedicalFields(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    if (selectedFieldId) {
      const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
      if (selectedField) {
        setSubDepartments(selectedField.subDepartments);
        setSelectedSubDeptId('');
        setDescription('');
      }
    }
  }, [selectedFieldId, medicalFields]);


  const getAgain = () => {
    axios.get('https://datacollection-backend-eb040f587829.herokuapp.com/apii/get-all-read-status')
      .then(response => {
        const readStatusData = response.data;
        const readSubDepts = new Set();


        readStatusData.forEach(status => {
          if (status.read && status.email === email) {
            readSubDepts.add(`${status.medicalFieldId}-${status.subDeptId}`);
          }
        });


        setReadSubDepartments(readSubDepts);
      })
      .catch(error => {
        console.error('Error fetching read status data:', error);
      });
  };


  useEffect(() => {
    if (email) {
      getAgain(); // Call getAgain when the email is available
    }
  }, [email]);


  useEffect(() => {
    if (selectedSubDeptId) {
      const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));
      if (selectedSubDept) {
        setDescription(selectedSubDept.description);


        // Mark as read when a sub-department is selected
        // markAsRead(email, selectedFieldId, selectedSubDeptId);
      }
    }
  }, [selectedSubDeptId, subDepartments, email, selectedFieldId]);


  const handlePrevious = () => {
    if (selectedSubDeptId) {
      const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
      if (currentIndex > 0) {
        setSelectedSubDeptId(subDepartments[currentIndex - 1].id);
      }
    }
  };


  const handleNext = () => {
    if (selectedSubDeptId) {
      const currentIndex = subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId));
      if (currentIndex < subDepartments.length - 1) {
        setSelectedSubDeptId(subDepartments[currentIndex + 1].id);
      }
    }
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  const markAsRead = (email, medicalFieldId, subDeptId) => {


    const data = {
      email: email,
      medicalFieldId: parseInt(medicalFieldId),
      subDeptId: parseInt(subDeptId),
      read: true,
    };


    console.log(data)


    axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/apii/mark-read', data)
      .then(response => {
        console.log('Marked as read:', response.data);
        setReadSubDepartments(prev => new Set(prev).add(`${medicalFieldId}-${subDeptId}`));
      })
      .catch(error => {
        console.error('Error marking as read:', error);
      });
  };




  const markAsReadHelper = () =>{
    markAsRead(email, selectedFieldId, selectedSubDeptId);
  }


 


  const selectedField = medicalFields.find(field => field.id === parseInt(selectedFieldId));
  const selectedSubDept = subDepartments.find(subDept => subDept.id === parseInt(selectedSubDeptId));


  console.log("Medical Field Name  " + selectedField?.name || 'None');
  console.log("selected subdepartment name  " + selectedSubDept?.name || 'None');


  const countReadSubDepartments = () => {
      const readCount = subDepartments.filter(subDept =>
        readSubDepartments.has(`${selectedFieldId}-${subDept.id}`)
      ).length;
      console.log(`Number of read sub-departments for field ID ${selectedFieldId}:`, readCount);
      setReadCount(readCount)
      return readCount;
    };

    useEffect(() => {
      if (selectedFieldId && subDepartments.length > 0) {
        countReadSubDepartments();
      }
    }, [selectedFieldId, readSubDepartments, subDepartments]);


  return (
    <div className="container bg-info-subtle mt-5">
      <header className='text-center fixed-top fw-bold bg-dark text-white p-3'>Medical Field and Sub department</header>


      {loading ? (
        <Loader />
      ) : (
        <>
{/*           <label className='email-label'>Your data will be saved to this Account</label> */}
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="input-field"
            disabled
            required
          />
          <div className="d-flex align-items-center mb-3">
            <div className="me-3" style={{ flex: 1 }}>
              <label htmlFor="medical-field-select" className="form-label">Select Medical Field:</label>
              <select
                id="medical-field-select"
                className="form-select"
                value={selectedFieldId}
                onChange={e => {
                  setSelectedFieldId(e.target.value);
                  setSelectedSubDeptId('');
                  setDescription('');
                }}
              >
                <option value="">-- Select a Medical Field --</option>
                {medicalFields.map(field => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            </div>


            <div style={{ flex: 1 }}>
              <label htmlFor="sub-dept-select" className="form-label">Select Sub-Department:</label>
              <select
                id="sub-dept-select"
                className="form-select"
                value={selectedSubDeptId}
                onChange={e => setSelectedSubDeptId(e.target.value)}
                disabled={!subDepartments.length}
              >
                <option value="">-- Select a Sub-Department --</option>
                {subDepartments.map(subDept => (
                  <option
                    key={subDept.id}
                    value={subDept.id}
                    style={{
                      fontWeight: 'bold',
                      color: readSubDepartments.has(`${selectedFieldId}-${subDept.id}`) ? 'green' : 'black',
                    }}
                  >
                    {subDept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {description && (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handlePrevious}
                  disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === 0}>
                  &larr;
                </button>
                <h5 className="mb-0">Description {readCount}/{subDepartments.length}</h5>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleNext}
                  disabled={!selectedSubDeptId || subDepartments.findIndex(subDept => subDept.id === parseInt(selectedSubDeptId)) === subDepartments.length - 1}>
                  &rarr;
                </button>
              </div>
              <div {...swipeHandlers} className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <p
                  id={`description-${selectedSubDeptId}`}
                  className="card-text"
                  style={{
                    fontWeight: 'bold',
                    color: readSubDepartments.has(`${selectedFieldId}-${selectedSubDeptId}`) ? 'green' : 'black',
                  }}>
                  {description}
                </p>
              </div>
              {/* <button className='btn btn-danger' onClick={() => { markAsReadHelper(email, selectedFieldId, selectedSubDeptId); }}>Mark as read</button> */}
              {/* Display the selected Medical Field and Sub-Department names */}
              {/* <div className="mt-3">
                <p><strong>Selected Medical Field:</strong> {selectedField?.name || 'None'}</p>
                <p><strong>Selected Sub-Department:</strong> {selectedSubDept?.name || 'None'}</p>
              </div> */}


              <FileUpload email={email} medicalField={selectedField?.name} subDepartment={selectedSubDept?.name} markAsReadHelper={markAsReadHelper} />

            </div>
          )}
        </>
      )}
    </div>
  );
};


export default ImageMain;
