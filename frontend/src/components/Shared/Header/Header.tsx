import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import CreateEventForm from "../../CreateEventForm/CreateEventForm";
import { logout } from "../../../redux/slices/user/userSlice";

const Header = () => {
    const isLoggedIn = useSelector((state:any) => state.userData.isLoggedIn);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(true);

    function logoutHandler() {
        dispatch(logout());
    }

    function toggleShowModalState() {
        setShowModal(state => !state)
    }
    function modalCloseHandler() {
        setShowModal(false);
    }

    return (
        <div className="bg-[#b6acc7] m-0 p-4 flex justify-between shadow-lg text-[#091A42]">
            <div>
                <h1>Veris Frontend Engineer Test</h1>
            </div>
            { 
                isLoggedIn &&
                <>
                    {
                        showModal &&
                        <Modal show={showModal} onClose={modalCloseHandler}>
                            <CreateEventForm onClose = {modalCloseHandler} />
                        </Modal>
                    }
                    <div className="flex justify-around">
                        <div className="mx-4" onClick={toggleShowModalState}>
                            <h4>Create a new event</h4>
                        </div>
                        <div onClick={logoutHandler}>
                            <h4>Logout</h4>
                        </div> 
                    </div>
                </>
            }
        </div>
    )
}

export default Header;