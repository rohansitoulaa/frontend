import React from 'react'
import NavBar from '../NavBar/NavBar'
import Create from '../../pages/createArticle/Create'
import { useModalStore } from '../../stores/useModalStore'


const HomePage = () => {
    const {isOpen} = useModalStore()
    console.log(isOpen);
    
  return (
    <div>
        <NavBar />
        {isOpen && <Create />}
    </div>
  )
}

export default HomePage