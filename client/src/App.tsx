import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Menu from './views/Menu';
import Checkout from './views/Checkout';
import Login from './views/Login';
import Signup from './views/Signup';
import useUserStore from './store/userStore';
import { useEffect, useState } from 'react';
import CustomerProfile from './views/customerProfile';
import { UserRole } from './utils/types';
import CookProfile from './views/cookProfile';
import OrderView from './views/OrderView';
import LoadingPage from './components/LoadingPage';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const { fetch, user } = useUserStore();
  useEffect(() => {
    fetch().then(() => setIsLoading(false));
  }, []);

  return (
    <Flex minH="100vh" direction="column">
      <NavBar />
      {!isLoading ? 
        <Routes>
          {(user === null || user?.role === UserRole.CUSTOMER) ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />}/>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<CustomerProfile />} />
            </> : 
            <Route path="/" element={<CookProfile />} />
          }
          <Route path="order/:orderId" element={<OrderView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes> : 
        <LoadingPage />
      }
    </Flex> 
  );
}

export default App;
