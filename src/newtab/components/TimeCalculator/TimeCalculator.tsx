import './TimeCalculator.css';

import { ConfigProvider, Input, theme, TimePicker } from 'antd';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';
import time from '../../../common/module/time-converter';
import { LS } from '../../../common/local-storage';
import { STORAGE_KEYS } from '../../../common/types/storage.keys';
import dayjs from 'dayjs';
import { CheckTime, Time } from '../NewTab.type';
import { DEFAULT_SEED, findEndTime } from '../NewTab.const';
import solar from '../../../common/calendar/solar';

const timeAsString = ({ hour, minute }: Time) => `${time(hour)}:${time(minute)}`;

const d = new Date();
const startUp = `${time(d.getHours())}:${time(d.getMinutes())}`;

export default function TimeCalculator() {
  const gt = LS.getItem<CheckTime>(STORAGE_KEYS.CHECK_TIME);
  const sd = LS.getItem<Time>(STORAGE_KEYS.SEED);
  const [startTime, setStartTime] = useState<Time>();
  const [endTime, setEndTime] = useState<string>();
  const [seed, setSeed] = useState<Time>(structuredClone(DEFAULT_SEED));

  const storageSeed = (/*hour: any, minute: any*/ ev: Partial<Time>) => {
    setSeed(c => ({ ...c, ...ev }));
  };

  const saveTodayToStorage = () => {
    const date = `${solar.getToDay().month}${solar.getToDay().day}`;
    LS.setItem(STORAGE_KEYS.SAVED_DATE, date);
  };

  useEffect(() => {
    if (gt?.time) {
      setStartTime(gt.time);
      setEndTime(findEndTime(gt.time));
    }
    sd && setSeed(sd);
    const savedTime = LS.getItem(STORAGE_KEYS.SAVED_DATE);
    if (savedTime) {
      const now = `${solar.getToDay().month}${solar.getToDay().day}`;
      if (savedTime !== now) {
        setStartTime(undefined);
        setEndTime(undefined);
      }
    }
  }, []);

  useEffect(() => {
    LS.setItem<Time>(STORAGE_KEYS.SEED, seed);
  }, [seed]);

  return <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <div className="py-4 pr-4 mt-2" style={{ width: '320px' }}>
      <div className="cluster">
        <div className="ml-4 flex items-center h-8">
          <div className="text-base w-[110px]">Seed</div>
          <OnlyNumberInput
            valueChange={(e) => storageSeed({ hour: e })}
            className="seed"
            maxLength={1}
            value={seed.hour}
          />
          <div className="text-base font-semibold px-2">:</div>
          <OnlyNumberInput
            value={seed.minute}
            valueChange={(e) => storageSeed({ minute: e })}
            className="seed"
            maxLength={2}
          />
        </div>

        <div className="mt-3 pl-4 border-t border-[#8f8f8f]">
          <div className="flex items-center relative mt-3">
            <div className="text-base  w-[110px]">Check-in</div>
            <div className="time-shower">{startTime ? `${startTime.hour}:${startTime.minute}` : '--:--'}</div>
            <TimePicker
              defaultValue={dayjs(gt?.time ? timeAsString(gt!.time) : startUp, 'HH:mm')}
              format="HH:mm"
              className="root-input ml-4 time-shower1"
              popupClassName="picker-panel"
              onChange={(e) => {
                const tim = {
                  hour: time(e.hour()),
                  minute: time(e.minute())
                };
                setStartTime(tim);
                setEndTime(findEndTime(tim, seed));

                LS.setItem<CheckTime>(STORAGE_KEYS.CHECK_TIME, {
                  time: tim,
                  current: `${e.year()}${time(e.month())}${time(e.day())}`
                });

                saveTodayToStorage();
              }}
            />
          </div>
          <div className="flex items-center relative mt-3">
            <div className="text-base w-[110px]">Check-out</div>
            <div className="time-shower">{endTime ?? '--:--'}</div>
          </div>
        </div>
      </div>
    </div>
  </ConfigProvider>;
}

type NumericInputProps = {
  valueChange: (value: string) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function OnlyNumberInput(props: NumericInputProps) {
  let { value, valueChange } = props;
  if (!value) {
    value = '00';
  }
  value = String(value);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      valueChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    valueChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };


  return (
    // @ts-ignore
    <Input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}