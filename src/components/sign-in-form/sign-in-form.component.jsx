import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import { SigninContainer, ButtonsContainer } from './sign-in-form.style.jsx';

const defaultFormFields = {
    email: '',
    password: '',
}

export default function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function signInWithGoogle() {
        await signInWithGooglePopup();
    }

    async function handleChange(e) {
        setFormFields({...formFields, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(err) {
            switch(err.code) {
                case "auth/wrong-password": alert('incorrect password');
                    break;
                case "auth/user-not-found": alert('not user with this email');
                    break;
                default: console.log(err);
            }
        }
    }

    return (
        <SigninContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type="button" 
                        buttonType={BUTTON_TYPES_CLASSES.google} 
                        onClick={signInWithGoogle}
                    >
                        Google Sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SigninContainer>
    );
}