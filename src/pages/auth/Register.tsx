import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import Loading from "../../components/Loading";
import { errorToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import { infoAlert, successAlert } from "../../hooks/useAlert";
import Password from "../../components/Password";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const [inputs, setInputs] = useState({
    signname: "",
    password: "",
    repassword: "",
    name: "",
    email: "",
  });

  const { signname, password, repassword, name, email } = inputs;

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

  const [conditions, setConditions] = useState({
    signnameCondition: false,
    passwordCondition: false,
    repasswordCondition: false,
    nameCondition: false,
    emailCondition: false,
  });

  const {
    signnameCondition,
    passwordCondition,
    repasswordCondition,
    nameCondition,
    emailCondition,
  } = conditions;

  const signnameReg = /^[a-z]+[a-z0-9]{3,19}$/g;
  const nameReg = /^[a-z|A-Z|가-힣]{2,15}$/;
  const emailReg =
    // eslint-disable-next-line no-useless-escape
    /^[0-9A-Za-z\d._-]+@[0-9A-Za-z]+\.([a-z]+)*$/;

  useEffect(() => {
    signnameReg.test(signname.trim())
      ? setConditions({ ...conditions, signnameCondition: true })
      : setConditions({ ...conditions, signnameCondition: false });
  }, [signname]);

  useEffect(() => {
    nameReg.test(name.trim())
      ? setConditions({ ...conditions, nameCondition: true })
      : setConditions({ ...conditions, nameCondition: false });
  }, [name]);

  useEffect(() => {
    emailReg.test(email.trim())
      ? setConditions({ ...conditions, emailCondition: true })
      : setConditions({ ...conditions, emailCondition: false });
  }, [email]);

  const onClickIdCheck = async () => {
    try {
      if (signnameCondition) {
        const res = await api.get(`/users/check-duplicated-signname`, {
          params: { signname: signname },
        });
        if (res.data.success) {
          infoAlert("사용 가능한 아이디입니다.", "ID Check");
          setIdCheck(true);
        }
      }
    } catch (error) {
      infoAlert("이미 존재하는 아이디입니다.", "ID Check");
      setIdCheck(false);
    }
  };

  const onClickEmailCheck = async () => {
    try {
      if (emailCondition) {
        const res = await api.get(`/users/check-duplicated-email`, {
          params: { email: email },
        });
        if (res.status === 200) {
          infoAlert("사용 가능한 이메일입니다.", "Email Check");
          setEmailCheck(true);
        }
      }
    } catch (error) {
      infoAlert("이미 존재하는 이메일입니다.", "Email Check");
      setEmailCheck(false);
    }
  };

  const onHandleRegister = async () => {
    try {
      const body = {
        method: "SIGNNAME",
        signname: signname.trim(),
        password: password.trim(),
        name: name.trim(),
        email: email.trim(),
      };

      !idCheck && errorToast("아이디 중복 확인은 필수입니다.");
      !emailCheck && errorToast("이메일 중복 확인은 필수입니다.");
      (!signnameCondition ||
        !passwordCondition ||
        !repasswordCondition ||
        !nameCondition ||
        !emailCondition) &&
        errorToast("올바른 정보를 입력해 주세요.");
      if (
        signnameCondition &&
        passwordCondition &&
        repasswordCondition &&
        nameCondition &&
        emailCondition &&
        emailCheck &&
        idCheck
      ) {
        setLoading(true);
        const res = await api.post(`/auth/register`, body);
        if (res.data.success) {
          successAlert("회원가입에 성공하였습니다.", navigate("/emailAuth"));
        }
      }
    } catch (err) {
      errorToast("가입에 실패하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      {loading ? <Loading loading={true} /> : <Loading loading={false} />}
      <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
        <div className="p-6 sm:p-8 lg:p-16 space-y-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">회원가입</h2>

          <div className="mt-8 space-y-6">
            <div className="flex justify-between">
              <div className="flex flex-col w-4/6">
                <input
                  type="text"
                  name="signname"
                  id="signname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                  placeholder="아이디를 입력해주세요"
                  defaultValue={signname}
                  onChange={onChange}
                />
                {signname !== "" && !signnameCondition && (
                  <span className="text-xs md:text-sm text-red-500 pl-0 md:pl-3">
                    영어 소문자 혹은 숫자와 조합하여 사용할 수 있으며 최소 4글자 이상이어야 합니다.
                  </span>
                )}
              </div>
              <div>
                <div
                  className="text-white bg-gray-600 cursor-pointer rounded-lg p-4"
                  onClick={onClickIdCheck}
                >
                  아이디 중복 확인
                </div>
              </div>
            </div>

            <Password
              password={password}
              repassword={repassword}
              onChange={onChange}
              repasswordCondition={repasswordCondition}
              passwordCondition={passwordCondition}
              setConditions={setConditions}
              conditions={conditions}
            />

            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="이름을 입력해주세요"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                defaultValue={name}
                onChange={onChange}
                autoComplete="off"
              />
              {name !== "" && !nameCondition && (
                <span className="text-xs md:text-sm text-red-500 pl-0 md:pl-3">
                  한글과 영어를 사용할 수 있으며 2-15자 제한입니다.
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-4/6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4 "
                  defaultValue={email}
                  onChange={onChange}
                  autoComplete="off"
                />
                {email !== "" && !emailCondition && (
                  <span className="text-xs md:text-sm text-red-500 pl-0 md:pl-3">
                    영어와 점(.),하이픈(-),언더바(_)를 사용할 수 있으며 xxx@xxx.xxx 형식입니다.
                  </span>
                )}
              </div>
              <div
                className="text-white bg-gray-600 cursor-pointer rounded-lg p-4"
                onClick={onClickEmailCheck}
              >
                이메일 중복 확인
              </div>
            </div>

            <div className="flex justify-center flex-col">
              <button
                onClick={onHandleRegister}
                className="text-white bg-gray-600 font-medium rounded-lg p-4 w-full text-center"
              >
                회원가입
              </button>
            </div>
            <Toast />

            <div className="pt-5 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
                className="text-sm text-gray-600 cursor-pointer"
              >
                이미 아이디가 있으신가요?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
