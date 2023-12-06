import { useEffect, useState } from "react";
import notification from "../service/notification";

export default function useValidate(primaryValues, values, validator, currentPageMessages) {
    const [validationErrors, setValidationErrors] = useState(primaryValues);
    const [currentTargetName, setCurrentTargetName] = useState(null);

    // useEffect(() => {
    //     if (currentTargetName && validationErrors[currentTargetName] === true) {
    //         notification.warning(currentPageMessages[currentTargetName]);
    //         setCurrentTargetName(null);
    //     }
    // }, [validationErrors, currentTargetName]);
    

    function onBlur(e) {
        const validation = validator[e.target.name];

        if (!validation(e.target.value, values)) {
            setValidationErrors(state => ({ ...state, [e.target.name]: true }));
            setCurrentTargetName(e.target.name);
        } else {
            setValidationErrors(state => ({ ...state, [e.target.name]: false }));
        }

        if (primaryValues.hasOwnProperty('repeatPassword')) {
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