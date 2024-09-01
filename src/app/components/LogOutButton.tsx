'use client'

import { useTransition } from 'react'
import { logout } from '../actions'
function LogOutButton() {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      className="logout-button"
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
    >
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}

export default LogOutButton
