import { Image } from "react-native";

function LogoTitle() {
    return (
      <Image
        style={{ width: 133, height: 33 }}
        source={require('../assets/images/fiveStats_logo.png')}
      />
    );
  }

  export default LogoTitle