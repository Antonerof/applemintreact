import React  from 'react';
import PropTypes  from 'prop-types';

import './cityItem.scss';

const CityItem = ({city, removeCity}) => {
    const {id, name, region} = city;
    return (
        <tr className="cityItem">
            <td className="cityItem__cell">{id}</td>
            <td className="cityItem__cell">{name}</td>
            <td className="cityItem__cell">{region}</td>
            <td className="cityItem__cell">
                <button className="btn btn-danger btn-sm" onClick={() => removeCity(id)}>Remove</button>
            </td>
        </tr>
    )
};

CityItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    region: PropTypes.string
};

export default CityItem;
