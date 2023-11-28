import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export default function AdminGuard(props) {
    const { isAdmin } = useContext(AuthContext);

    if(!isAdmin) {
        return <Navigate to={'/'}/>
    }

    return props.children
}