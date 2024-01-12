import React from 'react';
import ReactDOM from 'react-dom/client';
//Routing Stuff
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css'; default styling//
import './Assets/styles/bootstrap.custom.css';
import './Assets/styles/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* redux global state setup */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
