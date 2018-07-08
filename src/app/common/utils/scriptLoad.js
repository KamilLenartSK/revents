import React, {Component, Fragment} from 'react';
import Script from 'react-load-script';
const scriptLoad = (WrappedComponent) => {

    /*
    Higher order component  ScriptLoad
    Loads Google Maps 
    to do :  make it customizable to accept any third party library/libraries
    */
    const API = 'AIzaSyDezHf25HzfNBgXXaYXpEw2ISsqDkd6Zfo';

    return class ScriptLoad extends Component {
        constructor(props) {
            super(props);
            this.state = {
                scriptLoaded: false
            }
        }
        onScriptLoaded = () => this.setState({scriptLoaded: true})

        render() {

            return <Fragment>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places`}
                    onLoad={this.onScriptLoaded}/>
                <WrappedComponent scriptLoaded={this.state.scriptLoaded} {...this.props}/>
            </Fragment>

        }
    }
}

export default scriptLoad;