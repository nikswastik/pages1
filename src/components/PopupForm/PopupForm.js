import React from "react";
import Drawer from "@mui/material/Drawer";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Address from "../../Pages/Address/Address";
import Form from "../Form/Form";

export default function PopupForm(props) {
  return (
   
      <Drawer anchor={"right"} open={props.isOpen} style={{height:"100vh"}}>
        <Card
          sx={{ width: 500, height: "100%" }}
          className="ActionAreaCard-cntr"
        >
          <Form type={true}  editfunc={props.modelHandler} formType={props.addressType} addrHandler={props.addressHandler}/>
        </Card>
      </Drawer>
   
  );
}
