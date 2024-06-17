import Header from '../components/common/Header'
import AdminAction from '../components/homeAdmin/AdminActionList'
import Footer from '../components/common/Footer'
import { useUser } from '../components/context/UserContext'
import {Navigate } from "react-router-dom";

function HomeAdmin() {
    const {  userRole, isLogin} = useUser();
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