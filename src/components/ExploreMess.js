import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import bg from "../images/pic1.jpg"
import "../index.css"



const MessCard = (props) => {
    console.log(props.details);
     return(
      <>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={props.details.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.details.messName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.details.ownerName} &nbsp;&nbsp;&nbsp; {props.details.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
         <a href={"/Explore/"+props.details._id}>Register Now</a>
        </Button>
      </CardActions>
    </Card>
  </>
    );
}

const ExploreMess = () =>{
    const [data,setData] = React.useState([]);
    React.useEffect(()=>{
      fetch("http://localhost:5000/messes/",{
                method:"get",
          }).then(res=>res.json())
            .then(data=>setData(data))
            .catch(err=>console.log(err))
    
    },[])

    return(
        <>
         <div className="Explore-Body">
           {
            data.map(mess =>{
              return (<MessCard details={mess}/>)
            })
           }
         </div>
        </>
    )

}

export default ExploreMess;