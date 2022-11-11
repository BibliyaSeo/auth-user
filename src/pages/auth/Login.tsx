import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import { errorAlert } from "../../hooks/useAlert";
import { errorToast } from "../../hooks/useToast";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    signname: "",
    password: "",
  });

  const { signname, password } = inputs;

  const onChange = useCallback(
    (e: any) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const onHandleLogin = async () => {
    try {
      const body = {
        method: "SIGNNAME",
        signname: signname,
        password: password,
      };
      setLoading(true);
      const res = await api.post(`/auth/login`, body);
      if (res.data.success) {
        const res2 = await api.get(`/auth/login`, {
          headers: { Authorization: `Bearer ${res.data.data}` },
        });
        console.log(res2);
        if (res2.data.data.varifymail) {
          sessionStorage.setItem("signname", signname);
          sessionStorage.setItem("token", res.data.data);
          navigate("/mobileStatus");
        } else {
          errorAlert("이메일 인증이 필요합니다.", navigate("/emailAuth"));
        }
      }
    } catch (err) {
      errorToast("잘못된 아이디나 비밀번호입니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      {loading ? <Loading loading={true} /> : <Loading loading={false} />}
      <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
        <div className="p-6 sm:p-8 lg:p-16 space-y-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">login</h2>
          <div className="mt-8 space-y-6">
            <div>
              <input
                type="text"
                name="signname"
                id="signname"
                value={signname}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                placeholder="아이디를 입력해 주세요"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="비밀번호를 입력해 주세요"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
              />
            </div>

            <div className="flex justify-center flex-col">
              <button
                onClick={onHandleLogin}
                className="text-white bg-gray-600 font-medium rounded-lg p-4 w-full text-center"
              >
                로그인
              </button>

              <Toast />

              {/* FIXME: 첫번째 시안 */}
              <button
                onClick={() => navigate("/register")}
                className="mt-5 text-gray-600 p-4 cursor-pointer"
              >
                회원 가입
              </button>
            </div>

            <div className="text-center pt-5 flex justify-around ">
              {/* FIXME: 두번째 시안 */}
              {/* <button className="text-sm text-gray-600">회원 가입</button> */}
              <div
                onClick={() => {
                  navigate("/FindPassword");
                }}
                className="text-sm text-gray-600 cursor-pointer"
              >
                비밀번호를 잊어버리셨나요?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
