import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { useUser } from '../components/context/UserContext'
import {Navigate } from "react-router-dom";
import ShipperAction from '../components/homeShipper/ShipperAction';

function HomeShipper() {
    const {  userRole, isLogin} = useUser();
    if(isLogin&&userRole==='Admin'){
    return (
        <div>
            <Header/>
            <ShipperAction/>
            <Footer/>
        </div>
        
    )}else{
        return(
            <Navigate to="/"/>
        )
    }
}

export default HomeShipper