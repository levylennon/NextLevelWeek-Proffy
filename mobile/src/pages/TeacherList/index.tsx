import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import styles from "./styles";

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [teachers, setTeachers] = useState([]);

  // search filters
  const [subject, setSubject] = useState("5f2d29381a6bd52bc4fc146f");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");


  
  function loadFavorites(){
    AsyncStorage.getItem("favorites").then((Response) => {
      if (Response) {
        const favoritedTeachers = JSON.parse(Response);
        const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
          return teacher._id
        })
        setFavorites(favoritedTeachersId);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const Response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFilterVisible(false);
    setTeachers(Response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>

            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChangeText={(text) => setWeek_day(text)}
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
          <TeacherItem 
          key={teacher._id} 
          teacher={teacher}
           favorited={favorites.includes(teacher._id)}
          />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
