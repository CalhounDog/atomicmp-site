
import * as React from "react";
import "../css/Spinner.css"


const Spinner = () => {
  return (
    <div style={{
      height: "80px",
      left: "50%",
      marginLeft:"-40px",
      marginTop:"-40px",
      position: "absolute",
      top: "50%",
      width: "80px",
    }}>
      <div className="lds-ring"><div/><div/><div/><div/></div>
    </div>
  )
}

export default Spinner;
