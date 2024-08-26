



// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [email, setEmail] = useState('');
//   const [medicalField, setMedicalField] = useState('');
//   const [subDepartment, setSubDepartment] = useState('');
//   const [prescription, setPrescription] = useState('');


//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile || !email || !medicalField || !subDepartment || !prescription) {
//       alert('Please fill in all fields and select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('email', email);
//     formData.append('medicalField', medicalField);
//     formData.append('subDepartment', subDepartment);
//     formData.append('prescription', prescription);

//     try {
//       const response = await axios.post('http://localhost:8080/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert(`File uploaded successfully: ${response.data}`);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Error uploading file');
//     }
//   };

//   const handleCapture = async () => {
//     const video = document.createElement('video');
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       video.srcObject = stream;
//       video.play();

//       document.body.appendChild(video);
//       document.body.appendChild(canvas);

//       video.addEventListener('click', () => {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         video.srcObject.getTracks().forEach(track => track.stop());
//         const dataURL = canvas.toDataURL('image/png');
//         canvas.remove();
//         video.remove();

//         const blob = dataURLtoBlob(dataURL);
//         const file = new File([blob], 'captured_image.png', { type: 'image/png' });
//         setSelectedFile(file);
//       });
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//       alert('Error accessing camera');
//     }
//   };

//   const dataURLtoBlob = (dataURL) => {
//     const arr = dataURL.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
//   };

//   return (
//     <div className="container pt-5">
//       <h2 className="text-center m-4 fw-bold">Upload Image File or Capture Image</h2>
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-5">
//           <div className="card p-4 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
//             <div className="form-group mb-3">

//               <input 
//                 type="email" 
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//               />
//             </div>
//             <div className="form-group mb-3">

//               <input 
//                 type="text" 
//                 id="medicalField"
//                 className="form-control"
//                 placeholder="Enter medical field" 
//                 value={medicalField} 
//                 onChange={(e) => setMedicalField(e.target.value)} 
//               />
//             </div>
//             <div className="form-group mb-3">

//               <input 
//                 type="text" 
//                 id="subDepartment"
//                 className="form-control"
//                 placeholder="Enter sub-department" 
//                 value={subDepartment} 
//                 onChange={(e) => setSubDepartment(e.target.value)} 
//               />
//             </div>
//             <div className="form-group mb-3">

//               <textarea
//                 id="prescription"
//                 className="form-control"
//                 placeholder="Enter prescription"
//                 value={prescription}
//                 onChange={(e) => setPrescription(e.target.value)}
//                 rows="4"
//               />
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="file" className="form-label text-secondary">File Upload</label>
//               <input 
//                 type="file" 
//                 id="file"
//                 className="form-control"
//                 onChange={handleFileChange} 
//               />
//             </div>
//             <div className="d-flex justify-content-between">
//               <button onClick={handleUpload} className="btn btn-primary">
//                 Upload File
//               </button>
//               <button onClick={handleCapture} className="btn btn-secondary">
//                 Capture Image
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;




import React, { useState } from 'react';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload = ({ email, medicalField, subDepartment, sid, mfid }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !email || !medicalField || !subDepartment) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', email);
    formData.append('medicalField', medicalField);
    formData.append('subDepartment', subDepartment);

    try {
      const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(`File uploaded successfully: ${response.data}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }

    console.log('jai shree krishna');
    console.log(email);
    console.log(true);
    console.log(sid);
    addFlagStatus(email, true, sid, mfid);
  };



  // Add flag status to the server
  const addFlagStatus = async (email, flag, subDepartmentId, medicalFieldId) => {
    console.log("here all your data")
    console.log(email)
    console.log(flag)
    console.log(subDepartmentId)
    console.log(medicalField)

    try {
      const flagStatusObj = { email, flag, subDepartmentId, medicalFieldId };
      console.log(flagStatusObj);
      const response = await axios.post('https://datacollection-backend-eb040f587829.herokuapp.com/apii/add-flag-status', flagStatusObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      setAudioUrl(response.data);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  // const handleCapture = async () => {
  //   const video = document.createElement('video');
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');

  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     video.srcObject = stream;
  //     video.play();

  //     document.body.appendChild(video);
  //     document.body.appendChild(canvas);

  //     video.addEventListener('click', () => {
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;
  //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //       video.srcObject.getTracks().forEach(track => track.stop());
  //       const dataURL = canvas.toDataURL('image/png');
  //       canvas.remove();
  //       video.remove();

  //       const blob = dataURLtoBlob(dataURL);
  //       const file = new File([blob], 'captured_image.png', { type: 'image/png' });
  //       setSelectedFile(file);
  //     });
  //   } catch (error) {
  //     console.error('Error accessing camera:', error);
  //     alert('Error accessing camera');
  //   }
  // };

  // const dataURLtoBlob = (dataURL) => {
  //   const arr = dataURL.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], { type: mime });
  // };

  return (
    <div className="container pt-5">

      <div className="row justify-content-center">
        <div className="form-group mb-3">
          <label htmlFor="file" className="form-label text-secondary">Upload Image File or Capture Image</label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="container-fluid justify-content-center">
          <button onClick={handleUpload} className="btn btn-primary">
            Upload File
          </button>
{/*           <button onClick={handleCapture} className="btn btn-secondary">
            Capture Image
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;


