import React from "react";
import Footer from "react-footer-comp";
import "./footer.css";

function Footer1() {
  return (
    <>
      <div className="footer">
        <Footer
          copyrightIcon
          height={44}
          bgColor={"white"}
          copyrightText
          copyrightIconStyle={{
            color: "lightgrey",
            fontSize: 18,
            marginRight: 10,
          }}
          copyrightTextStyle={{
            color: "darkgrey",
            fontSize: 16,
            marginRight: 10,
          }}
          textStyle={{ color: "#309895", fontSize: 14, marginRight: 10 }}
          text={"All rights reserved"}
        />
      </div>
    </>
  );
}
export default Footer1;
