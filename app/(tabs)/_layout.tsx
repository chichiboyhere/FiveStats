import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import LogoTitle from '@/components/logoTitle';

export default function TabLayout() {
  return (
   
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:'white',
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
      backgroundColor: '#25292e',
      },
    }}
  >
  
  <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
        
    
      
    </Tabs>
    
  );
}

