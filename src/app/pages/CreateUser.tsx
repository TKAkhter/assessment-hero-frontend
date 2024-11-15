import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtUserPayload, StoreRootState } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BannerDark from "../assets/banner-dark.png";
import Logo from "../assets/logo.png";
import { ToastNotifier } from "../components/ToastNotifier";
import { toast } from "react-toastify";
import axiosInstance from "../common/axios";

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state: StoreRootState) => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreateUser = async () => {
    try {
      const response = await axiosInstance.post(`/auth/register`, {
        username,
        password,
      });
      const { data } = await axiosInstance.post(`/auth/login`, {
        username,
        password,
      });
      const token = data.token;
      const decoded: JwtUserPayload = jwtDecode(token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: token,
          username: decoded.username,
          userId: decoded.userId,
        },
      });
    } catch (error) {
      console.error("User creation failed:", error);
      toast.error("Account Creation Failed!");
    }
  };

  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token, history]);

  return (
    <section className="h-svh bg-neutral-200 dark:bg-neutral-700">
      <ToastNotifier />
      <div className="container h-full p-10 mx-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap pt-10 md:pt-0">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={Logo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">Welcome!</h4>
                    </div>
                    <form>
                      <p className="mb-4">Please create your account</p>
                      <input
                        className="block w-full text-black p-3 rounded-md focus:outline-none mb-4"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        className="block w-full text-black p-3 rounded-md focus:outline-none mb-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          onClick={handleCreateUser}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-gray-500 hover:bg-gray-700"
                          type="button"
                        >
                          Register
                        </button>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <button
                          onClick={() => history.push("/login")}
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{ backgroundImage: `url(${BannerDark})` }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
