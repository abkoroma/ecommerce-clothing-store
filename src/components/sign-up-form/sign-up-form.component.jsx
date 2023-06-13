import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";
import { SignupContainer } from './sign-up-form.style.jsx';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function handleChange(e) {
        setFormFields({...formFields, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords does not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('user creation encounter an error', err)
            }
        }
    }

    return (
        <SignupContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignupContainer>
    )
}