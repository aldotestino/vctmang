import { Box, Heading, HStack, VStack, Text, Tabs, TabList, TabPanels, TabPanel, Tab, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import OrderCard from '../components/OrderCard';
import useUserStore from '../store/userStore';
import { Order, OrderState, UserRole } from '../utils/types';
import { API_URL } from '../utils/vars';

function Profile() {

  const { isAuth, user } = useUserStore();
  const [orders, setOrders] = useState<Array<Order>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);

  useEffect(() => {
    fetch(`${API_URL}/client/orders`, {
      credentials: 'include'
    }).then(r => r.json()).then(res => {
      if(res.success) {
        setOrders(res.data.orders);
      }
    });
  }, []);

  return (
    <Box px={[5, 5, 10, 20]} py={[5, 10]}>
      <HStack spacing="4" mb="6">
        <Avatar size={['xl', '2xl']} user={user} />
        <VStack align="flex-start">
          <Heading size={['lg', 'xl']}>Ciao, {user?.client?.firstName || user?.cook?.email}</Heading>
          {user?.role === UserRole.CLIENT && <Text fontSize="xl">{user.client?.email}</Text>}
        </VStack>
      </HStack>
      <Tabs isLazy variant='enclosed' colorScheme="yellow">
        <TabList>
          <Tab>Ordini attivi</Tab>
          <Tab>Ordini archiviati</Tab>
        </TabList>
        <TabPanels>
          <TabPanel as={VStack} align="flex-start" divider={<Divider />}>
            {[...orders].filter(o => o.state === OrderState.PENDING || o.state === OrderState.TAKEN).map(o => <OrderCard key={o.id} {...o} />)}
          </TabPanel>
          <TabPanel as={VStack} align="flex-start" divider={<Divider />}>
            {[...orders].filter(o => o.state === OrderState.CLOSED).map(o => <OrderCard key={o.id} {...o} />)}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Profile;