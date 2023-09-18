const SUPPORTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png"];

function validate(value: any, validators: string[]) {
	value = value.trim();

	let isValid = true;
	for (let validator of validators) {
		if (validator === "REQUIRE")
			// Min length = 3
			isValid = isValid && value.length >= 3;
		else if (validator.startsWith("MIN_LENGTH#"))
			isValid = isValid && value.length >= validator.split("#")[1];
		else if (validator.startsWith("MAX_LENGTH#"))
			isValid = isValid && value.length <= validator.split("#")[1];
		else if (validator === "EMAIL")
			isValid = isValid && /^\S+@\S+\.(\S){2,3}$/.test(value);
		else if (validator === "ALPHABETS")
			isValid = isValid && /^[a-z|A-Z]*$/.test(value);
		else if (validator === "NUMBER") isValid = isValid && /^\d*$/.test(value);
		else if (validator === "PASSWORD")
			isValid =
				isValid &&
				/^((?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16})*$/.test(
					value
				);
	}
	return isValid;
}

export const validateImage = (file: File) => {
	if (!file)
		throw new Error("Invalid Image!!! Try again with a different image.");

	if (!SUPPORTED_IMAGE_MIME_TYPES.includes(file.type))
		throw new Error(
			"Invalid Image!!! Only PNG and JPG/JPEG images are supported."
		);

	if (file.size >= 3 * 1024 * 1024)
		// Max Size = 3MB
		throw new Error("Invalid Image!!! Too big image (Max size 3MB).");
};

export default validate;
