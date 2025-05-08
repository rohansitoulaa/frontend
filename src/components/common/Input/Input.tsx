import { useState } from "react";

type InputProps = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    name?: string;
    value?: string;
    error?: string;
};

const Input = ({ onChange, placeholder = "Enter input value", type = "text", onBlur, name, value, error }: InputProps) => {
    const [isEyeOn, setIsEyeon] = useState<boolean>(false);

    const handleEyesOnClick = () => {
        setIsEyeon(!isEyeOn);
        console.log(isEyeOn);
    };

    return (
        <div className="w-full flex items-center border-[1.9px] rounded-md relative">
            <div className="w-full py-3.5 px-2 bg-transparent flex items-center">
                <input
                    className={`placeholder:text-[#777d50] outline-none w-200 ${error ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    type={isEyeOn ? "password" : "text"} // Adjust the type dynamically
                />
            </div>
            {type === "password" && (
                <img
                    className="w-5 h-5 cursor-pointer absolute right-3"
                    onClick={handleEyesOnClick}
                    src={isEyeOn ? "images/eyes_filled.png" : "images/eyes_hollow.png"}
                    alt="toggle visibility"
                />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Error message */}
        </div>
    );
};

export default Input;
