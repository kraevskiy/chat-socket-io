import { useState } from "react";
import { SignupSchema } from "@/types/signup.types.ts";
import { APIErrorType, APIUserType } from "@/types/api.types.ts";

type UseSignupType = {
  loading: boolean;
  signup: (data: SignupSchema) => Promise<APIUserType | APIErrorType>
}

export const useSignup = (): UseSignupType => {
  const [loading, setLoading] = useState(false);

  const signup = async (data: SignupSchema) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resData: Promise<APIUserType> = await res.json();
      return resData;
    } catch (e) {
      return e as APIErrorType;
    } finally {
      setLoading(false)
    }
  }

  return {loading, signup};
}
