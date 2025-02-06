export const userNameError = "This username already exists."
export const firstNameError = "First name should be 3-50 characters long and contain only letters and spaces."
export const lastNameError = "Last name should be 3-50 characters long and contain only letters and spaces."
export const emailError = "invalid email or already exists."
export const passError = "Password should be 8-20 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
export const pass2Error = "New password and confirm password do not match."
export const oldPassError = "Old password is incorrect."
export interface signupError {
    firstName: string[]
    lastName: string[],
    login: string[],
    email: string[],
    password: string[],
    password2: string[],
    old_password: string[]
}