export const loginSchema = {
  email: 'required|email|min:5|max:98',
  password: 'required|alpha_dash|min:8|max:20'
}

export const signUpSchema = {
  ...loginSchema,
  firstName: 'required|string|min:2|max:48',
  lastName: 'required|string|min:2|max:48',
  confirmPassword: 'required|alpha_dash|min:8|max:20|same:password'
}
