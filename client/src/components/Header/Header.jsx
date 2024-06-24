import React from "react";
import { Link } from "react-router-dom";
function Header({children}) {
    const [tody] = React.useState(
        new Intl.DateTimeFormat("de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date())
      );
      
    return (
        <header className="h-20 w-full  flex justify-center _div_line items-center ">
     
            <div className="_child">{children}</div>
            <Link to={'/'} className="flex justify-center w-full ">
            <p className=" text-4xl  ">
                    <span style={{color:'#195080'}} >Cal</span>
                    <span className="text-slate-300">Table</span>
                </p>
            </Link>
            <p className="_para">{tody}</p>
 
    </header>
    );
}

export default Header;