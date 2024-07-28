import React from 'react'

export default async function Invite({ email, organizationId }: { email: string, organizationId: string }) {
    const handleInvite = async () => {
        const inviteURL = '/api/invite'
        const response = await fetch(inviteURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                organizationId: organizationId,
            })
        })

        if (response.ok) {
            console.log('Invitation sent')
        } else {
            console.error('Failed to send invitation')
        }
    }
  return (
    <><button onClick={handleInvite}>Add User</button></>
  )
}

