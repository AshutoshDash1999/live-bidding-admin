import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import UsersData from './pages/UsersData';
import ItemsData from './pages/ItemsData';
import ProductPage from './pages/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/usersData',
    element: <UsersData />,
  },
  {
    path: '/itemsData',
    element: <ItemsData />,
  },
  {
    path: '/product/:productID',
    element: <ProductPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
