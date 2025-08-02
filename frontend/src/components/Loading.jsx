import loading from "/images/Loading.gif";
const Loading = () => {
  return (
    <div
      className="min-h-screen w-full text-black bg-white flex text-3xl justify-center items-center bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${loading})` }}
    ></div>
  );
};
export default Loading;
