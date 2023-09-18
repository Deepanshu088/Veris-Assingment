import { MouseEventHandler, useCallback, useRef, useState } from "react";
import CustomDatePicker from "../Shared/CustomDateTimePicker/CustomDatePicker";
import Input from "../Shared/Input/Input";
import CustomTimePicker from "../Shared/CustomDateTimePicker/CustomTimePicker";
import AvatarWithCross from "../Shared/Avatar/AvatarWithCross";
import Avatar from "../Shared/Avatar/Avatar";
import useHttp from "../../hooks/httpHook";
import Button from "../Shared/Button/Button";
import SelectInput from "../Shared/Input/SelectInput";
import { eventDurationOptions, notificationBeforeEventOptions } from "../../constants/dropDownOptions";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/slices/user/userSlice";
import { EventType } from "../Shared/Table/Table";

type FormStateType = {
    title: string;
    description?: string;
    eventDate: Date;
    eventTime: Date;
    eventDuration: number;
    location: string;
    reminderTime: number,
    guestsList: string[],
    guestEmail: string;
}

const initialFormState : FormStateType = {
    title: "",
    description: "",
    eventDate: new Date(),
    eventTime: new Date(new Date().setHours(0, 12, 0)),
    eventDuration: 60,
    location: "",
    reminderTime: 60,
    guestsList: [],
    guestEmail: ""
}

const initialFormErrorState = {
    title: true,
    description: false,
    location: true,
    guestEmail: true
}

