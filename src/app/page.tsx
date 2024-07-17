"use client";

import UserList from "@/components/user.list";
import { selectIsLoginState, setIsLogin } from "@/redux/features/listSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const login = useAppSelector(selectIsLoginState);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken2");
    if (!accessToken) {
      router.push("/login");
    } else {
      dispatch(setIsLogin(true));
    }
  }, [router]);

  const handelLogout = () => {
    localStorage.removeItem("accessToken2");
    dispatch(setIsLogin(false));
    router.push("/login");
  };

  return (
    <div className="px-5">
      <div>
        <div className="flex justify-between items-center py-2">
          <h2 className="text-center flex-1 text-2xl">User Management</h2>
          <Link href={"/login"}>
            <button onClick={handelLogout} className="btn btn-sm">
              {login ? "Logout" : "login"}
            </button>
          </Link>
        </div>
        <hr />
      </div>
      <div className="my-2">
        <Link href={"/add"}>
          <button className="btn btn-sm btn-outline btn-info">Add</button>
        </Link>
      </div>
      <UserList />
    </div>
  );
}
