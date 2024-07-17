import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/redux/api/userApi";

interface UserFormInputs {
  email: string;
  name: string;
  password: string;
  position: string;
  rule: string;
}

const AddUserForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<UserFormInputs>();
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit = async (data: UserFormInputs) => {
    try {
      const result = await createUser(data);
      if (result) {
        toast.success("User created successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Fail to create user!.");
    }
    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 bg-white rounded shadow-md"
      >
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="email"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            {...register("name", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            {...register("password", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="password"
          />
        </div>
        <div>
          <label className="block text-gray-700">Position</label>
          <input
            {...register("position", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
          />
        </div>
        <div>
          <label className="block text-gray-700">Rule</label>
          <input
            {...register("rule", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add User
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddUserForm;
