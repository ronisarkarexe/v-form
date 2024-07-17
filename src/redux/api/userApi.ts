import { token } from "@/utils/utils";
import { api } from "./apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: `/user/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Create"],
    }),
    getAllUsers: build.query({
      query: () => {
        return {
          url: `/user/lists`,
          method: "GET",
        };
      },
      providesTags: ["Create", "Delete"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delete"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApi;
