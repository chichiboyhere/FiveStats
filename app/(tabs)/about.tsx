import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router'; 
import FadeInView from '@/components/fadeInView';
import { useFonts } from 'expo-font';

export default function About() {
  const[ year, setYear ] = useState("");
  const [loaded, error ] = useFonts({
    RobotoItalic: require("../../assets/fonts/RobotoCondensed-LightItalic.ttf"),
    Roboto: require("../../assets/fonts/RobotoCondensed-Regular.ttf")
  })

  useEffect(() => {
   if (error)throw error
   },[error])
     
  useEffect(() => {
    const thisYear: string = new Date().getFullYear().toString()
    setYear(thisYear)
    },[])


  return (loaded &&
    (<ScrollView>
    <View style={styles.container}>
      <FadeInView style={styles.image}>
        <Image style={styles.image} source={require("../../assets/images/student.jpg")} />
      </FadeInView>
     
     <Text style={styles.text}>
       Bloomer Tech, a subsidiary of Bloomer Inc, is an innovative company that brings cutting-edge educative and technological services your way.
    </Text> 
    <Text style={styles.text}>
        The FiveStats app is all about a set of very useful statistical calculators on 
    </Text>
    <Text style={styles.list}>
      <Link href="/measuresOfCentralTendencyRaw">*  Mean, Mode, Median (Raw)</Link> 
    </Text>
    <Text style={styles.list}>
      <Link href="/measuresOfCentralTendencyTabulated">*  Mean, Mode, Median (Table)</Link> 
    </Text>
    <Text style={styles.list}>
      <Link href="/measuresOfCentralTendencyGrouped">*  Mean, Mode, Median (Grouped)</Link> 
    </Text>
    <Text style={styles.list}>
      <Link href="/measuresOfDispersionUngrouped">*  Measures of Dispersion (UnGrouped)</Link> 
    </Text>
    <Text style={styles.list}>
      <Link href="/measuresOfDispersionGrouped">*  Measures of Dispersion (Grouped)</Link> 
    </Text>
     
        <View style={styles.copyContainer}>
            <Text style={styles.copyright}>&copy;{year}</Text>
        </View>
    
    </View>
    </ScrollView>)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontFamily: "RobotoItalic"
  },
  

list: {
    color: 'white',
    fontSize: 16,
    marginTop: 15,
    width: '90%',
    fontFamily: "RobotoItalic"
},
image: {
  width: "100%",
  height: 440,
  marginBottom: 10
},
copyContainer: {
  marginTop: 20
},
copyright: {
  fontSize: 13,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white'
}
});
