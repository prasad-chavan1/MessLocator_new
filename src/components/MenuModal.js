import * as React from "react";
import {Button,Modal} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const setRole = (props) =>{
    localStorage.setItem("role",props);
    localStorage.setItem("show",false);
}

const MenuModal = (props) => {
  const [item,setItem] = React.useState([]);
  const params = useParams();
  let tosendval={
    messID:params.id
  }
  React.useEffect(()=>{
      async function sendReq() {
        axios.get(`http://localhost:5000/menu/items/${params.id}`)
          .then(res=>setItem(res.data))
          .catch(err=>console.log(err))
        }
      sendReq();
    },[]);
//  console.log(item);
    return (
      <Modal
        {...props}
        size="sm"
        dialogClassName="modal-20w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Today's Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>{item.item1}</li>
            <li>{item.item2}</li>
            <li>{item.item3}</li>
            <li>{item.item4}</li>
            <li>{item.item5}</li>
            <li>{item.item6}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MenuModal;
