// Import `motion` from Framer Motion to apply smooth animations to the button
import { motion } from 'framer-motion'; // Import motion from framer-motion

/**
 * ButtonProps defines the expected props for the custom Button component.
 */
type ButtonProps = {
    /** Optional click handler function */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
   /** Optional additional CSS classes */
  className?: string;
  /** Optional button label, defaults to "button" */
  value?: string;
  /** Optional theme of the button, defined in the `btn` object */
  btnTheme?: keyof typeof btn;
  /** Optional position of the chevron icon ("left" or "right") */
  chevronPosition?: 'left' | 'right';
  /** Optional disabled state of the button */
  disabled?: boolean;
};

/**
 * Predefined button themes with Tailwind CSS utility classes.
 */
const btn = {
  borderBlack: "border-2 border-black",
  blackBtn: "bg-[#000] text-[#fff]",
  noBg: "bg-transparent text-blue-600",
};

/**
 * Custom reusable Button component with animation and theming support.
 *
 * Renders a `div` styled as a button using Tailwind CSS, with optional animated hover/tap effects from Framer Motion,
 * customizable themes, a disabled state, and optional chevron icons on either side.
 */
const Button = ({
  onClick,
  className,
  value = "button",
  btnTheme = "blackBtn",
  chevronPosition,
  disabled = false,
}: ButtonProps) => {
  /**
   * Handles click event on the button.
   * If the button is not disabled, it triggers the provided onClick handler.
   */``
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`flex gap-2 items-center text-xl rounded-md px-5 py-2 w-fit ${btn[btnTheme]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || ''}`}
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 0.95 }} // Scale down on click
      transition={{ type: 'spring', stiffness: 300 }} // Smooth animation transition
    >
      {chevronPosition === "left" && (
        <motion.img
          className="w-5"
          src={btnTheme === "blackBtn" ? "images/chevron_white.png" : "images/chevron_black.png"}
          alt="left-chevron"
        />
      )}
      {value}
      {chevronPosition === "right" && (
        <img
          className="w-5 rotate-180"
          src={btnTheme === "blackBtn" ? "images/chevron_white.png" : "images/chevron_black.png"}
          alt="right-chevron"
        />
      )}
    </motion.div>
  );
};

export default Button;
