import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useState, KeyboardEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading3Quarters, AiOutlineSwapRight } from 'react-icons/ai';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import useAuth from '../../hooks/useAuth';
import { supabaseEnv } from '../../config/config';

interface FormValues {
  email: string;
  password: string;
}

const LogInPage: NextPage = () => {
  const { logIn, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [emailCheck, setEmailCheck] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    logIn({ email: data.email.trim(), password: data.password.trim() });
  };
  const keyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!emailCheck) setEmailCheck(true);
    }
  };
  return (
    <>
      <form className="flex flex-col items-center w-full h-full max-w-md gap-4 p-8 m-auto bg-beige/70 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
        <span className="my-12 text-3xl font-medium cursor-pointer text-brown font-Insomnia">nijoow vintage</span>
        <div className="w-full mb-auto">
          <div className="relative z-10 flex items-center w-full">
            <input
              className={`w-full h-12 px-4 border border-brown/30 placeholder:text-ocher/50 text-brown focus:outline-brown ${
                emailCheck ? 'rounded-t-lg' : 'rounded-lg'
              }`}
              placeholder="이메일을 입력해주세요"
              onKeyDown={keyPressEnter}
              {...register('email', { required: true })}
            />
            {!emailCheck && (
              <span
                className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer border-brown right-4"
                onClick={() => setEmailCheck(!emailCheck)}
              >
                <AiOutlineSwapRight className="text-brown" />
              </span>
            )}
          </div>
          <div className={`relative flex items-center transition-all duration-500 w-full ${emailCheck ? 'translate-y-0' : '-translate-y-full'}`}>
            <input
              className={`w-full h-12 px-4 placeholder:text-ocher/50 focus:outline-brown border text-brown border-brown/30 ${
                emailCheck ? 'rounded-b-lg' : 'rounded-lg'
              }`}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onKeyDown={keyPressEnter}
              {...register('password', { required: true })}
            />
            <button
              className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer border-brown right-4"
              type="submit"
              disabled={loading}
            >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlineSwapRight />}
            </button>
          </div>
          <span className="h-3 m-1 text-xs text-orange">{error}</span>
        </div>
      </form>
    </>
  );
};

export default LogInPage;
