import { tabs } from "../../styles/index"
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'
import { fonts } from '../../styles/index'

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: tabs.icon.gap, paddingTop: 20 }}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={{ width: tabs.icon.width, height: tabs.icon.height }}
      />
      <Text style={{ fontFamily: focused ? (fonts.poppinsSemiBold) : (fonts.poppinsRegular), fontSize: tabs.icon.fontSize }}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: '10%',
            backgroundColor: 'red',
          },
        }}
      >
        <Tabs.Screen name="Home" options={{
          title: 'Home',
          headerShown: false,
          tabBarItemStyle: { backgroundColor: 'green' },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="Create" options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="Bookmark" options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          )
        }} />
        {/* <Tabs.Screen name="Home" options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }} /> */}
      </Tabs>
    </>
  )
}

export default TabsLayout