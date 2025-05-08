import Button from "../../components/common/Button/Button"
import { useNavigate } from "react-router-dom"

const NoLogin = () => {
    const navigate = useNavigate();
    const handleLoginOnClick = () =>{
        navigate("authorRegistration")
    }
  return (
    <div className='flex flex-col gap-20 justify-center items-center bg-[#c3c3cc] w-90 min-h-max rounded-xl p-10'>
        
         <div className="border-2 rounded-full p-2 border-[#6c6a6a]">
            <img src="images/profile.png" alt="" />
         </div>
         <Button btnTheme="borderBlack" value="Login/Signup" onClick={handleLoginOnClick}/>
    </div>
  )
}

export default NoLogin