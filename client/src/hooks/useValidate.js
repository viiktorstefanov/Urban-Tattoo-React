import { useState } from "react";

export default function useValidate(primaryValues, values, validator) {
    const [validationErrors, setValidationErrors] = useState(primaryValues);

    function onBlur(e) {
        const validation = validator[e.target.name];

        if (!validation(e.target.value, values)) {
            setValidationErrors(state => ({ ...state, [e.target.name]: true }));
        } else {
            setValidationErrors(state => ({ ...state, [e.target.name]: false }));
        }

        if (primaryValues.hasOwnProperty('repeatPassword')) {
            if (e.target.name === "password") {
                if (e.target.value !== values.repeatPassword && values.repeatPassword !== "") {
                    setValidationErrors(state => ({ ...state, repeatPassword: true }))
                } else {
                    setValidationErrors(state => ({ ...state, repeatPassword: false }))
                }
            }
        } 
    }
    return {validationErrors, onBlur}
};