import { Resend } from 'resend'
import crypto from 'crypto' // Import the crypto module
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const { email, organizationId } = await req.json();

  // Generate invitation token
  const token = crypto.randomBytes(32).toString('hex');
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24); // Token valid for 24 hours

  try {
    // Save the token and email in the database using Prisma
    const invitation = await prisma.invitations.create({
      data: {
        email,
        token,
        organizationId: parseInt(organizationId, 10),
        expires_at: expirationDate,
      },
    });

    // Send invitation email
    const invitationLink = `${process.env.NEXT_PUBLIC_URL}/accept-invitation?token=${token}`;
    const emailResponse = await resend.emails.send({
      to: email,
      from: 'team@applicants1st.com',
      subject: 'You are invited to join our organization',
      html: `<p>Click the link to accept the invitation: <a href="${invitationLink}">${invitationLink}</a></p>`,
    });

    return NextResponse.json({ message: 'Invitation sent', emailResponse });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}