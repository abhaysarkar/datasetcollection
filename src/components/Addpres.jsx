


import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Modal from 'react-modal';
import ApiService from '../services/ApiService';
import './Addpres.css';

Modal.setAppElement('#root');

function Addpres() {
  const [medicalFields, setMedicalFields] = useState([]);
  const [selectedMedicalField, setSelectedMedicalField] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedicalField, setNewMedicalField] = useState('');
  const [message, setMessage] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);

  useEffect(() => {
    fetchMedicalFields();
  }, []);

  const fetchMedicalFields = () => {
    ApiService.getAllMedicalFields()
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
  };

  const openConfirmModal = (callback) => {
    setConfirmCallback(() => callback);
    setIsConfirmModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediacalFieldId = selectedMedicalField?.value;

    if (!mediacalFieldId) {
      alert('Please select a medical field.');
      return;
    }

    const subDept = { name, description };

    openConfirmModal(async () => {
      try {
        const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/api/medical-fields/${mediacalFieldId}/sub-departments`, subDept, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }

      setSelectedMedicalField(null);
      setName('');
      setDescription('');
    });
  };

  const handleAddMedicalField = async (e) => {
    e.preventDefault();

    const newField = { name: newMedicalField };

    try {
      const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/api/medical-fields', newField, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setNewMedicalField('');
      setMessage(`Medical field "${response.data.name}" is added successfully`);
      fetchMedicalFields(); // Refresh the medical fields list
    } catch (error) {
      console.error('Error adding medical field:', error);
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Add More Sub Department and Prescription</h1>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="medicalField" className="form-label">Medical Field:</label>
              <Select
                id="medicalField"
                options={medicalFields}
                onChange={handleMedicalFieldChange}
                value={selectedMedicalField}
                placeholder="Select a medical field"
                required
              />
              <button type="button" onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-2">
                Add Medical Field
              </button>
            </div>
            <div className="col">
              <label htmlFor="subDepartment" className="form-label">Sub-Department:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sub department name"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                name="description"
                className="form-control textarea-large"
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                style={{ height: '150px' }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        contentLabel="Confirm Action"
        className="modal-dialog"
        overlayClassName="modal-backdrop"
      >
        <div className="modal-content">
          {/* <div className="modal-header">
            <h5 className="modal-title">Confirm Action</h5>
            <button type="button" className="btn-close" onClick={() => setIsConfirmModalOpen(false)}></button>
          </div> */}
          <div className="modal-body">
            <p>Are you sure you want to add this description?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={() => { confirmCallback(); setIsConfirmModalOpen(false); }}>Confirm</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Medical Field"
        className="modal-dialog"
        overlayClassName="modal-backdrop"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Medical Field</h5>
            <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddMedicalField}>
              <div className="mb-3">
                <label htmlFor="newMedicalField" className="form-label">Medical Field Name:</label>
                <input
                  type="text"
                  id="newMedicalField"
                  value={newMedicalField}
                  onChange={(e) => setNewMedicalField(e.target.value)}
                  placeholder="Enter new medical field name"
                  className="form-control"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
                <p>{message}</p>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Addpres;










