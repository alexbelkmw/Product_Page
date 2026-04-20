import { useState } from "react";
import { TextField } from "./TextField";
import { Checkbox } from "./CheckBox";
import { Button } from "./Button";
import { getUser } from "../api";
import type { User } from "../api/types";

interface Props {
  onAuth: (value: User) => void;
}

export const LoginForm = ({ onAuth }: Props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [logError, setLogError] = useState("");
  const [passError, setPassError] = useState("");
  const [authError, setAuthError] = useState("");

  const checkEmptyFields = () => {
    const ERROR_MSG = "Поле обязательно для заполнения";

    if (login === "" || password === "") {
      setLogError(login ? "" : ERROR_MSG);
      setPassError(password ? "" : ERROR_MSG);
      return true;
    }

    return false;
  };

  const logUser = () => {
    if (checkEmptyFields()) return;

    getUser({ login, password }).then((response) => {
      if (!response?.ok) {
        const errorMessage =
          response?.status === 400
            ? "Неверный логин или пароль"
            : "Ошибка авторизации";

        setAuthError(errorMessage);
        return;
      }

      response.json().then((user) => {
        onAuth(user);
        localStorage.clear();

        if (save) {
          localStorage.setItem("user", JSON.stringify(user));
          return;
        }
        sessionStorage.setItem("user", JSON.stringify(user));
      });
    });
  };

  return (
    <div className="rounded-[40px] bg-white  shadow-login h-176 w-154 p-1.5 center">
      <div className="rounded-[34px] p-12 border border-gray-200 w-full flex gap-8 flex-col items-center h-full bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)]">
        <div className="size-13 bg-white rounded-full p-px ">
          <div className="w-full h-full flex items-center justify-center p-1 bg-white rounded-full">
            <img src="/logo.svg" />
          </div>
        </div>
        <div>
          <span className="block font-semibold text-[40px] leading-[1.1] tracking-[-0.015em] h-11">
            Добро пожаловать!
          </span>
          <span className="w-full h-6.75 block text-center mt-3 font-medium lext-lg text-local-gray">
            Пожалуйста, авторизируйтесь
          </span>
        </div>
        <div className="w-100 flex flex-col gap-4">
          <TextField
            label="Логин"
            value={login}
            onChange={(value) => {
              setLogError("");
              setLogin(value);
            }}
            errorMsg={logError}
          />
          <TextField
            label="Пароль"
            icon={<img src="/lock.svg" />}
            hiddenField
            value={password}
            onChange={(value) => {
              setPassError("");
              setPassword(value);
            }}
            errorMsg={passError}
          />
          <Checkbox
            label="Запомнить данные"
            checked={save}
            onChange={setSave}
          />
          <div>
            <Button className="py-3" onClick={logUser}>
              Войти
            </Button>
            {authError && (
              <span className="text-red-500 text-xs leading-0 pt-1.5 pl-2">
                {authError}
              </span>
            )}
          </div>
          <div className="flex items-center text-local-gray">
            <hr className="flex grow" />
            <span className="px-2.5">или</span>
            <hr className="flex grow" />
          </div>
        </div>
        <div className="text-lg">
          <span className="text-[#6C6C6C] ">Нет аккаунта? </span>
          <a className="text-[#242EDB] font-semibold cursor-pointer border-b-2">
            Создать
          </a>
        </div>
      </div>
    </div>
  );
};
