import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDateTimePicker.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

type CustomDatePickerType = {
	id: string;
	label: string;
	className?: string;
	initialValue?: Date;
	handleDateChange: Function;
}

const CustomDatePicker = ({
	id,
	label,
    className = "",
	initialValue = new Date(),
	handleDateChange = () => {},
}: CustomDatePickerType) => {
	const [selectedDate, setSelectedDate] = useState(initialValue);
	const datePickerRef = useRef<any>(null);

	function onDateChange(e: Date) {
		setSelectedDate(e);
		handleDateChange(id, e);
	}

	return (
		<div className={"w-full " + className}>
			<div className="mb-1.5">
				<label className="font-medium text-base whitespace-nowrap text-[#091A42]">
					{label || "Select Date"}
				</label>
			</div>
			<div className="flex justify-between align-baseline rounded text-left px-4 w-full focus:outline-none cursor-pointer z-0 bg-[#F7F7F9]" onClick={()=> {
				datePickerRef?.current?.onInputClick()
			}}>
				<DatePicker
					ref={datePickerRef}
					selected={selectedDate}
					onChange={onDateChange}
					popperPlacement="bottom-end"
					placeholderText="Select Date"
					minDate={new Date()}
					dateFormat="dd/MM/yyyy"
					className="rounded text-left py-2 w-full focus:outline-none cursor-pointer z-0 bg-[#F7F7F9]"
				/>
				<FontAwesomeIcon className="my-auto w-min " icon={faCalendarDays} />
			</div>
		</div>
	);
};
export default CustomDatePicker;
