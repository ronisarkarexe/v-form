"use client";

import { User } from "@/model/user.model";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import React from "react";

const UserList = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <div className="text-center text-blue-500 my-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data && data?.data?.length > 0 ? (
          data?.data?.map((user: User) => (
            <div key={user._id} className="p-2">
              <div className="card bg-base-100 shadow-sm border border-blue-500">
                <div className="card-body">
                  <h2 className="card-title">{user.name}</h2>
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
    </div>
  );
};

export default UserList;
