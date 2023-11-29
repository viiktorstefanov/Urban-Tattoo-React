import { useState } from "react";

export default function useForm(primaryValues, onSubmitHandler) {
    const [ values, setValues ] = useState(primaryValues);

    const onChange = (e) => {
        setValues(state => ({...state, [e.target.name] : e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);

        // setValues(primaryValues);
    };

    return {
        values,
        onChange,
        onSubmit,
        setValues,
    }
};