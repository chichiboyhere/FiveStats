import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="measuresOfCentralTendencyRaw"  options={{title: 'Mean, Mode, Median (Raw)'}}   />
        <Stack.Screen name="measuresOfCentralTendencyTabulated"  options={{title: 'Mean, Mode, Median (Table)'}}   />
        <Stack.Screen name="measuresOfCentralTendencyGrouped"  options={{title: 'Mean, Mode, Median (Grouped)'}}   />
        <Stack.Screen name="measuresOfDispersionUngrouped"  options={{title: 'Dispersion (Ungrouped)'}}   />
        <Stack.Screen name="measuresOfDispersionGrouped"  options={{title: 'Dispersion (Grouped)'}}   />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
