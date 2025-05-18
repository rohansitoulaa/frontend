interface NavComProps {
  onClick: () => void;
  className?: string;
  imgSrc: string;
  value: string;
  isActive?: boolean;
}

const NavComp = ({
  onClick,
  className,
  imgSrc,
  value,
  isActive,
}: NavComProps) => {
  return (
    <div
      className={`flex gap-3 
        ${isActive ? "bg-[#b0b6bb] text-[#0e0303] p-2 rounded-xl" : "hover:bg-gray-200"} 
        ${className} cursor-pointer items-center justify-start`}
      onClick={onClick}
    >
      <img src={imgSrc} alt="adminImg" />
      <p>{value}</p>
    </div>
  );
};

export default NavComp;
