"use client";

import { User } from "@/model/user.model";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/userApi";
import { Trash2 } from "lucide-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const UserList = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <div className="text-center text-blue-500 my-5">Loading...</div>;
  }
  const handelDeleteUser = async (id: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (isConfirmed) {
        const res = await deleteUser(id);
        if (res.data) {
          toast.success("Task deleted successfully!");
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data && data?.data?.length > 0 ? (
          data?.data?.map((user: User) => (
            <div key={user._id} className="px-1 py-0">
              <div className="card bg-base-100 shadow-sm border border-blue-500">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h2 className="card-title">{user.name}</h2>
                    <div className="flex gap-2">
                      <div
                        className={`badge ${
                          user.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        } badge-xs`}
                      ></div>
                      <Trash2
                        onClick={() => handelDeleteUser(user._id)}
                        className="w-4 h-4 text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <p>{user.email}</p>
                  <p>{user.rule}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No User list</div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default UserList;
