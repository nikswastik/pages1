import React, { useState, useEffect } from "react";
import PopupForm from "../../components/PopupForm/PopupForm";
import "./SavedAddress.css";

export default function SavedAddress() {
  const [userAddress, setUserAddress] = useState([]);
  const [open , setOpen] = useState(false)

  useEffect(() => {
  let data = localStorage.getItem("userAddress");
  if(data){
    setUserAddress(JSON.parse(data));
  }
  }, []);

  const remove = (id) => {
  let updated = userAddress.filter((item , index)=>{
    return item.id != id;
   })
   localStorage.setItem("userAddress" ,JSON.stringify(updated))
   setUserAddress(updated);
  };

  const defaultHandler =(id)=>{
    let data = userAddress;
 data.map((item , index)=>{
  if(id==item.id){
    item.isDefault=true;
   }
   else{
    item.isDefault = false;
   }
})
localStorage.setItem("userAddress" , JSON.stringify(data));
setUserAddress([...data]);
  }

  const editHandler=()=>{
    setOpen(!open)
  }
  

  return (
    <div className="saved-addr-contr">
      <div className="addr-heading">
        <p className="path-text">
          Your Account / <span className="address-text">Your Address</span>
        </p>
      </div>
      <div className="saved-addres">
        <h2>Your Address</h2>
        <button className="add-addr-btn">
          <img
          alt="btn"
            className="btn-image"
            src={require("../../Assets/Images/add-location.png")}
          />
          ADD ADDRESS
        </button>
      </div>
      <hr className="hr-line" />
      <div className="address-card-contr">
        {userAddress?.map((item, index) => {
          return (
            <div className="address-card" key={index}>
              {
                <div className="mainDiv">
                  <div className="default-cntr">
                    <h3>{item?.name}</h3>
                    <div className="default">
                      {item?.isDefault && (
                        <div>
                          <img
                          alt="accept"
                            className="accept-image"
                            src={require("../../Assets/Images/accept.png")}
                          />
                          Default Address
                        </div>
                      )}
                    </div>
                  </div>
                  <p>
                    {item?.flat}, {item?.landMark}
                  </p>
                  <p>
                    {item?.city} -{item?.zipCode}
                  </p>
                  <p>{item?.state},</p>
                  <p>
                    {item?.countryCode} {item?.phone}
                  </p>
                  <div className="card-actions">

                    <p onClick={editHandler}
                    className="buttonText">EDIT</p>
                    <p className="line">|</p>
                    <p
                      className="buttonText"
                      onClick={() => {
                        remove(item?.id);
                      }}
                    >
                      REMOVE
                    </p>
                    <p className="line">|</p>
                    {!item?.isDefault && (
                      <p
                        className="buttonText"
                        onClick={() => {
                          defaultHandler(item?.id);
                        }}
                      >
                        SET AS DEFAULT
                      </p>
                    )}
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
      <PopupForm isOpen={open} editHandler = {editHandler} />
    </div>
  );
}
