import Head from "next/head";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState<File>();

  const onChangeForm = (env: React.ChangeEvent<HTMLInputElement>) => {
    if (env.target.files) setForm(env.target.files[0]);
    console.log(form?.name);
  };

  const submit = async (env: React.FormEvent<HTMLFormElement>) => {
    env.preventDefault();
    const formData = new FormData();
    if (form?.type) {
      formData.append("image", form);
      await axios.post("/api/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };
  return (
    <>
      <Head>
        <title>Form</title>
      </Head>
      <form encType="multipart/form-data" onSubmit={submit}>
        <input
          type="file"
          name="image"
          placeholder="uploadImage"
          accept="image/*"
          onChange={onChangeForm}
        />
        <button>submit</button>
      </form>
    </>
  );
}
