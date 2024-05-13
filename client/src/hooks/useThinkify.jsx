import { useContext } from "react";
import { ThinkifyContext } from "../../provider/Provider";

const useThinkify = () => {
  return useContext(ThinkifyContext);
};

export default useThinkify;