import React , { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Picinfo from './picinfo';
let medurl='';
export default class Images extends Component {
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
            redirectToSelectedImage:false
            }
        }
        
responseFacebook = Response =>{

    fetch('https://graph.facebook.com/v3.0/me/accounts?fields=instagram_business_account&access_token='+Response.accessToken).then(function(response) {
        return response.json();
      }).then(function(myJson) 
      {
         //id = myJson.data["0"].instagram_business_account.id;
          console.log(myJson);     
        //  console.log(Response);
             this.setState({ 
                 access_token:Response.accessToken,
                 isLoggedIn:true,
                 userId:Response.userID,
                 name:Response.name,
                 email:Response.email,
                 picture:Response.picture.data.url
                 //insta_id:id

            })
           
        }.bind(this))        

            fetch('https://graph.facebook.com/v3.0/17841403847222267?fields=media{media_url}&access_token='+Response.accessToken).then(function(response) {
                return response.json();
              }).then(function(myJson) 
              {   
                  console.log(myJson);
                  this.setState({
                        med_url:myJson.media.data
                  })
                  
              }.bind(this)),
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
clickHandle(value) {
    //console.log(value);
    medurl=value;
    //  console.log("sefwffec");
        this.setState({
            redirectToSelectedImage:true
            
        })
        //localStorage.setItem("redirectToSelectedImage",this.redirectToSelectedImage);
        localStorage.setItem("medurl",value);
      
        // console.log(value);

}
componentWillMount()
       {
           medurl=localStorage.getItem("medurl");
            
       }
render()
{
    if(localStorage.getItem("medurl")===null)
      {
    let fbContent;
    if(!this.state.redirectToSelectedImage)
          {    
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
                
                       
                    <h1>welcome Image Folder</h1>
                    
                {console.log("media url in",this.state.med_url)}
                        {this.state.med_url.map((user, i) =>{
                            return <div key={i}><p style={{float:"left"}}><a href ='#'><img src={user.media_url} width="auto" height="100" value={user.media_url} onClick={()=> this.clickHandle(user.media_url)}/></a></p></div>
                                    })}
                
                                </div>  
            
            );
          }
        else if(this.state.redirectToSelectedImage)
        {
            setTimeout(
                function() {
                 console.log('it is media url ahuy',medurl);
                    
                  }
                .bind(this),
                3000
                );
                return(
                <Picinfo media={medurl}/>
            )
        }
    }
    else
    {
        setTimeout(
            function() {
             console.log('it is media url ahuy',medurl);
                
              }
            .bind(this),
            3000
        );
           return(
          <Picinfo media={medurl} />
           )
    }

}

}
