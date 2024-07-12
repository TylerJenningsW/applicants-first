'use client'

import React from 'react'
import { Profile, Organization } from '../../../utils/types'

interface AdminInfoProps {
  profile: Profile
  organization: Organization
}

const AdminInfo: React.FC<AdminInfoProps> = ({ profile, organization }) => {
  return (
    <div>
      {profile && (
        <p>
          Name: {profile.first_name} {profile.last_name}
        </p>
      )}
      {organization && <p>Organization: {organization.organizationname}</p>}
    </div>
  )
}

export default AdminInfo
