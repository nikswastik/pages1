import React, { useState, useEffect } from "react";
import "./SavedAddress.css";
import PopupForm from "../../Components/PopupForm/PopupForm";
export default function SavedAddress() {
  const [userAddress, setUserAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    let data = localStorage.getItem("userAddress");
    // alert(JSON.stringify(data))
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
    setIsOpen(!isOpen);
    let updated = userAddress.filter((item, index) => {
      return item.id == id;
    });

    setEditData(updated[0]);
  };

  const updateHandler = (data) => {
    let updated = userAddress.filter((item, index) => {
      return item.id !== data?.id;
    });
    let temp = [...updated];
    temp.push(data);
    setUserAddress(temp);
  };

  const openHandler = () => {
    setIsOpen(!isOpen);
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
        <button className="add-addr-btn">
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
            <div className="address-card">
              {1 == 1 && (
                <div className="mainDiv">
                  <h3>{item.name}</h3>
                  <p>
                    {item?.flat}, {item?.landMark}
                  </p>
                  <p>
                    {item?.city}, {item?.zipCode}
                  </p>
                  <p>{item?.state}</p>
                  <p>+{item.phone}</p>
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
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PopupForm
        isOpen={isOpen}
        openHandler={openHandler}
        editData={editData}
        updateHandler={updateHandler}
      />
    </div>
  );
}
