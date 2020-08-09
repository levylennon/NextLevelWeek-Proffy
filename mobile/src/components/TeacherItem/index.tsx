import React, { useState } from "react";

import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unFavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import styles from "./styles";
import api from "../../services/api";

export interface Teacher {
  _id: string;
  user: {
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
  };
  subject: {
    description: string;
  };
  cost: number;
  schedule: {
    week_day: number;
    from: number;
    to: number;
  };
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsApp() {
    api.post('connections',{
      user: teacher._id
    })
    
    Linking.openURL(
      `whatsapp://send?phone=${teacher.user.whatsapp}&text=Olá, gostaria de marcar uma aula.`
    );
  }

  async function handletoggleFavorites() {
    const AllFavorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = new Array();

    // verify if exist any favorite teacher, if exist the let favoritesArray will get all favorites teachers
    if (AllFavorites) favoritesArray = JSON.parse(AllFavorites);

    // verify if teacher selected is favorite
    if (isFavorited) {
      // if yes, i need get him index and remove from favorites array 
      // find index from teacher
      const favoritedIndex = favoritesArray.findIndex(
        (teacherIndex: Teacher) => {
          return teacherIndex._id === teacher._id;
        }
      );
      // remove teacher from favorites array 
      favoritesArray.splice(favoritedIndex, 1)
      // change the favorited to false
      setIsFavorited(true);
    } else {
      // if not, i need to do a push in array, with him ID  
      favoritesArray.push(teacher);

      // change the favorited to true
      setIsFavorited(true);
    }

    // save local storage the new teachers favorite's array
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.user.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}> {teacher.user.name} </Text>
          <Text style={styles.subject}> {teacher.subject.description} </Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.user.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}> R$ {teacher.cost} </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handletoggleFavorites}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favoritedButton : {},
            ]}
          >
            {isFavorited ? (
              <Image source={unFavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsApp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
