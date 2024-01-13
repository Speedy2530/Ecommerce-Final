import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    // make it so only logged in users can get to shipping page
    const { userInfo } = useSelector(state => state.auth)

    return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
