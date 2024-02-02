import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ auth, children }) => {
    console.log("Auth state:", auth); 
    return auth.token ? children : <Navigate to="/login" replace />;
};


export default PrivateRoutes;
