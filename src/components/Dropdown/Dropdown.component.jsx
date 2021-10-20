import React, { useState } from 'react';
import './Dropdown.styles.css';

const Dropdown = props => {

    const [locationsVisible, setLocationsVisible] = useState(false);

    return(
        <div>
            <div className="dropdown" onClick={()=>setLocationsVisible(true)}>
                    <p>Locations</p>
                    <p>[ICON]]</p>
            </div>
        </div>
    );
}
export default Dropdown;

{/* <ul style={{"display": locationsVisible ? "block" : "none"}} className="locationList">
<input placeholder="Search..." />
<li>Leicester</li>
<li>London</li>
<li>Paris</li>
</ul> */}