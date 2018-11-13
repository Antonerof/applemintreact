import React from 'react';
import {
    compose,
    branch,
    renderComponent,
    withHandlers,
    withState,
    lifecycle
} from 'recompose';


import CitiesList from '../../components/Cities';
import Spinner from '../../components/Spinner';

import withApi from "../../hocs/withApi";
import AddCity from "./AddCity";

const Cities = ({cities, removeCity, addCity}) => {
    return (
        <>
            <AddCity addCity={addCity} />
            <CitiesList cities={cities} removeCity={removeCity}/>
        </>
    );
};


const queryConfig = {
    url: 'https://lenovo-shop.applemint.eu/api/cities',
    headers: {
        Authorization: 'Basic YXBwbGVtaW50OmFwcGxlbWludA==',
    }
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomId = () => getRandomInt(0, Number.MAX_SAFE_INTEGER);

export default compose(
    withApi(queryConfig),
    withState('cities', 'setCities', []),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (nextProps.response && this.props.response !== nextProps.response) {
                this.props.setCities(nextProps.response.data.data);
            }
        }
    }),
    withHandlers({
        removeCity: ({cities, setCities}) => (id) => {
            const removedCityIndex = cities.findIndex(
                city => city.id === id
            );
            if (removedCityIndex === -1) {
                return;
            }
            cities.splice(removedCityIndex, 1);
            setCities(cities);
        },
        addCity: ({cities, setCities}) => ({name, region}) => {
            const city = {
                id: getRandomId(),
                name,
                region
            };
            console.log(city);
            setCities([...cities, city])
        }
    }),
    branch(
        ({response}) => response && response.status === 200,
        renderComponent(Cities),
        renderComponent(Spinner),
    ),
)()
