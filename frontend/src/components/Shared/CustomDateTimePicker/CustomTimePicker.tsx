import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDateTimePicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

type CustomTimePickerType = {
	id: string;
	label: string;
	className?: string;
	initialValue?: Date;
	handleTimeChange: Function;
}

const CustomTimePicker = ({
	id,
	label,
    className = "",
	initialValue = new Date(),
	handleTimeChange = () => {},
}: CustomTimePickerType) => {
	const [selectedTime, setSelectedTime] = useState(initialValue);
	const timePickerRef = useRef<any>(null);

	function onTimeChange(e: Date) {
		console.log(e);
		setSelectedTime(e);
		handleTimeChange(id, e);
	}

	return (
		<div className={"w-full " + className}>
			<div className="mb-1.5">
				<label className="font-medium text-base whitespace-nowrap text-[#091A42]">
					{label || "Select Time"}
				</label>
			</div>
			<div className="flex justify-between rounded py-2 px-4 w-full focus:outline-none cursor-pointer z-0 bg-[#F7F7F9]" onClick={()=> {
				timePickerRef?.current?.onInputClick();
			}}>
				<DatePicker
					ref={timePickerRef}
					selected={selectedTime}
					onChange={onTimeChange}
					popperPlacement="bottom-end"
					placeholderText="Select Date"

                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
					className="rounded w-full focus:outline-none cursor-pointer z-0 bg-[#F7F7F9]"
				/>
				<FontAwesomeIcon className="my-auto w-min " icon={faClock} />
			</div>
		</div>
	);
};
export default CustomTimePicker;
