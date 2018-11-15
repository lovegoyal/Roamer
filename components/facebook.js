import React , { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {BrowserRouter as Router,Link,NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Images from './images';
import Picinfo from './picinfo';
var medurl = [];
let id="";
 class Facebook extends Component {
    state = {
            access_token:'',
            isLoggedIn:false,
            userId:'',
            name:'',
            email:'',
            picture:'',
            insta_id:'',
            profile_pic:'',
            med_url:[],
            med:[]
            }

           
responseFacebook = Response =>{
           
    fetch('https://graph.facebook.com/v3.0/me/accounts?fields=instagram_business_account&access_token='+Response.accessToken).then(function(response) {
        return response.json();
      }).then(function(myJson) 
      {
         id = myJson.data["0"].instagram_business_account.id;
         console.log(myJson);     
         console.log(Response);
            this.setState({ 
                 access_token:Response.accessToken,
                 isLoggedIn:true,
                 userId:Response.userID,
                 name:Response.name,
                 email:Response.email,
                 picture:Response.picture.data.url,   
                 insta_id:id

            })
           
        }.bind(this))        
            setTimeout(
                function() {
                    console.log(this.state.insta_id);
                }
                .bind(this),
                3000
            );
            fetch('https://graph.facebook.com/v3.0/17841403847222267?fields=profile_picture_url&access_token='+Response.accessToken).then(function(response) {
                return response.json();
              }).then(function(myJson) 
              {
                  this.setState({
                        profile_pic:myJson.profile_picture_url
                  })
                  
              }.bind(this))
              setTimeout(
                function() {
                    console.log(this.state.profile_pic);
                }
                .bind(this),
                3000
            );
            
                  fetch('https://graph.facebook.com/v3.0/17841403847222267?fields=media{media_url}&access_token='+Response.accessToken).then(function(response) {
                      return response.json();
                    }).then(function(myJson) 
                    {   
                        console.log(myJson);
                        this.setState({
                              med_url:myJson.media.data
                        })
                        
                    }.bind(this))
                    setTimeout(
                      function() {
                          console.log('it is media url',this.state.med_url);
                          medurl=this.state.med_url;
                          console.log('it is media url ahuy',medurl);
                          
                        }
                      .bind(this),
                      3000
                  );
      
            
}

componentClicked = () => {
        
        console.log("clicked");
    }
    render() {
        let fbContent;
        if(this.state.isLoggedIn)
        {
           <div>
              
               <img src={this.state.picture} alt={this.state.name}/>
               <h2> {this.state.name} </h2>
               <h3>{ setTimeout(
                function() {
                        <h1>(this.state.profile_pic)</h1>;
                }
                .bind(this),3000) } </h3>
           </div>
        }
        else
        {
            fbContent = (<FacebookLogin
            appId="208619239789602"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />);

        }


      return (

          <div>
               <Router>
                  <div >
                      {/* <Link to ="/">HOME</Link> */}
                          <Route path="/" exact strict render ={
                          () =>{
                              return(
                                <div>  
                                {/* <p style={{float:"center"}}>
                               <img src={this.state.picture} alt={this.state.name}  width="100" height="100"/>
                               </p>         */}
                                
                                <img src={this.state.picture} alt={this.state.name}  width="100" height="100"/>
                                <h1>{this.state.name}</h1>
                                
                                <h2>Linked instagram business account</h2>  
                                <div>
                                   <h4>CLICK IMAGE</h4>
                                 <a href="http://localhost:3001/images"><img src={this.state.profile_pic} alt={this.state.insta_id} width="100" height="100" /></a>
                                </div>  
                                  <h>  {fbContent}</h>
                              
                              <h1>welcome Home</h1>
                              </div>)
                          }
                        } /> 
                        <Route path="/images" exact strict render ={
                                    () =>{
                              return(
                                
                               <Images media={this.state.med_url} />
                                    )
                          }
                        } />
                        <Route path="/picinfo" exact strict render ={
                                    () =>{
                              return(
                                
                               <Picinfo />
                                    )
                          }
                        } />
                     </div>
                </Router>       
                <div>
                     </div>         
                                
                                      
    </div>  
      );
    }
}
export default Facebook;