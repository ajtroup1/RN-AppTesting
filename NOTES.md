# Making a RN app

**[Symbol library](https://us.tobiidynavox.com/pages/pcs-licensing) but we have to apply for licensing**

## Contents
1. [What is Expo?](#what-is-expo)
2. [Create an Expo Project](#create-an-expo-project)
3. [Navigation Patterns](#navigation-patters)
4. [UI](#ui)

## What is Expo

## Create an Expo project

1. Create a new [expo](https://docs.expo.dev/) app
    ```bash
    npx create-expo-app
    ```
2. Structure project according to proper Expo practices:
    - `app`
        - Contains the app's navigation system, which is file-based
    - `assets`
        - Holds fonts and images for references in styling
    - `components`
        - Contains actual React components
        - Remember to further segment these as well:
            - **Home/**
                - *Home.tsx*
                - *HomeImage.tsx*
                - *HomeOtherComponent.tsx*
            - **Profile/**
                - *Profile.tsx*
                - *EditProfileForm.tsx*
                - *AddFriendForm.tsx*
    - `constants`
        - Simply contains constant values
            - Color codes
            - Links to resources
            - Global information
    - `hooks`
        - Simply contains React hooks
            - Refresher: [hooks](https://react.dev/reference/react/hooks) share common behavior between components
                - **getColorCode("Green")**
                    - Can be used anywhere that needs the color green
    - `scripts`
        - Contains <ins>npm</ins> scripts to run
            - Initially just contains a project to reset the project
    - `app.json`
        - High-level app configurations
            - Changes the behavior of your project in dev, building 
3. Expo Router
    - Get Expo Router
        - Install dependencies
            ```bash
            $ npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
            ```
        - Set up entry point in `package.json`
            ```json
            {
              "main": "expo-router/entry"
            }
            ```
    - Every file and sub-directory inside the `app/` is either a `_layout` file or a route in the app
        - Other files like hooks, styles, utils, ... cannot be in the `app/` folder since they are not routes
    - Dynamic routing
        - Consider this project structure:
            ```
            /app/
                - _layout.tsx   <--- Layout for the overall app
                /(tabs)/
                    - _layout.tsx   <--- Tab layout
                    - settings.tsx   <--- matches '/settings'
                    /(home)/
                        - _layout.tsx   <--- Home layout
                        - index.tsx   <--- matches '/'
                        /details/
                            - [id].tsx   <--- mathces '/details/1', '/details/2', '/details/3', ...
            ```
    - Navigate to different routes by using a `<Link>` component
        ``` tsx
        import { Link } from 'expo-router'
        // .....
        export default function Component(): JSX.Element {
          return (
            //.....
            <Link href="/settings">This is a link to the settings page</Link>
          )
        }
        ```
        - You can also use an `href{}` object:
            ```tsx
            <Link
              href={{
                pathname: '/details/[id]',
                params: { id: 'myIdentifier' },
              }}>
              View user details
            </Link>
            ```
4. ...

## Navigation patters

[Root link](https://docs.expo.dev/develop/file-based-routing/)

Navigators are responsible for rendering and managing a set of screens

Universal navigator parameters that can be sent to any navigator component ([link](https://reactnavigation.org/docs/navigator/#configuration)): 
- `id`
    - Optional unique ID for the navigator
- `initialRouteName`
    - The name of the route to render on the initial load of the navigator
- `layout`
    - Wrapper around the navigator. "The code in a layout callback has access to the navigator's state, options etc"
- `screenOptions`
    - Default options for all screens in that navigator
    - [Options for screens](https://reactnavigation.org/docs/screen-options/)


1. Stack Navigator ([link](https://docs.expo.dev/router/advanced/stack/))
    - Transition your app between different screens and keep a "stack" structure to trace your route history
        - Let's say you start at `index.tsx`. From that page you click on a link to `photos.tsx`. Then, you hit a callback button which takes you back to `index.tsx`
    - <div style="text-align: center;">
        <video height="400px" width="auto" src="https://reactnavigation.org/assets/7.x/stack-android.mp4" autoplay loop muted></video>
      </div>
    - Install
        ```bash
        $ npm install @react-navigation/stack
        ```
    - Create
        ```tsx
        import { createStackNavigator } from '@react-navigation/stack';

        const Stack = createStackNavigator();

        function MyStack() {
          return (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          );
        }
        ```
    - [API Definition](https://reactnavigation.org/docs/stack-navigator/?config=dynamic#api-definition)
2. Tabs ([link](https://docs.expo.dev/router/advanced/tabs/))
    - Adds a tabs layout at the bottom of your app to navigate between tab pages
    - <div style="text-align: center;">
        <video height="400px" width="auto" src="https://reactnavigation.org/assets/7.x/bottom-tabs.mp4" autoplay loop muted></video>
      </div>
    - Basic tabs layout / structure
        ```
        /(tabs)/
            - _layout.tsx
            - index.tsx
            - settings.tsx
            - profile.tsx
        ```
    - Create a tabs navigator
        ```tsx
        import { Tabs } from 'expo-router';
        // ...

        export default function TabLayout() {
          // ...
          return (
            // ...
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
              <Tabs.Screen
                name="index"
                options={{
                  title: 'Home',
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
              />
              <Tabs.Screen
                name="settings"
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
              />
            </Tabs>
            // ...
          );
        }
        ```
3. Drawer ([link](https://docs.expo.dev/router/advanced/drawer/), [alt link](https://reactnavigation.org/docs/drawer-based-navigation/))
    - Drawers allow for swiping to open new pages on the borders of the app (usually from the left side)
    - <div style="text-align: center;">
        <video height="400px" width="auto" src="https://reactnavigation.org/assets/navigators/drawer/drawer.mp4" autoplay loop muted></video>
      </div>
    - Install
        ```bash
        $ npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
        ```
    - Create
        ```tsx
        import { GestureHandlerRootView } from 'react-native-gesture-handler';
        import { Drawer } from 'expo-router/drawer';
        // ...

        export default function Layout() {
          // ...
          return (
            // ...
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer />
            </GestureHandlerRootView>
            // ...
          );
        }
        ```
4. Modals
    - React Native has a native [`<Modal>`](https://reactnative.dev/docs/modal) ([Expo alternate resource](https://docs.expo.dev/router/advanced/modals/)) component in its core API
    - <div style="text-align: center;">
      <video src="https://docs.expo.dev/static/videos/expo-router/react-native-modal.mp4"/ autoplay loop muted>
    </div>
    - Create
        - Navigate to a modal component using a regular `<Link>` component
            ```tsx
            <Link href="/modal" style={styles.link}>
              Open modal
            </Link>
            ```

## UI

[Root link](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)