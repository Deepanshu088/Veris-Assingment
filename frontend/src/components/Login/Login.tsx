import { useState } from "react"
import { useDispatch } from "react-redux"
import Card from "../Shared/Card/Card";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import useHttp from "../../hooks/httpHook";
import { login } from "../../redux/slices/user/userSlice";

const Login = () => {
    const [formDetails, setFormDetails] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: true, password: true });
    const [showFormErrors, setShowFromErrors] = useState(false);
    const { sendRequest } = useHttp();
    const dispatch = useDispatch();

    function onInputChange(id: string , value: string, isValid: boolean) {
        setFormDetails(state => {
            return { ...state, [id]: value }
        })
        setFormErrors(state => {
            return { ...state, [id]: !isValid }
        })
    }
    
    let isFormInvalid = Object.values(formErrors).reduce((a,b)=> a || b );
    console.log(showFormErrors);

    async function formSubmitHandler(e: any) {
        e.preventDefault();
        if(isFormInvalid) {
            return setShowFromErrors(true);
        } else {
            try {
                const response = await sendRequest("/users/login", "POST", {
                    email: formDetails.email, password: formDetails.password
                });
                dispatch(login(response));
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="w-3/4 m-auto mt-8 bg-white">
            <Card>
                <div className="w-full text-left">
                    <form onSubmit={formSubmitHandler}>
                        <Input
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            isError={formErrors.email && showFormErrors}
                            errorMessage="Please enter a valid."
                            initialValue={formDetails.email}
                            onChange={onInputChange}
                            validators={["EMAIL"]}
                        />
                        <Input
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="*********"
                            isError={formErrors.password && showFormErrors}
                            errorMessage="Please enter a valid stong password."
                            initialValue={formDetails.password}
                            onChange={onInputChange}
                            // validators = {["REQUIRE", "PASSWORD"]}
                            validators = {["REQUIRE"]}
                        />
                        <Button>Submit</Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Login