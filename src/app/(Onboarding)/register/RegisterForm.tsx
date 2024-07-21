'use client';

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import '@/app/styles/Register.css'
import { useForm } from 'react-hook-form'
import { RegisterFormValues } from '../../../../utils/types'
import { RegisterFormValidation } from '../../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from './actions'
import { useFormStatus } from 'react-dom'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm: React.FC = () => {
  const { pending } = useFormStatus()
  const [error, setError] = useState<string | null>(null)
  //Verify Email
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  
  const searchParams = useSearchParams()
  let role = searchParams.get('role') as string
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormValidation),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('role', role);

    try {
      await signup(formData)
      toast.success('Please verify your email!');
      setModalIsOpen(true);
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed');
    }
  }

  //Modal for toast notification
  
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className="form-input"
          />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className="form-input"
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="form-input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            className="form-input"
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="form-input"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="form-input"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <input id="role" name="role" type="hidden" value={role} />
        <button type="submit" className="register-button" disabled={pending}>
          Register
        </button>
      </form>

      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content1"
        overlayClassName="modal-overlay1"
      >
        <div className="modal-header1">Verify Email</div>
        <div className="modal-body1">
          <input
            type="text"
            placeholder="Enter verification code"
            className="form-input1 w-full"
          />
        </div>
        <div className="modal-footer1">
          <button onClick={closeModal} className="close-button1">Close</button>
          <button onClick={closeModal} className="send-button1">Verify</button>
        </div>
      </Modal>

      

    </div>
  );
};

export default RegisterForm;
