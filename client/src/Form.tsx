import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <>
      <div className="m-20 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="" className="text-black  text-2xl">
              FullName
            </label>
            <br />
            <input
              {...register("firstName", { required: true, maxLength: 20 })}
              className="bg-blue-50"
            />
          </div>
          <br />
          <label htmlFor="" className="text-black  text-2xl">
            FullName
          </label>
          <br />
          <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
          <br />
          <label htmlFor="" className="text-black  text-2xl">
            FullName
          </label>
          <br />
          <input type="number" {...register("age", { min: 18, max: 99 })} />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
