import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Menu from './views/Menu';
import Checkout from './views/Checkout';
import Login from './views/Login';
import Signup from './views/Signup';
import useUserStore from './store/userStore';
import { useEffect } from 'react';
import Profile from './views/profile';

function App() {

  const { fetch } = useUserStore();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Flex minH="100vh" direction="column">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Flex>
  );
}

export default App;
