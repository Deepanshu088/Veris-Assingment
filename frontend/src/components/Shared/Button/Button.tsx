import { MouseEventHandler } from "react";

type ButtonType = {
	type?: "submit" | "button" | "reset" | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	className?: string;
	buttonStyle?: "primary" | "secondary";
	children: any;
}

const Button = ({ type = "submit", onClick = () => {}, disabled, className, children, buttonStyle }: ButtonType) => {
	
	let classes = " border-2 py-2 px-4 rounded text-center whitespace-nowrap h-min ";
	switch(buttonStyle) {
		case "primary": 
			classes += "font-medium bg-[#007bff] border-[#007bff] mx-2 text-white"
			break;
		case "secondary": 
			classes += "font-medium"
			break;
	}

	return (
		<button
			className={` ${classes} ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button;