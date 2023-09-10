const TwSizeIndicator = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="">
       
      </div>
    );
  } else {
    return null;
  }
};
export default TwSizeIndicator;
