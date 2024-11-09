import React from "react";
import FileList from "../components/FileList";
import FileUpload from "../components/FileUpload";
import NavBar from "../components/NavBar";
import { ToastNotifier } from "../components/ToastNotifier";

const Dashboard: React.FC = () => {
  return (
    <>
      <ToastNotifier />
      <NavBar />
      <FileUpload />
      <FileList />
    </>
  );
};

export default Dashboard;
