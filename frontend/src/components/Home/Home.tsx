import { useCallback, useEffect } from "react";
import Card from "../Shared/Card/Card";
import Table, { EventType, TableHeadType } from "../Shared/Table/Table";
import useHttp from "../../hooks/httpHook";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../redux/slices/user/userSlice";

const tableHeaders: TableHeadType[] = [
    {
        key: "index",
        title: "S. No."
    }, {
        key: "title",
        title: "Title",
    }, {
        key: "startTime",
        title: "Start Date"
    }, {
        key: "durationInMin",
        title: "Duration"
    }
]

const Home = () => {
    const { sendRequest } = useHttp();
    const events = useSelector((state: any) => state?.userData?.events)
    const dispatch = useDispatch();

    const fetchEvents = useCallback( async ()=> {
        let response = await sendRequest("/events/all");
        let allEvents = response.events;
        let tableEvent: EventType[] = allEvents.map((event: any) => {
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                startTime: new Date(event.startTime).toString().split("GMT")[0].slice(0, -4),
                durationInMin: `${event.durationInMin/60} Hours`,
                location: event.location,
            }
        })
        dispatch(setEvents(tableEvent))
    }, [sendRequest, dispatch])

    useEffect(()=>{
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div>
            <Card>
                <Table theadData={tableHeaders} tbodyData={events} />
            </Card>
        </div>
    )
}

export default Home;