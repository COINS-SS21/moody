import { useAppSelector } from "./reduxHooks";

export default function Error(): JSX.Element | null {
  const errors: string[] = useAppSelector((state) => state.error.errors);
  return errors.length > 0 ? (
    <>
      <h1 style={{ color: "red" }}>Error{errors.length > 1 && "s"}</h1>
      {errors.map((error, index) => (
        <p
          key={error + index}
          style={{
            color: "red",
            borderTop: "1px dotted red",
            paddingTop: "12px",
          }}
        >
          {error}
        </p>
      ))}
    </>
  ) : null;
}
