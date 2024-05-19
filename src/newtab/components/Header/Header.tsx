import React, { useEffect, useState } from 'react';
import time from '../../../common/module/time-converter';
import solar from '../../../common/calendar/solar';
import lunar from '../../../common/calendar/lunar';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function () {
  const date = new Date();
  const [hours, setHours] = useState(time(date.getHours()));
  const [minutes, setMinutes] = useState(time(date.getMinutes()));
  const [seconds, setSeconds] = useState(time(date.getSeconds()));
  useEffect(() => {
    const repeater = setInterval(() => {
      const d = new Date();
      setHours(time(d.getHours()));
      setMinutes(time(d.getMinutes()));
      setSeconds(time(d.getSeconds()));
    }, 1000);

    return () => {
      clearInterval(repeater);
    };
  }, []);

  return <div className="header">
    <div className="timer">
      {hours}:{minutes}:{seconds}
    </div>
    <div className="italic">{solar.string}</div>
    <div className="italic flex items-center">{lunar.string}</div>
  </div>;
}