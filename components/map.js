import React ,{Component} from 'react'
import {withGoogleMap,
     withScriptjs,
     GoogleMap,
     Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
 <GoogleMap
  defaultZoom={8}
  defaultCenter={{lat:parseFloat(props.lat),lng:parseFloat(props.long)}}
 >
  {props.isMarkerShown && <Marker 
   onClick={props.onMarkerClick}
    key={"it is inside marker"+console.log(localStorage.getItem("medurl"))}
  position={{lat:parseFloat(props.lat),lng:parseFloat(props.long)}} 
  />}
 </GoogleMap>
))

export default class Map extends Component {
  constructor(props) {
  super(props)
  this.state = {
   isMarkerShown: false
 }
 this.onMarkerClick = this.onMarkerClick.bind(this);
}
componentDidMount() {
 this.delayedShowMarker()
}
delayedShowMarker = () => {
 setTimeout(() => {
  this.setState({ isMarkerShown: true })
 }, 3000)
}
handleMarkerClick = () => {
  this.setState({ isMarkerShown: false })
  this.delayedShowMarker()
}
onMarkerClick = () =>{
  console.log("h1");
}

render() {
  let { model } = this.props;
  let lat =this.props.lat;
  let long = this.props.lng;
  console.log("dvdafgafgf"+localStorage.getItem("lat"));
  console.log(lat+"    ddddd   "+long)
  return (
    <div>
    <MyMapComponent
    isMarkerShown={this.state.isMarkerShown}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8X9GiDl-mPD1j0K6lTEiMhs3D8axW53U&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    // lat={localStorage.getItem("lat")}
    // long={localStorage.getItem("lng")}
        lat={30.7333}
        long={76.7794}
/>
    <div>
   <h1>Refresh the page to see marker</h1>
     </div>
</div>
  )
 }
}
