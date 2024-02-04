import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || initialValue;
    });

    useEffect(() => {
        if (value == false) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value]);
    
    return [value, setValue];
}