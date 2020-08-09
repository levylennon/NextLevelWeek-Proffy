import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";

import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";
import RegisteredMessage from "./pages/RegisteredMessage";
import Register from './pages/Register'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/success" exact component={RegisteredMessage} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/study" exact component={TeacherList} />
      <Route path="/give-classes" exact component={TeacherForm} />
    </BrowserRouter>
  );
}
