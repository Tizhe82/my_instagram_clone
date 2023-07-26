import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './conditions/firebase';


ReactDOM.render(
<FirebaseContext.Provider value={{firebase, FiedValue}}>
    <App/>
</FirebaseContext.Provider>,  
document.getElementById('root'));
