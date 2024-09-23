// "use client";

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import '../styles/AddJobForm.css'; // Import the CSS file

// const AddJobForm: React.FC = () => {
//   return (
//     <>
//       <header className="hiring-header1">
//         <div className="hiring-logo1">
//           <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
//           <h1 className="hiring-app-name1">Applicants First</h1>
//         </div>
//         <div className="hiring-user-info1">
//           <span>Hello, Applicant</span>
//           <Link href="/hiring" legacyBehavior>
//             <button className="back-button1">Back</button>
//           </Link>
//         </div>
//       </header>

//       <div className="add-job-container">
//         <header className="form-header">
//           <h2>Add New Job</h2>
//         </header>
//         <form className="job-form">
//           <div className="form-group">
//             <label htmlFor="jobName">Job Name</label>
//             <input type="text" id="jobName" name="jobName" className="form-input" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="position">Position</label>
//             <input type="text" id="position" name="position" className="form-input" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea id="description" name="description" className="form-input" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="location">Location (City, State)</label>
//             <input type="text" id="location" name="location" className="form-input" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="salary">Salary Range (USD)</label>
//             <input type="text" id="salary" name="salary" className="form-input" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="requirements">Special Requirements</label>
//             <textarea id="requirements" name="requirements" className="form-input" />
//           </div>
//           <div className="form-buttons">
//             <button type="button" className="review-button">Review</button>
//             <button type="submit" className="post-button">Post</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddJobForm;
