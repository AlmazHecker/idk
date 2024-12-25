import css from "./FullScreenLoader.module.css";

const FullScreenLoader = () => {
  return (
    <div
      className={"bg-[rgb(30,30,30)] w-screen h-screen grid place-items-center"}
    >
      <div className={css.loader}></div>
    </div>
  );
};

export default FullScreenLoader;
