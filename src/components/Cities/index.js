import React from 'react';
import PropTypes  from 'prop-types';

import CityItem from "./CityItem";

const CitiesList = ({cities, removeCity}) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>region</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((city) => (
                    <CityItem key={city.id} city={city} removeCity={removeCity}/>
                ))}
                </tbody>

            </table>
        </div>
    )
};

CitiesList.defaultProps = {
    cities: []
};

CitiesList.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape(CityItem.propTypes))
};

export default CitiesList;