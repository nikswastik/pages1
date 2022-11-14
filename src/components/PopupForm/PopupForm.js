import React from "react";
import Drawer from "@mui/material/Drawer";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Address from "../../Pages/Address/Address";
import Form from "../Form/Form";

export default function PopupForm(props) {
  return (
    <div>
      <Drawer anchor={"right"} open={props.isOpen}>
        <div>
          <CloseIcon onClick={props.editHandler} style={{margin:"1em"}}/>
        </div>
        <Card
          sx={{ width: 500, height: "100%" }}
          className="ActionAreaCard-cntr"
        >
          <Form/>
        </Card>
      </Drawer>
    </div>
  );
}