import React, { useState, useEffect } from "react";
import "./Address.css";
import Codes from "../../Utils/state.json";
import Country from "../../Utils/Countrycode.json";
import { useNavigate } from "react-router-dom";

export default function Address({ formScreen,editData,updateHandler }) {
  const navigate = useNavigate();
  const [id,setId]=useState()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCose] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landMark, setLandMark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorField, setErrorField] = useState("");
  const [test, setTest] = useState([]);

  useEffect(() => {
    // alert(JSON.stringify(editData))
    if(editData){
        setId(editData?.id)
        setName(editData?.name)
        setPhone(editData?.phone);
        setZipCose(editData?.zipCode);
        setFlat(editData?.flat);
        setArea(editData?.area);
        setLandMark(editData?.landMark);
        setCity(editData?.city);
        setState(editData?.state);
    }
    let data = localStorage.getItem("userAddress");
    if (data) {
      setTest(JSON.parse(data));
    }
  }, []);

  const nameHandler = (event) => {
    setName(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const zipHandler = (event) => {
    setZipCose(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const flatHandler = (event) => {
    setFlat(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const AreaHandler = (event) => {
    setArea(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const landHandler = (event) => {
    setLandMark(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const stateHandler = (event) => {
    setState(event.target.value);
    setErrorMsg(" ");
    setErrorField(" ");
  };

  const submitHandler = () => {
    var mobileRE =
      /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

    if (!name) {
      setErrorMsg("Please Enter Name");
      setErrorField("name");
    } else if (name.length < 2) {
      setErrorMsg("Name should be greter than 2");
      setErrorField("name");
    } else if (!phone) {
      setErrorMsg("Please Enter your phone number");
      setErrorField("phone");
    } else if (!phone.match(mobileRE)) {
      setErrorMsg("Please Enter valid phone number");
      setErrorField("phone");
    } else if (!zipCode) {
      setErrorMsg("Please Enter your zipCode");
      setErrorField("zipCode");
    } else if (!/^[0-9]{6}$/.test(zipCode)) {
      setErrorMsg("Please Enter valid zipCode");
      setErrorField("zipCode");
    } else if (flat.length < 2) {
      setErrorMsg("Please Enter flat,House no, Company, Apartment");
      setErrorField("flat");
    } else if (area.length < 2) {
      setErrorMsg("Please Enter Area,Street,Sector,Village");
      setErrorField("area");
    } else if (landMark.length < 2) {
      setErrorMsg("Please Enter Landmark");
      setErrorField("landMark");
    } else if (city.length < 2) {
      setErrorMsg("Please Enter Landmark");
      setErrorField("city");
    } else {
      setErrorMsg(" ");
      setErrorField(" ");
      //   alert(JSON.stringify(test))xs
      // alert(JSON.stringify(test))
      let data = [...test];
      let address = {
        id: Date.now(),
        name: name,
        phone: phone,
        zipCode: zipCode,
        flat: flat,
        area: area,
        landMark: landMark,
        city: city,
        state: state,
      };
      //   // console.log(name,phone,zipCode,flat,area,landMark,city,state)
      data.push(address);
      //   alert(JSON.stringify(data));
      setTest(data);
      localStorage.setItem("userAddress", JSON.stringify(data));
      //   alert(JSON.stringify(data))
      navigate("/saved");
    }
  };

  const update=()=>{
    let address = {
        id: id,
        name: name,
        phone: phone,
        zipCode: zipCode,
        flat: flat,
        area: area,
        landMark: landMark,
        city: city,
        state: state,
      };
    updateHandler(address)
}

  return (
    <div className="address-contr" style={{ padding: formScreen ? 0 : "1em" }}>
      <div
        className="address-form"
        style={{
          width: formScreen ? "100%" : "50%",
          border: formScreen ? 0 : "1px solid lightgray",
        }}
      >
        <h3 className="mainText">{formScreen ? "Edit" : "Your"} Address</h3>
        <p className={formScreen ? "form-label-text" : "label-text"}>
          Full Name {id}
        </p>
        <input
          className={formScreen ? "formfield" : "field"}
          type="text"
          placeholder="Eg: Shyam Devadig"
          value={name}
          onChange={nameHandler}
          style={{ border: errorField == "name" && "1px solid red" }}
        />
        {errorField == "name" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Phone Number
        </p>
        <div className={formScreen ? "number-form-feilds" : "number-fields"}>
          <select name="code" className="selectCountry ">
            {Country.map((code, index) => {
              return (
                <option key={index} value={`${code.flag}`}>
                  {`${code.dial_code} ${code.flag}`}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            className={formScreen ? "formfield" : " phone field"}
            // className="phone field "
            onChange={phoneHandler}
            style={{ border: errorField == "phone" && "1px solid red" }}
          />
        </div>
        {errorField == "phone" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Zip Code
        </p>
        <input
          type="text"
          placeholder="Eg: 6 digits(0-9)zip code"
          className={formScreen ? "formfield" : "field"}
          value={zipCode}
          onChange={zipHandler}
          style={{ border: errorField == "zipCode" && "1px solid red" }}
        />
        {errorField == "zipCode" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Flat,House no,Company,Apartment
        </p>
        <input
          type="text"
          placeholder="Flat,House no,Company,Apartment"
          className={formScreen ? "formfield" : "field"}
          value={flat}
          onChange={flatHandler}
          style={{ border: errorField == "flat" && "1px solid red" }}
        />
        {errorField == "flat" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Area,Street,Sector,Village
        </p>
        <input
          type="text"
          placeholder="Area,Street,Sector,Village"
          className={formScreen ? "formfield" : "field"}
          value={area}
          onChange={AreaHandler}
          style={{ border: errorField == "area" && "1px solid red" }}
        />
        {errorField == "area" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Landmark
        </p>
        <input
          type="text"
          placeholder="Eg: Nagayakashe Hall"
          className={formScreen ? "formfield" : "field"}
          value={landMark}
          onChange={landHandler}
          style={{ border: errorField == "landMark" && "1px solid red" }}
        />
        {errorField == "landMark" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>
          Town/City
        </p>
        <input
          type="text"
          placeholder="Enter your Town/City name"
          className={formScreen ? "formfield" : "field"}
          value={city}
          onChange={cityHandler}
          style={{ border: errorField == "city" && "1px solid red" }}
        />
        {errorField == "city" && (
          <p className={formScreen ? "form-error-msg" : "error-msg"}>
            {errorMsg}
          </p>
        )}

        <p className={formScreen ? "form-label-text" : "label-text"}>State</p>
        <div className={formScreen ? "form-states" : "states"}>
          <select
            name="state"
            value={state}
            onChange={stateHandler}
            className="selectState "
          >
            {Codes.map((code, index) => {
              return (
                <option key={index} value={`${code.name}`}>
                  {`${code.name}`}
                </option>
              );
            })}
          </select>
        </div>

        <div
          className={formScreen ? "form-termsconditions" : "termsconditions"}
        >
          <input className="check" type="checkbox" />
          <p className="checkLine  ">Make this my default address</p>
        </div>

        <br />
        <button
          className={formScreen ? "form-addBtn " : "addButton "}
          onClick={formScreen? update :submitHandler}
        >
          {formScreen?"SAVE ADDRESS AND CONTINUE":"ADD ADDRESS"}
        </button>
      </div>
    </div>
  );
}
