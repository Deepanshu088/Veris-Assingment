import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Avatar, { AvatarType } from "./Avatar";

const AvatarWithCross = ({id, name, onCrossClick } : AvatarType & { onCrossClick: Function }) => {

    let letter = name[0].toUpperCase();

    return (
        <>
            <div className="relative group">
            <div className="relative" data-tooltip-target="tooltip-default">
                <div className="absolute right-1 top-1 bg-white rounded-[50%] flex justify-between" onClick={()=> onCrossClick(id)}>
                    <FontAwesomeIcon className="text-[#7a7a7a] border-2 border-white rounded-[50%]" icon={faCircleXmark} />
                </div>
                <Avatar id={id} name={letter} className=" text-white " />
            </div>
            <span className="bg-gray-300 text-blue-900 invisible transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible absolute px-4 py-0.5 -top-10 rounded-md">
                {name}
            </span>
        </div>
                    
        </>
    )
}

export default AvatarWithCross;