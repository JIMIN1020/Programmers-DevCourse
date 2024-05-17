import { BsFillPersonFill } from "react-icons/bs";
import { ILogItem } from "../../../types";
import { author, date, logItemWrap, message } from "./LogItem.css";

interface Props {
  logItem: ILogItem;
}

function LogItem({ logItem }: Props) {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp)); // 시간 구하기
  const showOffsetTime = `${
    timeOffset.getMinutes() > 0 ? timeOffset.getMinutes() + "m" : ""
  }
    ${timeOffset.getSeconds() > 0 ? timeOffset.getSeconds() + "s ago" : ""}
    ${timeOffset.getSeconds() === 0 ? "just now" : ""}
  }`;

  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
}

export default LogItem;
