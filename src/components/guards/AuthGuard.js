import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <></>
    )
};