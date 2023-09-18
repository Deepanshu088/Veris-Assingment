import { Fragment, MouseEventHandler } from "react";
import Backdrop from "./BackDrop";

type BackDropType = {
    show: boolean;
    onClose: MouseEventHandler;
    children: any;
}

const Modal = ({ children, show, onClose }: BackDropType) => {
    if(!show) {
        return (<></>)
    }
    return (
        <Fragment>
            <Backdrop onClick={onClose} />
            <div className="absolute bg-white inset-0 z-20 rounded w-4/5 max-sm:w-11/12 max-sm:m-auto m-auto h-min my-10 shadow-md p-8 text-center overflow-auto">
                {children}
            </div>
        </Fragment>
    )
}

export default Modal;