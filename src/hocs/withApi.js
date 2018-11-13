import React from 'react';
import {wrapDisplayName} from 'recompose'
import * as axios from "axios";

const withApi = (config) => (WrappedComponent) => {
    class WithApi extends React.Component {

        config = {
            method: 'get'
        };

        constructor(props) {
            super(props);
            this.state = {
                response: null
            }
        }

        componentDidMount() {
            axios({...this.config, ...config})
                .then((response) => {
                    this.setState({
                        response
                    })
                });
        }

        render() {
            return (
                <WrappedComponent response={this.state.response} {...this.props}/>
            )
        }


    }

    WithApi.displayName = wrapDisplayName(WrappedComponent, 'WithApi');

    return WithApi;
};

export default withApi;