import NavComp from "./NavComp";
import { navItems } from "./navItem";

const Navbar = () => {
  const handleOnClick = (value:string) => {
    console.log(value);
    
  };

  return (
    <div className="flex flex-col gap-5 mr-10 border-2 rounded-4xl w-1/5">
      <div>
        <img 
        className="w-40"
        src="images/logo.png" alt="" />
      </div>
      {navItems.map((item, index) => (
        <NavComp
          key={index}
          onClick={() => handleOnClick(item.value)}
          className={` ${index ==5? "pt-15 ":""} ml-5`}
          value={item.value}
          imgSrc={item.imgSrc}
        />
      ))}
    </div>
  );
};
export default Navbar;
