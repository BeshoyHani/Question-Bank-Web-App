import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ child, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("username");
    const myType = localStorage.getItem("user-type");
    const isTypeAllowed = allowedRoles.find(type => type === myType);

    if (isAuthenticated === undefined) {
        return <Navigate to="/login" replace />;
    } else if (!isTypeAllowed) {
        return <Navigate to="/" replace />;;
    }
    else {
        return child;
    }
};

export const ProtectRegisterationRoute = ({ child }) => {
    const isAuthenticated = localStorage.getItem("username");
    if (isAuthenticated) {
        return <Navigate to='/' replace />;
    }
    return child;
};