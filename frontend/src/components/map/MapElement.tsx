import React from "react";
import { GoHome } from "react-icons/go";

type MapElementProps = {
    top: string;
    left: string;
    id: string;
};

const MapElement:React.FC<MapElementProps> = ({top, left, id}) => {
	return (
		<GoHome
			className="absolute h-6 w-6 text-success cursor-pointer"
            style={{ top: `${top}`, left: `${left}` }}
			onClick={() => alert(`${id} click bhayo hai`)}
		/>
	);
};

export default MapElement;
