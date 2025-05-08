interface NavComProps {
    onClick : () => void;
    className?: string;
    imgSrc: string;
    value: string;

}

const NavComp = ({onClick, className, imgSrc, value}:NavComProps) => {
  return (

    <div
    className={`flex gap-3 ${className}`}
    onClick={onClick}>
        <img src={imgSrc} alt="adminImg" />
        <p>{value}</p>
    </div>
  )
}

export default NavComp