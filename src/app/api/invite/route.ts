import { Resend } from 'resend'
import crypto from 'crypto' // Import the crypto module
import { getServerClient } from '../../../../utils/supabase/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

const resend = new Resend(process.env.RESEND_API_KEY!)
const supabase = getServerClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, organizationId } = req.body

    // Generate invitation token
    const token = crypto.randomBytes(32).toString('hex')
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + 24) // Token valid for 24 hours

    // Save the token and email in the database
    const { error } = await supabase
      .from('invitations')
      .insert([{ email, token, organizationId, expires_at: expirationDate }])

    if (error) {
      res.status(500).json({ error: 'Failed to create invitation' })
      return
    }

    // Send invitation email
    const invitationLink = `${process.env.NEXT_PUBLIC_URL}/accept-invitation?token=${token}`
    const emailResponse = await resend.emails.send({
      to: email,
      from: 'team@applicants1st.com',
      subject: 'You are invited to join our organization',
      html: `<p>Click the link to accept the invitation: <a href="${invitationLink}">${invitationLink}</a></p>`,
    })

    res.status(200).json({ message: 'Invitation sent', emailResponse })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
