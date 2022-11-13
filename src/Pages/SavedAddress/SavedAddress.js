import React, { useState, useEffect } from "react";
import "./SavedAddress.css";
import PopupForm from "../../Components/PopupForm/PopupForm";
export default function SavedAddress() {
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isNewAddress, setIsNewAddress] = useState(false);
  useEffect(() => {
    let data = localStorage.getItem("userAddress");
    setUserAddress(JSON.parse(data));
  }, []);

  const remove = (id) => {
    // alert(id);
    let updated = userAddress.filter((item, index) => {
      return item.id !== id;
    });
    setUserAddress(updated);
    localStorage.setItem("userAddress", JSON.stringify(updated));
  };

  const editHandler = (id) => {
    setIsNewAddress(false);
    setIsOpen(!isOpen);
    let updated = userAddress.filter((item, index) => {
      return item.id == id;
    });

    setEditData(updated[0]);
  };

  const updateHandler = (data, isNew) => {
    if (isNew) {
     
      let newData = [];
      newData.push(data);
      if (userAddress) {
        data.id = Date.now() + "hey";
        let adress = userAddress.concat(newData);
        setUserAddress([...adress]);
        localStorage.setItem("userAddress", JSON.stringify(adress));
      } else {
        setUserAddress([...newData]);
        localStorage.setItem("userAddress", JSON.stringify(newData));
      }

      if(data.isDefault){
        let data = [...userAddress];
        data.map((item, index) => {
          if (item.id == data.id) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
      }
     
    console.log(data);
    } else {
      let updated = userAddress.filter((item, index) => {
        return item.id !== data?.id;
      });
      if (data.isDefault) {
        defaultHandler(data.id);
      }
      let temp = [...updated];
      temp.push(data);
      setUserAddress(temp);
      setIsOpen(!isOpen);
      localStorage.setItem("userAddress", JSON.stringify(temp));
    }
    openHandler();
  };

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  const defaultHandler = (id) => {
    let data = [...userAddress];
    data.map((item, index) => {
      if (item.id == id) {
        item.isDefault = true;
      } else {
        item.isDefault = false;
      }
    });
    console.log(data);
    setUserAddress([...data]);
    localStorage.setItem("userAddress", JSON.stringify(data));
  };
  const newAddrHandler = () => {
    setIsOpen(!isOpen);
    setIsNewAddress(true);
  };

  return (
    <div className="saved-addr-contr">
      <div className="addr-heading">
        <p className="path-text">
          Your Account / <span className="address-text">Your Address</span>
        </p>
      </div>
      <div className="saved-addres">
        <h3>Your Address</h3>
        <button className="add-addr-btn" onClick={newAddrHandler}>
          <img
            className="btn-image"
            src={require("../../Assets/Images/add-location.png")}
          />
          Add Address
        </button>
      </div>
      <hr />
      <div className="address-card-contr">
        {userAddress?.map((item, index) => {
          return (
            <div className="address-card" key={index}>
              {
                <div className="mainDiv">
                  <div className="default-cntr">
                    <h3>{item.name}</h3>
                    <div className="default">
                      {item?.isDefault && (
                        <div>
                          <img
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
                    {item?.city}, {item?.zipCode}
                  </p>
                  <p>{item?.state}</p>
                  <p>
                    {item?.countryCode} {item.phone}
                  </p>
                  <div className="card-actions">
                    <p
                      className="buttonText"
                      onClick={() => {
                        editHandler(item?.id);
                      }}
                    >
                      EDIT
                    </p>
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
                    {!item.isDefault && (
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
      <PopupForm
        isOpen={isOpen}
        openHandler={openHandler}
        editData={editData}
        updateHandler={updateHandler}
        isNewAddress={isNewAddress}
      />
    </div>
  );
}
