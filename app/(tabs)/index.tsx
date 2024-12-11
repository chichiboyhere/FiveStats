import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
 import { Link } from 'expo-router'; 
 import FadeInView from '@/components/fadeInView';

export default function Index() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/statsImg.jpg")} />
     
          <FadeInView style={styles.buttonDeco}>
              <Text style={styles.linkText}><Link href="/measuresOfCentralTendencyRaw">Mean, Mode, Median (Raw)</Link></Text>
          </FadeInView>
          <FadeInView style={styles.buttonDeco}>
              <Text style={styles.linkText}><Link href="/measuresOfCentralTendencyTabulated">Mean, Mode, Median (Table)</Link></Text>
          </FadeInView>
          <FadeInView style={styles.buttonDeco}>
              <Text style={styles.linkText}><Link href="/measuresOfCentralTendencyGrouped">Mean, Mode, Median (Grouped)</Link></Text>
          </FadeInView>
          <FadeInView style={styles.buttonDeco}>
              <Text style={styles.linkText}><Link href="/measuresOfDispersionUngrouped">Dispersion (UnGrouped)</Link></Text>
          </FadeInView>
          <FadeInView style={styles.buttonDeco}>
              <Text style={styles.linkText}><Link href="/measuresOfDispersionGrouped">Dispersion (Grouped)</Link></Text>
          </FadeInView>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: '#fff',
  },
  linkText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '900'
  },
  image: {
    // width: 320,
    width:"100%",
    height: 440,
    //borderRadius: 18,
    //borderWidth: 2,
   //borderColor: 'white',
    marginVertical: 20
  },
  buttonDeco : {
    backgroundColor: "grey",
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 15,
    width: "90%",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
});
