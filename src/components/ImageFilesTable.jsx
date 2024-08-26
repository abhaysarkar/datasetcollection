import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './AudioFilesTable.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';
const ImageFilesTable = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [audioFiles, setAudioFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false); // New state for Admin modal
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [searchValues, setSearchValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        medicalField: '',
        subDepartment: '',
        city: '',
        state: ''
    });

    const [totalDuration, setTotalDuration] = useState('00:00:00');

    // State for Add Admin form
    const [adminForm, setAdminForm] = useState({
        email: '',
        password: ''
    });

    const itemsPerPage = 10;

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    useEffect(() => {
        filterAudioFiles();
    }, [searchValues, audioFiles]);


    useEffect(() => {
        calculateTotalDuration(filteredFiles);
    }, [filteredFiles]);

    const fetchAudioFiles = () => {
        axios.get('https://datacollection-backend-eb040f587829.herokuapp.com/api/image-files')
            .then(response => {
                setAudioFiles(response.data);
                setFilteredFiles(response.data);
                setPageCount(Math.ceil(response.data.length / itemsPerPage));
            })
            .catch(error => console.error('Error fetching data: ', error));
    };

    const deleteAudioFile = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this audio file?");
        if (confirmed) {
            axios.delete(`https://datacollection-backend-eb040f587829.herokuapp.com/api/image-files/${id}`)
                .then(() => {
                    setAudioFiles(audioFiles.filter(file => file.id !== id));
                })
                .catch(error => console.error('Error deleting file: ', error));
        }
    };

    const fetchDescription = (subDepartmentName) => {
        axios.get(`https://datacollection-backend-eb040f587829.herokuapp.com/apii/sub-departments/description/${subDepartmentName}`)
            .then(response => setDescription(response.data))
            .catch(error => console.error('Error fetching description: ', error));
    };

    const handleApproveClick = (file) => {
        setSelectedFile(file);
        fetchDescription(file.subDepartment);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleApprove = async () => {
        const { id, email, medicalField, subDepartment, fileName = "audio.wav", fileUrl } = selectedFile;
        const newAudioFile = { id, email, medicalField, subDepartment, fileName, fileUrl, flag: true };

        const confirmed = window.confirm("Are you sure you want to Approve this image");
        if (confirmed) {
            try {
                const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/api/image-files/update-for-approve', newAudioFile, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response:', response.data);
                // Update the local state with the approved file
                setAudioFiles(audioFiles.map(file => (file.id === id ? { ...file, flag: true } : file)));
                setShowDialog(false);
            } catch (error) {
                console.error('Error approving audio file:', error);
            }
        }
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValues({
            ...searchValues,
            [name]: value
        });
    };

    const filterAudioFiles = () => {
        let filtered = audioFiles.filter(file => {
            return (
                (searchValues.name === '' || file.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
                (searchValues.email === '' || file.email.toLowerCase().includes(searchValues.email.toLowerCase())) &&
                (searchValues.age === '' || file.age === parseInt(searchValues.age)) &&
                (searchValues.gender === '' || file.gender.toLowerCase().includes(searchValues.gender.toLowerCase())) &&
                (searchValues.medicalField === '' || file.medicalField.toLowerCase().includes(searchValues.medicalField.toLowerCase())) &&
                (searchValues.subDepartment === '' || file.subDepartment.toLowerCase().includes(searchValues.subDepartment.toLowerCase())) &&
                (searchValues.state === '' || file.state.toLowerCase().includes(searchValues.state.toLowerCase())) &&
                (searchValues.city === '' || file.city.toLowerCase().includes(searchValues.city.toLowerCase()))
            );
        });
        setFilteredFiles(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayFiles = filteredFiles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleAddAdminClick = () => {
        setShowAdminModal(true);
    };

    const handleCloseAdminModal = () => {
        setMessage('')
        setShowAdminModal(false);
    };

    const handleAdminFormChange = (e) => {
        const { name, value } = e.target;
        setAdminForm({
            ...adminForm,
            [name]: value
        });
    };

    const handleAdminFormSubmit = async (e) => {
        e.preventDefault();
        // Submit the form data
        console.log('Admin Form Data:', adminForm);
        // Here, you would typically send the form data to your API

        try {
            const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/add-admin', adminForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            setMessage("Admin Added Successfully")
            // setNewMedicalField('');
            // setMessage(`Medical field "${response.data.name}" is Added successfully`)
            //console.log(message)
            //alert(message)
            //setIsModalOpen(false);
            //fetchMedicalFields(); // Refresh the medical fields list

        } catch (error) {
            console.error('Error while adding Admin:', error);
        }

        setAdminForm({
            email: '',
            password: ''
        });
        //handleCloseAdminModal();
    };






    const calculateTotalDuration = (files) => {
        let totalSeconds = 0;
        let filesProcessed = 0;
        const filesToProcess = files.length;

        files.forEach((file) => {
            const audio = new Audio(file.fileUrl);

            audio.addEventListener('loadedmetadata', () => {
                totalSeconds += audio.duration;
                filesProcessed += 1;

                if (filesProcessed === filesToProcess) {
                    updateTotalDuration(totalSeconds);
                }
            });

            if (audio.readyState >= 2) {
                totalSeconds += audio.duration;
                filesProcessed += 1;

                if (filesProcessed === filesToProcess) {
                    updateTotalDuration(totalSeconds);
                }
            }
        });
    };

    const updateTotalDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        setTotalDuration(
            `${hours.toString().padStart(3, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    };

    return (
        <div className="container-fluid bg-secondary">
            <div className='fixed-top bg-secondary p-1'>
                <h1 className="mb-2 text-center text-white fw-bold">Audio Files</h1>

                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by Name"
                            name="name"
                            value={searchValues.name}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by Email"
                            name="email"
                            value={searchValues.email}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            placeholder="Search by Age"
                            name="age"
                            value={searchValues.age}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by Gender"
                            name="gender"
                            value={searchValues.gender}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by Medical Field"
                            name="medicalField"
                            value={searchValues.medicalField}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by Sub-dept"
                            name="subDepartment"
                            value={searchValues.subDepartment}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="state"
                            name="state"
                            value={searchValues.state}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="city"
                            name="city"
                            value={searchValues.city}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button className="form-control btn-danger" onClick={() => navigate("/image-addpres")}>Add Database</button>
                    </div>
                    <div className="col">
                        <button className="form-control btn-warning" onClick={handleAddAdminClick}>Add Admin</button>
                    </div>
                </div>
            </div>
            <div className="table-container bg-dark" style={{ marginTop: '200px' }}>
                <table className="table table-hover table-secondary p-2">
                    <thead>
                        <tr>
                            <th className='id'>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className='age'>Age</th>
                            <th className='gender'>Gender</th>
                            <th>Medical Field</th>
                            <th>Sub-Department</th>
                            <th className='city'>City</th>
                            <th className='state'>State</th>
                            {/* <th>Audio File</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {displayFiles.map(file => (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>{file.email}</td>
                                <td>{file.age}</td>
                                <td>{file.gender}</td>
                                <td>{file.medicalField}</td>
                                <td>{file.subDepartment}</td>
                                <td>{file.city}</td>
                                <td>{file.state}</td>
                                {/* <td><audio controls src={file.fileUrl} /></td> */}
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteAudioFile(file.id)}>
                                        Delete
                                    </button>
                                    <br />
                                    <button
                                        className={`btn ${file.flag ? 'btn-success' : 'btn-outline-primary'}`}
                                        onClick={() => !file.flag && handleApproveClick(file)}
                                        disabled={file.flag}
                                    >
                                        {file.flag ? 'Approved' : 'Approve'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
            />

            {selectedFile && (
                <Modal show={showDialog} onHide={handleCloseDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Approve Image File</Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body>
                        
                        <img src={selectedFile.fileUrl} alt="Selected" className="img-fluid" />
                        <div className="mt-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                readOnly
                            />
                        </div>
                    </Modal.Body> */}
                    <Modal.Body className="d-flex flex-column align-items-center">
                        <img src={selectedFile.fileUrl} alt="Selected" className="img-fluid" />
                        <div className="mt-3 w-100">
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                readOnly
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDialog}>
                            Exit
                        </Button>
                        <Button variant="success" onClick={handleApprove}>
                            Approve It
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Add Admin Modal */}
            <Modal show={showAdminModal} onHide={handleCloseAdminModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAdminFormSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={adminForm.email}
                                onChange={handleAdminFormChange}
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={adminForm.password}
                                onChange={handleAdminFormChange}
                                required
                            />
                        </Form.Group> */}
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    name="password"
                                    value={adminForm.password}
                                    onChange={handleAdminFormChange}
                                    required
                                />
                                <Button
                                    // variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {/* {showPassword ? "Hide" : "Show"} */}
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </Button>
                            </div>
                        </Form.Group>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            <p>{message}</p>
                        </div>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdminModal}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default ImageFilesTable;