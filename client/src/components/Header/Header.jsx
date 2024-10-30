import React from "react";
import { Link } from "react-router-dom";
function Header({ children }) {
  const [tody] = React.useState(
    new Intl.DateTimeFormat("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date())
  );

  return (
    <header className="h-20 min-w-full px-2 flex justify-between items-center ">
  
      <div className="w-1/3">{children}</div>

      <Link to={'/'} className="w-1/3 flex justify-center">
        <p className=" text-4xl  ">
          <span className="text-slate-300" >Cal</span>
          <span className="text-slate-100">Table</span>
        </p>
      </Link>

      <div className="w-1/3 flex justify-end" >
        <p className="text-lg">{tody}</p>
      </div>

    </header>
  );
}

export default Header;