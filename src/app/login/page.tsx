import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col justify-center items-center" method="POST">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <label htmlFor="role">Role:</label>
      <select id="role" name="role" required>
        <option value="applicant">Applicant</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <label htmlFor="first_name">First Name:</label>
      <input id="first_name" name="first_name" type="text" required />

      <label htmlFor="last_name">Last Name:</label>
      <input id="last_name" name="last_name" type="text" required />

      <label htmlFor="organization_id">
        Organization ID (Recruiters only):
      </label>
      <input id="organization_id" name="organization_id" type="number" />

      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}
