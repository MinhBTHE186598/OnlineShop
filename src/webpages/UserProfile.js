import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Profile from '../components/userProfile/userProfile'
import { useParams } from 'react-router-dom'

function UserProfile() {
    const { id } = useParams();
    return (
        <div>
                <Header/>
                <Profile id={id}/>
                <Footer/>
        </div>
    )
}
export default UserProfile