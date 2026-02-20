import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: ("admin" | "user")[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const auth = useContext(AuthContext);

    if (!auth?.user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(auth.user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
