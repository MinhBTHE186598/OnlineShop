import Header from '../components/common/Header'
import AdminAction from '../components/homeAdmin/AdminActionList'
import Footer from '../components/common/Footer'
import { useUser } from '../components/context/UserContext'
import { useNavigate,Navigate } from "react-router-dom";

function HomeAdmin() {
    const navigate = useNavigate();
    const { user, setUser, userRole, setUserRole, isLogin, setIsLogin } = useUser();
    if(isLogin&&userRole==='Admin'){
    return (
        <div>
            <Header/>
            <AdminAction/>
            <Footer/>
        </div>
        
    )}else{
        return(
            <Navigate to="/"/>
        )
    }
}

export default HomeAdmin