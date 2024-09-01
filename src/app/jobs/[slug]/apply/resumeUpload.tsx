'use client'

import React, { useCallback } from 'react'
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'

type FileWithPath = File & { path?: string }

interface ResumeUploadProps {
  setResumeFile: (file: File | null) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ setResumeFile }) => {
  const onDrop: DropzoneOptions['onDrop'] = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles[0]) {
        setResumeFile(acceptedFiles[0]);
      }
    },
    [setResumeFile]
  )

  const { getRootProps, getInputProps, isDragActive, acceptedFiles }: DropzoneState =
    useDropzone({ 
      onDrop,
      accept: {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
      },
      maxFiles: 1
    })

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #0070f3',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the resume file here...</p>
        ) : (
          <p>Drag &apos;n&apos; drop a resume file here, or click to select one</p>
        )}
      </div>
      {acceptedFiles.length > 0 && (
        <div>
          <p>Selected file: {acceptedFiles[0].name}</p>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload