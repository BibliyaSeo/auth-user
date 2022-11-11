import { useEffect } from "react";

export default function Password({
  password,
  repassword,
  onChange,
  passwordCondition,
  repasswordCondition,
  setConditions,
  conditions,
}: any) {
  const passwordReg = /^[\da-zA-Z$!@#$%^&*?&]{8,15}$/;
  useEffect(() => {
    passwordReg.test(password.trim()) &&
      password === repassword &&
      setConditions({ ...conditions, passwordCondition: true, repasswordCondition: true });
    !passwordReg.test(password.trim()) &&
      password === repassword &&
      setConditions({ ...conditions, passwordCondition: false, repasswordCondition: true });
    passwordReg.test(password.trim()) &&
      password !== repassword &&
      setConditions({ ...conditions, passwordCondition: true, repasswordCondition: false });
    !passwordReg.test(password.trim()) &&
      password !== repassword &&
      setConditions({ ...conditions, passwordCondition: false, repasswordCondition: false });
  }, [password]);

  useEffect(() => {
    repassword !== "" && password === repassword
      ? setConditions({ ...conditions, repasswordCondition: true })
      : setConditions({ ...conditions, repasswordCondition: false });
  }, [repassword]);

  return (
    <>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
          defaultValue={password}
          onChange={onChange}
        />
        {password !== "" && !passwordCondition && (
          <span className="text-xs md:text-sm text-red-500 pl-0 md:pl-3">
            영어 대소문자와 특수문자 "$!@#$%^&*?&"를 사용할 수 있으며 8-15자 제한입니다.
          </span>
        )}
      </div>

      <div>
        <input
          type="password"
          name="repassword"
          id="repassword"
          placeholder="비밀번호를 재입력해주세요"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
          defaultValue={repassword}
          onChange={onChange}
        />
        {repassword !== "" && !repasswordCondition && (
          <span className="text-xs md:text-sm text-red-500 pl-0 md:pl-3">
            비밀번호가 일치하지 않습니다.
          </span>
        )}
      </div>
    </>
  );
}
