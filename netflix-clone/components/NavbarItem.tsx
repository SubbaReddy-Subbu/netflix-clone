import React from "react";

interface NavbarItemProps{
    label : String;
}


const NavbarItem :React.FC<NavbarItemProps> = ({label})=>{
    return (
        <div className="text-white curser-pointer hover:text-gray-300 transition">
                {label}

        </div>
    )
}
export default NavbarItem