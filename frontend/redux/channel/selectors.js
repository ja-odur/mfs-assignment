// take a slice of the application state and return some data based on that
import { useSelector } from "react-redux";

export const useChannels= () => {
  return useSelector((state) => state.channel.channels);
};