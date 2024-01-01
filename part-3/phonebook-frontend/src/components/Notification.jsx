import "../index.css";

const Notification = ({ children, style }) => {
  // if (message === null) {
  //   return null;
  // }
  return <div className={style}>{children}</div>;
};

export default Notification;
