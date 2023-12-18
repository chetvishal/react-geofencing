import { useEffect, useState } from "react";

class CircularGeofenceRegion {
    constructor(opts) {
        Object.assign(this, opts)
    }

    inside(lat2, lon2) {
        const lat1 = this.latitude
        const lon1 = this.longitude
        const R = 63710; // Earth's radius in m

        return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.cos(lon2 - lon1)) * R < this.radius;
    }
}

export const useGeoFencing = (argObj ={lat: 0, long: 0, radius: 100}) => {
    let { lat , long , radius } = argObj;

    // console.log("lat: ", lat, "long :", long, "radius: ", radius)
    const [fence, setFence] = useState("")

    useEffect(() => {
        const fenceA = new CircularGeofenceRegion({
            latitude: lat,
            longitude: long,
            radius: radius // meters
        });

        setFence(() => fenceA);
    }, []);

    const checkIfInside = (lat, lng) => {
        return fence.inside(lat, lng);
    }

    const isWithinGeoFence = (pointerLocation, userLocation) => {
        const newFence = new CircularGeofenceRegion({
            latitude: pointerLocation.lat,
            longitude: pointerLocation.long,
            radius: radius // meters
        })

        return newFence.inside(userLocation.lat, userLocation.long)
    }

    const createPoint = ({lat, lng, radius = 1000}) => {
        const fenceA = new CircularGeofenceRegion({
            latitude: lat,
            longitude: lng,
            radius: radius // meters
        });

        setFence(() => fenceA);
    }

    return { checkIfInside, createPoint, isWithinGeoFence }
}

export default useGeoFencing;

// this much has to be removed
// const { isWithinGeoFence } = useGeoFencing({radius: 50})

//  if(isWithinGeoFence(
//     { lat: res.data.latitude, long: res.data.longitude },
//     { lat: location.lat, long: location.lng }
//     // { lat: 28.420006, long: 77.038188 }
//   )) {
//     alert("Is within geo fence area.")
//   }
//   else {
//     alert("Is not within geo fence area.")
//   }
//till here has to be removed
