import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import WarningIcon from "../../assets/images/icons/warning.svg";
import RocketIcon from "../../assets/images/icons/rocket.svg";
import { Input } from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function TeacherForm() {
  const history = useHistory();
  const [name, SetName] = useState("");
  const [avatar, SetAvatar] = useState("");
  const [whatsapp, SetWhatsapp] = useState("");
  const [bio, SetBio] = useState("");

  const [subject, SetSubject] = useState("");
  const [cost, SetCost] = useState("");

  const [scheduleItems, setScheduleItem] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    if (scheduleItems.length == 6) return;

    setScheduleItem([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();
    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("cadastro realizado com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);

        alert("error");
      });
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) return { ...scheduleItem, [field]: value };

      return scheduleItem;
    });
    setScheduleItem(updatedScheduleItems);
  }

  function handleMaskWhatsApp(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.maxLength = 13;
    SetWhatsapp(
      event.currentTarget.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1)$2")
    );
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        subtitle="O primeiro passo é preencher esse formulário de inscrição"
        page="Dar aulas"
        message={[
          { icon: RocketIcon, label: "Prepare-se!! vai ser o máximo." },
        ]}
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label="Nome Completo"
              name="name"
              value={name}
              onChange={(event) => {
                SetName(event.target.value);
              }}
            />
            <div className="two-inputs-inline">
              <Input
                label="Link da foto"
                name="avatar"
                value={avatar}
                onChange={(event) => {
                  SetAvatar(event.target.value);
                }}
              />
              <Input
                placeholder="(99) 999999999"
                label="WhatsApp"
                name="whatsapp"
                value={whatsapp}
                // onKeyPress={handleMaskWhatsApp}
                onChange={handleMaskWhatsApp}
                // onChange={(event) => {
                // SetWhatsapp(event.target.value);

                // }}
              />
            </div>

            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(event) => {
                SetBio(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(event) => {
                SetSubject(event.target.value);
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
            <Input
              label="custo da sua hora por aula"
              name="cost"
              value={cost}
              onChange={(event) => {
                SetCost(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis{" "}
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(event) =>
                      setScheduleItemValue(
                        index,
                        "week_day",
                        event.target.value
                      )
                    }
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
                    label="De"
                    name="from"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(event) =>
                      setScheduleItemValue(index, "from", event.target.value)
                    }
                  />
                  <Input
                    label="Até"
                    name="to"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(event) =>
                      setScheduleItemValue(index, "to", event.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={WarningIcon} alt="Aviso importante" />
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
