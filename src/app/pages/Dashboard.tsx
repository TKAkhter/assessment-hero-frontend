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
      <div className="container mx-auto p-4">
        <FileUpload />
        <div className="my-10">
        <div className="divider"></div>
          <FileList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
