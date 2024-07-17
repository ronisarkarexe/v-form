"use client"
import AddUserForm from "@/components/add-edit-user";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <AddUserForm />
    </div>
  );
};

export default page;
