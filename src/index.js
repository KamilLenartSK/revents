import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {configStore} from './app/store/configStore';
import {Provider} from 'react-redux';
import './index.css';
import App from './app/layout/App';
import ScrollToTop from './app/common/utils/scrollToTop'
import registerServiceWorker from './registerServiceWorker';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store = configStore();

let render = ()=> ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <ScrollToTop>
            <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut'/>
            <App/>
        </ScrollToTop>

    </BrowserRouter>
</Provider>, document.getElementById('root'));

store.firebaseAuthIsReady.then(()=>{
    render();
})

registerServiceWorker();
