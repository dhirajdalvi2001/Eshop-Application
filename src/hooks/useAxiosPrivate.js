import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { getTokenCookie } from "../utils/helperFunc";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleRequest = async () => {
      const token = getTokenCookie();
      if (!token || token === undefined) {
        return;
      }
      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["X-Auth-Token"]) {
            config.headers["X-Auth-Token"] = `${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    };

    handleRequest();
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
