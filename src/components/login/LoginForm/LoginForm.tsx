/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import {
  Box,
  ButtonPrimary,
  PasswordField,
  Separator,
  TextFiled,
} from "app/global/ui/01_atoms";

import Style from "./Style.module.scss";
import Utils from "app/global/utilities/utils.module.scss";
import Image from "next/image";
import useLogin from "app/shared/hooks/useLogin";
import useLoginStorage from "app/domain/application/client/useLoginStorage";
import useValidationLogin from "app/shared/hooks/useValidationLogin";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";



export const LoginForm = () => {


  const { login } = useLogin();
  const router = useRouter();
  
  const { getLogin, setLogin } = useLoginStorage();
  const { checkPassword, validateAll } = useValidationLogin();
  const data = getLogin();
  const dataForm = getLogin().formData;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword()) {
      login();
    } else {
      validateAll();
    }
      
  };

  return (
    <div className={`${Utils.layout}`}>
      <main className={`${Utils.layout__main} ${Style.container}`}>
        <picture className={`${Style.picture}`}>
          <source srcSet="/img/bannerMobile.jpg" media="(max-width: 992px)" />
          <Image
            src="/img/banner.png"
            alt="demo"
            width={1600}
            height={400}
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </picture>

        <div className={`${Style.contentForm}`}>
          <div className={Style.headerForm}>
            <h3
              className={`${Style.titleWelcome} ${Utils.t_XXL} ${Utils.text_white}`}
            >
              Bienvenidos
            </h3>

            <div className={Style.imageWrapper}>
              <Image
                src={`/img/logo.svg`}
                alt="Logo."
                width={5}
                height={5}
                quality={70}
                className={`${Style.Logo}`}
              />
            </div>
          </div>

          <Box type="xxLarge" className={`${Style.wrapper}`}>
            {data.userIncorrect && (
              <>
                <Alert severity="warning" variant="outlined" sx={{ mt: 2 }}>
                  <b>Usuario o Contraseña invalida</b>
                  <Separator size="XS" />
                  <span>Intenta de nuevo.​</span>
                </Alert>
                <Separator size="XXS" />
              </>
            )}
            <form onSubmit={handleSubmit} className={`${Style.form}`}>
              <TextFiled
                value={dataForm.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLogin({
                    ...data,
                    userIncorrect: undefined,
                    formData: { ...dataForm, username: e.target.value },
                  })
                }
                label="Usuario"
              />
              {/* Secure_456 */}
              <PasswordField
                showPassword={showPassword}
                status={
                  dataForm.isValidPassword == undefined
                    ? "info"
                    : dataForm.isValidPassword
                    ? "success"
                    : "error"
                }
                onBlur={() => checkPassword()}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                value={dataForm.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLogin({
                    ...data,
                    userIncorrect: undefined,
                    formData: { ...dataForm, password: e.target.value },
                  })
                }
                label="Contraseña"
              />
              <ButtonPrimary
                isSubmit
                loading={data.loading}
              >
                Ingresar
              </ButtonPrimary>
            </form>
          </Box>
        </div>
      </main>

      <footer className={`${Utils.layout__footer} ${Style.footer}`}>
        <small className={`${Utils.category}`}>Powered by</small>

        <Image
          src={"/img/logo.svg"}
          alt="Logo Property"
          width={22}
          height={19}
          quality={70}
        />

        <small className={`${Utils.category}`}>Property</small>
      </footer>
    </div>
  );
};
