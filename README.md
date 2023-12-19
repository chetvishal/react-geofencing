```jsx
import { useGeoFencing } from 'react-geofencing'

const MyComponent = () => {
	 const { isWithinGeoFence } = useGeoFencing({radius: 50})

  if(isWithinGeoFence(
     { lat: 28.420006.latitude, long: 77.038188 }, //geo-fence center point
     { lat: location.lat, long: location.lng } //user location, can be fetched from browsers geo location api
   )) {
     alert("Is within geo fence area.")
   }
   else {
     alert("Is not within geo fence area.")
   }
}
```