const CreateEventForm = ({onClose} : {onClose: Function}) => {
    const [formDetails, setFormDetails] = useState<FormStateType>(initialFormState);
    const [formErrors, setFormErrors] = useState(initialFormErrorState);
    const [showFormErrors, setShowFromErrors] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [maxAvatars, setMaxAvatars] = useState(4);
    let avatarsListRef = useRef<any>(null);
    const { sendRequest } = useHttp();
    const dispatch = useDispatch();

    const toggleDescription = useCallback(()=> {
        setShowDescription(state => !state);
        setFormErrors(state => {
            return {...state, description: state.description && showDescription}
        })
    }, [showDescription]);

    const addNewGuest = useCallback(() => {
        if(formErrors.guestEmail){
            setShowFromErrors(true);
            return;
        }
        setFormDetails(state => {
            let newGuestListSet = new Set ([...state.guestsList])
            newGuestListSet.add(state.guestEmail);
            return { ...state, guestEmail: "", guestsList: Array.from(newGuestListSet) }
        })
    }, [formErrors.guestEmail]);

    const removeGuest = useCallback((email: string) => {
        setFormDetails(state => {
            const index = state.guestsList.indexOf(email);
            const newGuestList = state.guestsList.slice(0, index).concat(state.guestsList.slice(index+1))
            return {...state, guestsList: newGuestList}
        })
    }, []);

    const onInputChange = useCallback((id: string, value: string, isValid: boolean) => {
        if(id === "guestEmail" && value === "") {
            isValid = true;
        }
        setFormDetails(state => {
            return {...state, [id]: value}
        })
        setFormErrors(state => {
            return {...state, [id]: !isValid}
        })
    }, [])

    const onSelectInputChange = useCallback((id: string, value: any) => {
        setFormDetails(state => {
            return { ...state, [id]: value }
        })
    }, [])

    const dateChangeHandler = useCallback((id: string, date: Date) => {
        console.log(id, date);

        setFormDetails(state => {
            return {...state, [id] : date }
        })
    }, []);

    const fileInputChange = useCallback((id: string, files: File[])=> {
        console.log(files);
        // todo : save files in a state and use with the API call | Not necessary for now.
    }, [])

    const formSubmitHandler = useCallback(async ()=> {
        let isInvalidForm = Object.values(formErrors).reduce((a, b) => a || b )

        if(isInvalidForm) {
            setShowFromErrors(true);
            return;
        }

        try {
            let startDateTime = formDetails.eventDate;
            console.log(startDateTime);
            startDateTime.setHours(formDetails.eventTime.getHours());
            startDateTime.setMinutes(formDetails.eventTime.getMinutes());
            startDateTime.setSeconds(0);

            console.log(startDateTime);

            let response = await sendRequest("/events/create", "POST", {
                title: formDetails.title,
                description: formDetails.description,
                startDateTime,
                durationInMin: formDetails.eventDuration,
                reminderBeforeEventTimeInMin: 30,
                location: formDetails.location,
                guests: formDetails.guestsList
            })

            let newEvent : EventType = {
                id: response.event.id,
                title: formDetails.title,
                description: formDetails.description || "",
                startTime: startDateTime.toString().split("GMT")[0].slice(0, -4),
                durationInMin: formDetails.eventDuration,
                location: formDetails.location
            }

            dispatch(addEvent(newEvent))
            console.log("hlleo")
            onClose();
            setFormDetails(initialFormState);
            setFormErrors(initialFormErrorState);
            setShowDescription(false);
            setShowFromErrors(false);
            
        } catch (e: any) {
            console.error("Error: on CreateFormEvent -> FormSubmitHandler -> Something went wrong! Couldn't add new event.", e)
        }
    }, [formDetails, formErrors, sendRequest, onClose, dispatch])

    window.addEventListener('resize', ()=>{
        // Calculate the maximum number of circles that can fit
        const avatarWidth = 50; // Adjust the circle width as needed
        const avatarMargin = 5; // Adjust the margin between circles as needed
        const containerWidth = avatarsListRef?.current?.clientWidth;
        
        const maxAvatars = Math.floor(containerWidth / (avatarWidth + avatarMargin * 2));
        setMaxAvatars(maxAvatars-1);
    })

    return (
        <div className="text-left [&>div]:my-4">
            <h3 className="my-6">Create Event</h3>


            {/* Title and Description */}
            <Input id="title" name="title" label="Event Title" placeholder="Enter event name" isError={formErrors.title && showFormErrors} errorMessage="Event title must be atleast 3 letters." initialValue={formDetails.title} onChange={onInputChange} validators={["REQUIRE"]} buttonName={ showDescription ? "Hide description" : "Add description"} buttonOnClick={toggleDescription} />
            {
                showDescription &&
                <Input id="description" name="description" label="Description" placeholder="Enter description" isError={formErrors.description && showFormErrors} errorMessage="Event description must be atleast 5 letters." initialValue={formDetails.description} onChange={onInputChange} validators={["MIN_LENGTH#5"]} />
            }


            {/* Date Time Duration */}
            <div className="flex justify-around max-sm:block sm:[&>*]:mr-2  max-sm:[&>div]:my-4">
                <CustomDatePicker id="eventDate" label="Date" handleDateChange={dateChangeHandler} />
                <CustomTimePicker id="eventTime" label="Time" handleTimeChange={dateChangeHandler} />
                <SelectInput id="eventDuration" label="Duration" className="w-1/3" options={eventDurationOptions} defaultKey="1hour" onChange={onSelectInputChange} />
            </div>


            {/* Location */}
            <Input id="location" name="location" label="Location" placeholder={"Enter location"} isError={formErrors.location && showFormErrors} errorMessage="Location must be atleast 3 characters." initialValue={formDetails.location} onChange={onInputChange} validators={["REQUIRE"]} />


            {/* Guest's Emails and their Avatars */}
            <Input id="guestEmail" name="guestEmail" label="Add guests" placeholder={"contact@example.com"} isError={formErrors.guestEmail && showFormErrors} errorMessage="Please enter a valid email" initialValue={formDetails.guestEmail} onChange={onInputChange} validators={["EMAIL"]} buttonName="Add" buttonOnClick={addNewGuest} />
            <div className="flex justify-start" ref={avatarsListRef}>
                {
                    formDetails.guestsList.slice(0, maxAvatars).map(guestPerson => <AvatarWithCross key={guestPerson} id={guestPerson} name={guestPerson} onCrossClick={removeGuest} />)
                }
                {
                    formDetails.guestsList.length > maxAvatars &&
                    <Avatar id="remainingGuestCount" name={"+" + (formDetails.guestsList.length - maxAvatars)} className="bg-[#eeeeee] text-[#525252] " />                    
                }
            </div>


            {/* Email Reminder Notification */}
            <div className="flex justify-start max-sm:block sm:[&>*]:mr-4 ">
                <div>
                    <Input id="notification" name="notification" label="Notification" placeholder={"contact@example.com"} initialValue={" Email"} className="w-min" readOnly={true}
                    />
                </div>
                <div>
                    <SelectInput id="reminderTime" className="" label="Set reminder" options={notificationBeforeEventOptions} defaultKey="1hour" onChange={onSelectInputChange} />
                </div>
            </div>


            {/* File Upload */}
            <Input id="fileInput" name="fileInput" placeholder="Select Files" label="Upload attachments" type="file" accept="image/jpg, image/jpeg, image/png" onChange={fileInputChange} />

            <div className="text-right w-full mt-10 ">
                <Button buttonStyle="secondary" onClick={onClose as MouseEventHandler}>
                    Cancel
                </Button>
                <Button buttonStyle="primary" onClick={formSubmitHandler}>
                    Create
                </Button>
            </div>
        </div>
    )
}

export default CreateEventForm;