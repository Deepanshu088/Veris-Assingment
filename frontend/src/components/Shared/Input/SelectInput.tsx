import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";

type SelectInputOptionType = {
    name: string;
    value: number;
    key: string;
}

type SelectInputType = {
    label: string;
    id: string;
    name?: string;
    defaultKey: string;
    options: {
        [key: string] : SelectInputOptionType;
    };
    onChange: Function;
    className?: string;
}

const SelectInput = ({
    id,
    options,
    name,
    label,
    defaultKey = "1hours",
    onChange,
    className
}: SelectInputType) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<SelectInputOptionType>(options[defaultKey])

    const onOptionSelectHandler = useCallback((key: string) => {
        onChange(id, options[key].value)
        setSelectedOption(options[key])
        setShowDropDown(false);
    }, [id, onChange, options])

    const toggleDropDown = useCallback(()=> setShowDropDown(state => !state) , [])

    if (!options) {
        return <></>
    }

    return (
        <div className={"mb-3 whitespace-nowrap bg-[#ffffff] w-full " + className}>
            <div className="mb-1.5">
                {
                    label &&
                    <label
                        className="font-medium text-base whitespace-nowrap text-[#091A42]"
                        htmlFor={name}
                    >
                        {`${label || "DropDown"}`}
                    </label>
                }
            </div>
            <div className="relative flex rounded text-labelColor w-full">
                <div className="flex justify-between py-2 px-4 w-full rounded-md focus:outline-none bg-[#F7F7F9]" onClick={toggleDropDown}>
                    <div>
                        {selectedOption.name}
                    </div>
                    <div className="ml-4">
                        <FontAwesomeIcon icon={showDropDown ? faCaretUp : faCaretDown} />
                    </div>
                </div>
                {
                    showDropDown &&
                    <div className="absolute w-auto right-0 mt-11 border rounded z-20 bg-[#ffffff] border-[#aeaeae] ">
                        {
                            Object.entries(options).map(([key, value] : any) => {
                                return <div key={key} className={"py-2 px-4 block whitespace-no-wrap " + (selectedOption.key === value.key ? "bg-[#d0e1fd]" : "hover:bg-[#f0f0f0]") } 
                                    onClick={() => onOptionSelectHandler(key)}> {value?.name} </div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SelectInput;