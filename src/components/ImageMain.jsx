

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { useSwipeable } from 'react-swipeable';
import './MainPage.css';
import FileUpload from './FileUpload';

const ImageMainPage = () => {
  const location = useLocation();
  const [medicalFields, setMedicalFields] = useState([]);
  const [selectedMedicalField, setSelectedMedicalField] = useState(null);
  const [subDepartments, setSubDepartments] = useState([]);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
  const [description, setDescription] = useState('');
  const [flag, setFlag] = useState(false);
  const [sid, setSid] = useState('');
  const [email, setEmail] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [norec, setNorec] = useState(0)

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    fetchMedicalFields();
  }, []);

  const fetchMedicalFields = () => {
    ApiService.img_getAllMedicalFields()
      .then(response => {
        const options = response.data.map(field => ({ value: field.id, label: field.name }));
        setMedicalFields(options);
      })
      .catch(error => {
        console.error('Error fetching medical fields:', error);
      });
  };

  const handleMedicalFieldChange = selectedOption => {
    setSelectedMedicalField(selectedOption);
    setSelectedSubDepartment('')
    fetchSubDepartments(selectedOption.value);
    fetchNoOfRec(email, selectedMedicalField)
  };

  const fetchSubDepartments = (medicalFieldId) => {
    ApiService.img_getSubDepartmentsByMedicalFieldId(medicalFieldId)
      .then(response => {
        const options = response.data.map(subDept => ({ value: subDept.id, label: subDept.name, flag: subDept.flag }));
        setSubDepartments(options);
        setCurrentIndex(0); // Reset the index when the medical field changes
        setSelectedSubDepartment(options[0]); // Automatically select the first sub-department
        fetchSubDepartmentDescription(selectedMedicalField?.value, options[0]?.value);
        fetchSubDepartmentFlag(email, options[0]?.value);
      })
      .catch(error => {
        console.error('Error fetching sub-departments:', error);
      });
      fetchNoOfRec(email, selectedMedicalField)

  };

  const handleSubDepartmentChange = (selectedOption) => {
    const index = subDepartments.findIndex(subDept => subDept.value === selectedOption.value);
    setCurrentIndex(index);
    setSelectedSubDepartment(selectedOption);
    fetchSubDepartmentDescription(selectedMedicalField.value, selectedOption.value);
    fetchSubDepartmentFlag(email, selectedOption.value);
    fetchNoOfRec(email, selectedMedicalField)
  };

  const fetchSubDepartmentDescription = (medicalFieldId, subDepartmentId) => {
    ApiService.img_getSubDepartmentDescription(medicalFieldId, subDepartmentId)
      .then(response => {
        setDescription(response.data);
      })
      .catch(error => {
        console.error('Error fetching sub-department description:', error);
      });
  };

  const fetchSubDepartmentFlag = (email, subDepartmentId) => {
    setSid(subDepartmentId);
    ApiService.img_getSubDepartmentFlag(email, subDepartmentId)
      .then(response => {
        setFlag(response.data);
      })
      .catch(error => {
        console.error('Error fetching sub-department flag:', error);
      });
  };

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      handleSubDepartmentChange(subDepartments[currentIndex - 1]);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < subDepartments.length - 1) {
      handleSubDepartmentChange(subDepartments[currentIndex + 1]);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.flag ? 'green' : 'black',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.flag ? 'green' : 'black',
    }),
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleRightClick,
    onSwipedRight: handleLeftClick,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const fetchNoOfRec = (email, selectedMedicalField) => {
    ApiService.img_getReadPrescription(email, selectedMedicalField.value)
      .then(response => {
        setNorec(response.data);
      })
      .catch(error => {
        console.error('Error fetching no of read recording', error);
      });
  };


  

  return (
    <div>
      <div className='header fixed-top'>Medical Fields and Sub-Departments</div>
      <div className="container mt-5 p-5">
        <label className='email-label'>Your data will be saved to this Account</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input-field"
          disabled
          required
          
        />
        <div className="row">
          <div className="col">
            <label htmlFor="medicalField">Medical Field:</label>
            <Select
              id="medicalField"
              options={medicalFields}
              onChange={handleMedicalFieldChange}
              value={selectedMedicalField}
              placeholder="Select a medical field"
            />
          </div>
          <div className="col">
            <label htmlFor="subDepartment">Sub-Department:</label>
            <Select
              id="subDepartment"
              options={subDepartments}
              onChange={handleSubDepartmentChange}
              value={selectedSubDepartment}
              placeholder="Select a sub-department"
              styles={customStyles}
            />
          </div>
        </div>
        {description && (
          <div className="description-container" {...swipeHandlers}>
            <h5>{norec}/{subDepartments.length}</h5>
            <h3>Description:</h3>
            <div className="description-scrollable">
              <p style={{ color: flag ? 'green' : 'black' }}>{description}</p>
            </div>
            <div className="navigation-buttons">
              <button className="left-button" onClick={handleLeftClick} disabled={currentIndex === 0}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="right-button" onClick={handleRightClick} disabled={currentIndex === subDepartments.length - 1}>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <FileUpload email={email} medicalField={selectedMedicalField?.label} subDepartment={selectedSubDepartment?.label} sid={sid} mfid={selectedMedicalField.value}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageMainPage;
