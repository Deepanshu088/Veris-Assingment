import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faCircleInfo,
	faEye,
	faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import validate from "../../../utilities/validator";
import { MouseEventHandler, useCallback, useRef, useState } from "react";

type InputType = {
	id: string;
	name: string;
	label: string;
	type?: string;
	placeholder: string;
	className?: string;
	isError?: boolean;
	errorMessage?: string;
	readOnly?: boolean;
	initialValue?: string; // todo not optional
	onChange?: Function;
	validators?: string[]
	buttonName?: string;
	buttonOnClick?: MouseEventHandler;
	accept?: string;
}

const Input = ({
	id,
	name,
	label,
	type = "string",
	placeholder,
	className = "",
	isError = false,
	errorMessage = "Invalid value!!!",
	readOnly = false,
	initialValue = "",
	onChange = () => {},
	validators = [],
	buttonName,
	buttonOnClick,
	accept
}: InputType) => {
	const [showPassword, setShowPassword] = useState(false);
	const fileUploadInputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);

	const onChangeHandler = useCallback( (e: any) => {
		const value = e.target.value;
		let isValid = validate(value, validators);
		onChange(id, value, isValid);
	}, [id, validators, onChange]);

	const uploadFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files || !e.target.files[0]) {
			return;
		}
		let files = Array.from(e.target.files);
		onChange(id, files)
		setFiles(files);
    }, [id, onChange])

	let inputFieldComponent : JSX.Element = (
		<input
			id={id}
			name={name}
			className={`py-2 px-4 w-full rounded-md focus:outline-none bg-[#F7F7F9] ${
				readOnly && " cursor-not-allowed "
			}`}
			onChange={onChangeHandler}
			type={type}
			value={initialValue}
			placeholder={placeholder}
			readOnly={readOnly}
			autoComplete="off"
		/>
	);

	if (type === "password") {
		inputFieldComponent = (
			<div className="py-2 px-4 w-full rounded focus:outline-none relative">
				<input
					id={id}
					name={name}
					className="w-full rounded focus:outline-none"
					type={showPassword ? "text" : "password"}
					placeholder={placeholder || "********"}
					onChange={onChangeHandler}
					autoComplete="off"
					autoCorrect="off"
					value={initialValue}
					readOnly={readOnly}
				/>
				<div className="absolute top-1/2 transform -translate-y-1/2 right-3.5 cursor-pointer">
					<FontAwesomeIcon
						icon={showPassword ? faEye : faEyeSlash}
						className="text-gray-400"
						onClick={() => setShowPassword(!showPassword)}
					/>
				</div>
			</div>
		);
	} else if(type === "file") {
		inputFieldComponent = (
			<div className={"py-4 px-6 w-full rounded focus:outline-none relative bg-[#F7F7F9] w-full " + className}>
				<input
                    id="fileInput"
                    className="hidden"
                    type="file"
                    accept={accept}
                    ref={fileUploadInputRef}
                    onInput={uploadFile}
                    multiple
                />
                <div
                    className="block cursor-pointer text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap bg-white p-2 px-4 border-2 rounded-lg w-min"
                    onClick={() => {
                        if (fileUploadInputRef && fileUploadInputRef.current)
                            fileUploadInputRef.current.click();
                    }}
                >
                    {placeholder || "Upload File"}
                </div>
				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300"></hr>
				<div>
					{
						files.map((file: File) => {
							return(
								<div key={file.name} className="flex justify-between text-sm font-medium">
									<div className="flex justify-start w-full [&>*]:mr-3 ">
										<FontAwesomeIcon className="text-[#007bff] my-auto" icon={faCheck} />
										<div>{file.name}</div>
										<div className="bg-gray-300 w-min rounded-2xl font-xs px-2">
											{(Math.round(file.size/10000)/100)}MB
										</div>
									</div>
									<div className="w-min">
										<FontAwesomeIcon icon={faTrashCan} />
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		)
	}

	return (
		<div className={"mb-3 w-full " + className}>
			<div className="mb-1.5">
				{
					label &&
					<label
						className="font-medium text-base whitespace-nowrap text-[#091A42]"
						htmlFor={name}
					>
						{`${label}`}
						{/* {isRequired && label && <div className="text-warning inline">*</div>} */}
					</label>
				}
			</div>
			<div className="relative flex rounded text-labelColor w-full">
				{inputFieldComponent}
				{
					buttonName &&
					<button onClick={buttonOnClick} className="bg-white absolute whitespace-nowrap p-0.5 px-2 border-2 rounded-lg right-2 my-1">{buttonName}</button>
				}
			</div>
			{isError && (
				<span className="decoration-orange-500 text-xs">
					<FontAwesomeIcon icon={faCircleInfo} /> {errorMessage}
				</span>
			)}
		</div>
	);
};

export default Input;
