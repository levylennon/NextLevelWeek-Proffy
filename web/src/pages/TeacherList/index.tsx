import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import {Input} from "../../components/Input";
import Select from "../../components/Select";
import SmileIcon from "../../assets/images/icons/smile.svg";

import "./styles.css";
import api from "../../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function SearchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis"
        page="Estudar"
        message={[{ icon: SmileIcon, label: "Nós temos 32 professores." }]}
      >
        <form id="search-teachers" autoComplete="off" onSubmit={SearchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciência", label: "Ciência" },
              { value: "Educação física", label: "Educação física" },
              { value: "Física", label: "Física" },
              { value: "História", label: "História" },
              { value: "Geografia", label: "Geografia" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(event) => {
              setWeekDay(event.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            label="Hora"
            name="time"
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />
          <button type="submit">Pesquisar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}
