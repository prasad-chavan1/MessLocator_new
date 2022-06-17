import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MessMenu from "./MenuModal";
import axios from "axios";

const Mess = () =>{
    const [data,setData] = useState([]);
    const [show,setShow] = useState(false);
    let params = useParams();
    useEffect(()=>{
    async function sendReq() {
        console.log(params.id);
        axios.get(`http://localhost:5000/messes/${params.id}`)
            .then(res=>setData(res.data))
            .catch(err=>console.log(err))
        }
        sendReq();
        console.log(data);

    },[])
    
    return(
        <>
        <div className="Mess-Body">
            <MessMenu show={show}
                onHide={() => setShow(false)}/>
            <div className="Mess-img">
                <img src={data.url} alt="mess image" width="100%" height="100%"></img>
            </div>
            <div className="Mess-details">
                <h1>{data.messName}</h1>
            <div className="Mess-details-list">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Owner Name" secondary={data.ownerName} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <CurrencyRupeeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Full Time" secondary={data.fullTime} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <CurrencyRupeeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Half Time" secondary={data.halfTime}  />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <SchoolIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="College nearby" secondary={data.clgName}  />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <PhoneIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phone" secondary={data.phone}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <MailIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="E-mail" secondary={data.email}  />
                </ListItem>
                </List>
                <div style={{"display":"flex","justifyContent":"space-evenly","margin":"10px"}}>
                    {/* <a href={`https://www.google.com/maps/search/?api=1&query=${data.location.coordinates.lat},${data.location.coordinates.lng}`}
                    target="_blank"
                    > */}
                    <Button variant="contained" endIcon={<LocationOnIcon />}>
                        Locate Us
                    </Button>
                    {/* </a> */}
                    <Button variant="contained" endIcon={<RestaurantIcon/>}  
                    onClick={()=>setShow(true)}
                    >
                        Today's Menu 
                    </Button>
                </div>
                
              </div>
              
            </div>
        </div>
            
        </>
    )
}

export default Mess;