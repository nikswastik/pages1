import React from "react";
import Drawer from "@mui/material/Drawer";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Address from "../../Pages/Address/Address";

export default function PopupForm({ isOpen, openHandler,editData,updateHandler,isNewAddress }) {
  return (
    <div>
      <Drawer anchor={"right"} open={isOpen}>
        <div>
          <CloseIcon onClick={openHandler} style={{margin:"1em"}}/>
        </div>
        <Card
          sx={{ width: 500, height: "100%" }}
          className="ActionAreaCard-cntr"
        >
          <Address formScreen={true} editData={editData} updateHandler={updateHandler} isNewAddress={isNewAddress}/>
        </Card>
      </Drawer>
    </div>
  );
}
