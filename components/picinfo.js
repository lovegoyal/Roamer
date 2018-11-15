import React , { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Map from './map.js';
import Geocode from "react-geocode";
var medurl='';
export default class Picinfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token:'',
            isLoggedIn:false,
            userId:'',
            name:'',
            email:'',
            picture:'',
            insta_id:'',
            profile_pic:'',
            med_url:[],
            med:[],
            value:'',
            lat:'',
            lng:''
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        
responseFacebook = Response =>{

    fetch('https://graph.facebook.com/v3.0/me/accounts?fields=instagram_business_account&access_token='+Response.accessToken).then(function(response) {
        return response.json();
      }).then(function(myJson) 
      {
         //id = myJson.data["0"].instagram_business_account.id;
         // console.log(myJson);     
        //  console.log(Response);
             this.setState({ 
                 access_token:Response.accessToken,
                 isLoggedIn:true,
                 userId:Response.userID,
                 name:Response.name,
                 email:Response.email,
                 picture:Response.picture.data.url,   
                 //insta_id:id

            })
           
        }.bind(this))        
fetch('https://graph.facebook.com/v3.0/17841403847222267?fields=media{media_url}&access_token='+Response.accessToken).then(function(response) {
                return response.json();
              }).then(function(myJson) 
              {   
                 // console.log(myJson);
                  this.setState({
                        med_url:myJson.media.data
                  })
                  
              }.bind(this)),
              setTimeout(
                function() {
                   // console.log('it is media url',this.state.med_url);
                    medurl=this.state.med_url;
                    //console.log('it is media url ahuy',medurl);
                    
                  }
                .bind(this),
                3000
            );
        }
        handleChange(event) {
            this.setState({value: event.target.value});
            
          }
        
          handleSubmit(event) {
              console.log("inside the function"+this.state.value);
            // alert('A name was submitted: ' + this.state.value);
            Geocode.fromAddress(this.state.value).then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;
                  //console.log(localStorage.getItem("lat"))
                //   this.setState({
                //       lat:localStorage.getItem("lat"),
                //       lng:localStorage.getItem("lng")
                //   })
                setTimeout(
                    function() {
                  console.log("jbbhjbyvvyu"+lat, lng);
                }
                .bind(this),
                3000
            );
                  localStorage.setItem("lat",lat);
                  localStorage.setItem("lng",lng);
                },
                error => {
                  console.error(error);
                },
               console.log(this.state.value)
              );
              setTimeout(
                function() {
                    this.setState({
                               lat:localStorage.getItem("lat"),
                               lng:localStorage.getItem("lng")
                           })
                    
                  }
                .bind(this),
                3000
            );
            setTimeout(
                function() {
                    console.log("sefaegergewrgwergerg"+this.state.lat)
                    console.log("sefaegergewrgwergerg"+this.state.lng)
                    
                  }
                .bind(this),
                3000
            );
            
              //this.setState({lat})
              event.preventDefault();
          }

          
render()
{
    let fbContent;
    return(
<div>
{  
             fbContent = (<FacebookLogin
                appId="208619239789602"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)
               
             }
             <div>
                 <br />
                 <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
                 </form>
                 </div>
             <h1>Image</h1>
             <img src={this.props.media} width="auto" height="500" />
          
                  <div style={{height:"100",width:"100"}}>
                 <Map lat={this.state.lat} lng={this.state.lng} />    
                  </div>
                  </div>      
        
    );
}
}
