import { useState } from 'react'
import "./TryIt.css";
import axios from 'axios';
import { DateTime } from 'luxon'

const TryIt = () => {
    const [duration, setDuration] = useState(-1);
    const [leaveInfo, setLeaveInfo] = useState("");
    const sendDurationToParent = (leavingInfo, timeForTravel) => {
        setLeaveInfo(leavingInfo)
        setDuration(timeForTravel)
    }
    return (
        <div className="full-module">
            <TryItFormLeft sendDurationToParent={sendDurationToParent}/>
            <TryItFormRight travelTime={duration} leavingInfo={leaveInfo}/>
        </div>
    )
    
};

const TryItFormLeft = ({sendDurationToParent}) => {

    const initialEarlyQuantity = ""
    const [destination, setDestination] = useState("");
    const [starting, setStarting] = useState("");
    const [arriveTime, setArriveTime] = useState("");
    // Early Time Information
    const [earlyYear, setEarlyYear] = useState(initialEarlyQuantity)
    const [earlyMonth, setEarlyMonth] = useState(initialEarlyQuantity)
    const [earlyDay, setEarlyDay] = useState(initialEarlyQuantity)
    const [earlyHour, setEarlyHour] = useState(initialEarlyQuantity)
    const [earlyMinute, setEarlyMinute] = useState(initialEarlyQuantity)
    const [earlySecond, setEarlySecond] = useState(initialEarlyQuantity)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(
            destination, starting, arriveTime
        )

        // API MAIN LINK: https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route#examples
        // Link 2: https://docs.microsoft.com/en-us/bingmaps/rest-services/examples/driving-route-example
        // Link 3: https://docs.microsoft.com/en-us/bingmaps/rest-services/examples/distance-matrix-example 

        const distanceUnit = "mi"
        const BingMapsKey = "AoSfBjJRxKPXA_J93K7JoM7RmT1DszUa7CaruDIq0McT9sHJcQ4JSv7tM8AvpZ0s"
        const optimize = "time"

        var formattedStarting = starting.replace(/,/g, '').replace(/ /g,"%");
        console.log(formattedStarting)
        var formattedDestination = destination.replace(/,/g, '').replace(/ /g,"%");
        console.log(formattedDestination)
    
        const url = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${starting}&wayPoint.2=${destination}&optimize=${optimize}&distanceUnit=${distanceUnit}&key=${BingMapsKey}`


        axios.get(url)
            .then(response => {
                var tripDuration = response.data.resourceSets[0].resources[0].routeLegs[0].travelDuration
                console.log(tripDuration)
                var arrivalTime = DateTime.fromISO(arriveTime)
        
                var earlyDuration = {'years': earlyYear, 'months': earlyMonth, 'days': earlyDay, 'hours': earlyHour, 'minutes': earlyMinute, 'seconds': earlySecond + tripDuration}
                var leaveTime = arrivalTime.minus(earlyDuration)
        
                console.log(leaveTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY))
        
                sendDurationToParent(leaveTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY), tripDuration)
            })
            .catch(err => console.log(err))
    }

    return (
        <form id="tripInfo" onSubmit={handleSubmit}>
            <label htmlFor="destination">Where are you going?</label>
            <input type="text" id="destination" name="destination" value={destination} onChange={e => setDestination(e.target.value)}/>
            <label htmlFor="starting">Where are you starting from?</label>
            <input type="text" id="starting" name="starting" value={starting} onChange={e => setStarting(e.target.value)}/>
            <label htmlFor="arrivalTime">When do you need to arrive by?</label>
            <input type="datetime-local" id="arrivalTime" name="arrivalTime" value={arriveTime} onChange={e => setArriveTime(e.target.value)}/>
            <label htmlFor="earlyTime">How early do you want to be?</label>
            <div className="earlyInputs">
                <input type="number" id="numYears" name="numYears" placeholder="Years" value={earlyYear} onChange={e => setEarlyYear(e.target.value)}/>
                <input type="number" id="numMonths" name="numMonths" placeholder="Months" value={earlyMonth} onChange={e => setEarlyMonth(e.target.value)}/>
                <input type="number" id="numDays" name="numDays" placeholder="Days" value={earlyDay} onChange={e => setEarlyDay(e.target.value)}/>
                <input type="number" id="numHours" name="numHours" placeholder="Hours" value={earlyHour} onChange={e => setEarlyHour(e.target.value)}/>
                <input type="number" id="numMinutes" name="numMinutes" placeholder="Minutes" value={earlyMinute} onChange={e => setEarlyMinute(e.target.value)}/>
                <input type="number" id="numSeconds" name="numSeconds" placeholder="Seconds" value={earlySecond} onChange={e => setEarlySecond(e.target.value)}/>
            </div>
        </form>
    )
}

const TryItFormRight = ({travelTime, leavingInfo}) => {

    if (travelTime !== -1) {
        return (
            <div className="rightSide">
            <button type="submit" form="tripInfo">Get my time</button>
                <div className="result">
                    <h1>Leave: {leavingInfo}</h1>
                    <h1>It will take {travelTime} seconds to get there</h1>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="rightSide">
            <button type="submit" form="tripInfo">Get my time</button>
            </div>
        );   
    }
}

export {
    TryIt
}