import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native'

import styles from "./styles";
import giveClassesBackgroundImage from "../../assets/images/give-classes-background.png";

function GiveClasses() {

    const { goBack } = useNavigation();

    function handleNavigateToLandingPage() {
      goBack()
    }
  

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBackgroundImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>
      <RectButton 
        onPress={handleNavigateToLandingPage} 
        style={styles.okButton}>
          <Text style={styles.OkButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
