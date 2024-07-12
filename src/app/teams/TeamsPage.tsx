import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-modal';
import '../styles/TeamsFeature.css'; // Adjust the path as necessary

interface Employee {
  name: string;
  role: string;
  email: string;
  hireDate: string;
}


const TeamsPage: React.FC = () => {
  const employees: Employee[] = [
    // This will be filled with actual data later
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="teams-container">
      <header className="header">
        <div className="logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="app-name">Applicants First</h1>
        </div>
        <div className="top-buttons">
        <button className="button" onClick={openModal}>Invite</button>
          <Link href="/login-form"><button className="button">Log Out</button></Link>
        </div>
      </header>

      <Link href="/admin-dashboard" legacyBehavior>
        <button className="back-button">Back</button>
      </Link>

      <h2 className="teams-title">Teams</h2>
      <div className="teams-table-wrapper">
        <table className="teams-table">
          <thead>
            <tr className="teams-table-header">
              <th className="teams-table-header-cell">Name</th>
              <th className="teams-table-header-cell">Role</th>
              <th className="teams-table-header-cell">Email</th>
              <th className="teams-table-header-cell">Hire Date</th>
            </tr>
          </thead>
          <tbody className="teams-table-body">
            {employees.map((employee, index) => (
              <tr key={index} className="teams-table-row">
                <td className="teams-table-cell">
                  <a href="#" className="teams-table-link">{employee.name}</a>
                </td>
                <td className="teams-table-cell">{employee.role}</td>
                <td className="teams-table-cell">{employee.email}</td>
                <td className="teams-table-cell">{employee.hireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">Please Enter Email</div>
        <div className="modal-body">
          <input
            type="email"
            placeholder="Email"
            className="form-input w-full"
          />
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className="close-button">Close</button>
          <button onClick={closeModal} className="send-button">Send Invitation</button>
        </div>
      </Modal>
    </div>
  );
};

export default TeamsPage;
