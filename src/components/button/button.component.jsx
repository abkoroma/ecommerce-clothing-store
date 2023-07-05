import { 
    BaseButton, 
    GoogleSighnInButton, 
    InvertedButton,
    ButtonSpinner,
} from './button.styles.jsx';

export const BUTTON_TYPES_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

function getButton(buttonType = BUTTON_TYPES_CLASSES.base) {
    return ({
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSighnInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType]);
}

export default function Button({ children, buttonType, isLoading, ...props }) {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...props}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
}