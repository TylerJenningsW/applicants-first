import { login } from './actions' // Adjust the path as necessary

export default function LoginPage() {
  return (
    <form className="flex flex-col justify-center items-center" method="POST">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <button type="submit" formAction={login}>
        Log in
      </button>
    </form>
  )
}
