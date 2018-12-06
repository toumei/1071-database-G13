import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './partials/Navbar';
import Header from './partials/Header';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, HashRouter, Route } from 'react-router-dom'

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('root'));

// function Home() {
//     return <h2>Home Page</h2>
// }

// function Second() {
//     return <h2>a Page</h2>
// }

// function Third() {
//     return <h2>b Page</h2>
// }

// ReactDOM.render(
//     (
//         <BrowserRouter>
//             <Route path='/' component={Home}></Route>
//             {/* <Route path='/second' component={Second}></Route>
//             <Route path='/third' component={Third}></Route> */}
//         </BrowserRouter>
//     ),
//     document.getElementById('root')
// );

serviceWorker.unregister();
