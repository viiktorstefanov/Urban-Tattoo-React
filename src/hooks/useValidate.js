import { useState } from "react";

export default function useValidate(initialValues, values, validator) {
    const [validationErrors, setValidationErrors] = useState(initialValues);

    function onBlur(e) {
        const validation = validator[e.target.name];

        if (!validation(e.target.value, values)) {
            setValidationErrors(state => ({ ...state, [e.target.name]: true }))
        } else {
            setValidationErrors(state => ({ ...state, [e.target.name]: false }))
        }

        if (initialValues.hasOwnProperty('confirmPassword')) {
            if (e.target.name == "password") {
                if (e.target.value != values.confirmPassword && values.confirmPassword != "") {
                    setValidationErrors(state => ({ ...state, confirmPassword: true }))
                } else {
                    setValidationErrors(state => ({ ...state, confirmPassword: false }))
                }
            }
        }
    }

    return {validationErrors, onBlur}
}