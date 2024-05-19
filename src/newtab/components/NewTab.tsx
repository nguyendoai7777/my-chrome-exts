import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';

import './NewTab.css';
import { Button, ConfigProvider, FloatButton, Input, InputRef, Modal, Tooltip } from 'antd';
import { AppstoreOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Colors } from '../../common/constant/color.constant';
import { InputClassName, InputStyle } from '../../common/constant/input-style.const';
import { STORAGE_KEYS } from '../../common/types/storage.keys';
import uuid from '../../common/module/uuid';
import { LS } from '../../common/local-storage';
import TimeCalculator from './TimeCalculator/TimeCalculator';
import FallbackIcon from './FallbackIcon/FallbackIcon';
import randomColor from '../../common/random-color';
import { ShortcutProps } from './NewTab.type';
import Header from './Header/Header';
import FixedShortcut from './FixedShortcut/FixedShortcut';
import OpenInSidePanel from './OpenInSidePanel/OpenInSidePanel';


export const NewTab = () => {
  const [customList, setCustomList] = useState<ShortcutProps[]>([]);
  const [panel, setPanel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [imageBlob, setImageBlob] = useState<any>('');
  const [remoteImage, setRemoteImage] = useState('');
  const [href, setHref] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [currentEditItem, setCurrentEditItem] = useState<ShortcutProps>();
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const fileRef: React.RefObject<InputRef> = useRef(null);

  /**
   * functions
   */

  const setter = <T, >(source: ChangeEvent<HTMLInputElement>, setFn: Dispatch<SetStateAction<T>>) => setFn((source.target.value || '') as T);

  const setForm = (v?: ShortcutProps) => {
    setImageBlob(v ? v.localImage : '');
    setRemoteImage(v ? v.image : '');
    setHref(v ? v.url : '');
    setDisplayName(v ? v.name : '');
  };

  const addShortcut = (e: FormEvent) => {
    e.preventDefault();
    const item: ShortcutProps = {
      image: remoteImage,
      localImage: imageBlob,
      name: displayName,
      url: href,
    };
    if (!remoteImage && !imageBlob) {
      item.bgc = randomColor();
    }
    if (!edit) {
      item.id = uuid();
      const items = (LS.getItem(STORAGE_KEYS.SHORTCUT) || {}) as Record<string, ShortcutProps>;
      items[item.id!] = item;
      LS.setItem(STORAGE_KEYS.SHORTCUT, items);
    } else {
      const currentMapList = (LS.getItem(STORAGE_KEYS.SHORTCUT) || {}) as Record<string, ShortcutProps>;
      currentMapList[currentEditItem!.id!] = {
        ...currentEditItem,
        image: remoteImage,
        localImage: imageBlob,
        name: displayName,
        url: href,
      };
      LS.setItem(STORAGE_KEYS.SHORTCUT, currentMapList);
      setEdit(false);
    }
    setPanel(false);
    eventListening();
    setForm();
  };

  const eventListening = () => {
    const items = LS.getItem<ShortcutProps>(STORAGE_KEYS.SHORTCUT) ?? {};
    setCustomList(Object.values(items));
  };

  const editItem = (item: ShortcutProps) => {
    setCurrentEditItem(item);
    setPanel(true);
    setForm(item);
  };

  const deleteItem = (id: string) => {
    const newlist = customList.filter(c => c.id !== id);
    const p = {} as Record<string, ShortcutProps>;
    newlist.forEach(c => {
      p[c.id!] = c;
    });
    LS.setItem(STORAGE_KEYS.SHORTCUT, p);
    setCustomList(newlist);
  };

  /**
   * Hooks
   */


  useEffect(() => {
    uuid();
    eventListening();

  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: Colors.draculaPink.val,
            colorPrimaryHover: Colors.draculaPink[600].val,
            colorTextDisabled: Colors.grey[600].val,
            borderColorDisabled: Colors.grey[500].val,
          }
        },
      }}
    >
      <div className="tab-container">
        <OpenInSidePanel open={openSidePanel} href={'https://ant.design/components/time-picker#methods'}/>
        <Header/>
        <div className="flex">
          <TimeCalculator/>
          <div className="container mx-auto">
            <FixedShortcut/>
            <div className="grid grid-cols-10 mt-6 gap-6">
              {customList.map((c) => (
                <div
                  className={`relative${edit ? ' is-editing' : ''}`}
                  key={c.id!}>
                  {edit ? <div className="edit-mode">
                    <div className="edit-item" onClick={() => editItem(c)}><EditOutlined style={{ fontSize: '18px' }}/></div>
                    <div className="edit-item" onClick={() => deleteItem(c.id!)}><DeleteOutlined style={{ fontSize: '18px' }}/></div>
                  </div> : <></>}
                  <a href={c.url} className="shortcut" key={c.id!} target="_blank">
                    <div className="max-w-[60px] w-[60px] aspect-square flex items-center overflow-hidden rounded">
                      {(!c.image && !c.localImage) ? <FallbackIcon bgc={c.bgc!} name={c.name}/> : <img src={c.image.length ? c.image : c.localImage} alt="" className="w-full"/>}
                    </div>
                    <Tooltip title={c.name} placement="bottom">
                      <div className="text-sm name whitespace-nowrap max-w-full text-ellipsis overflow-hidden">{c.name}</div>
                    </Tooltip>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {edit ? (
        <FloatButton
          icon={<CheckOutlined className="fill-green"/>}
          onClick={() => {
            setEdit(false);
          }}
        />
      ) : (
        <FloatButton.Group trigger="click" shape="circle" icon={panel ? <CloseOutlined/> : <AppstoreOutlined/>}>
          <FloatButton
            icon={<PlusOutlined/>}
            onClick={() => {
              setPanel((c) => !c);
            }}
          />
          {customList.length ? <FloatButton
            icon={<EditOutlined/>}
            onClick={() => {
              setEdit(true);
            }}
          /> : null}
        </FloatButton.Group>
      )}

      <Modal
        centered
        closable={false}
        footer={<></>}
        open={panel}
        onCancel={() => setPanel(false)}
        styles={{
          content: {
            backgroundColor: Colors.dracula.val,
            color: Colors.white.val,
          },
        }}
      >
        <div className="text-xl mb-3">Thêm lối tắt</div>
        <form onSubmitCapture={addShortcut}>
          {imageBlob ? (
            <div className="flex justify-center">
              <img src={imageBlob} className="max-w-[60px] overflow-hidden rounded" title="Preview" alt="Preview"/>
            </div>
          ) : null}
          <div className="grid grid-cols-7 gap-3  mt-4">
            <div className="col-span-3">
              <Input placeholder="Đường dẫn ảnh" style={InputStyle} className={InputClassName} value={remoteImage} onChange={(e) => setter(e, setRemoteImage)}/>
            </div>
            <div className="flex justify-center items-center">hoặc</div>
            <div className="col-span-3">
              <Input
                ref={fileRef}
                type="file"
                className={InputClassName + ' hidden'}
                accept="image/*"
                onInput={({ target }) => {
                  const fileInputRef = target as HTMLInputElement;
                  const file = fileInputRef.files?.[0];
                  const fr = new FileReader();
                  if (file) {
                    fr.readAsDataURL(file);
                    fr.addEventListener('load', ({ target }) => {
                      const data = (target as FileReader).result;
                      setImageBlob(data);
                    });
                  }
                }}
              />
              <Tooltip title="Không nên dùng !!">
                <Input
                  onClick={() => {
                    fileRef.current?.input?.click();
                  }}
                  placeholder="Chọn ảnh"
                  readOnly
                  style={InputStyle}
                  className={InputClassName}
                />
              </Tooltip>
            </div>
          </div>
          <Input placeholder="Tên hiển thị" style={InputStyle} className={InputClassName + ' mt-4'} value={displayName} onChange={(e) => setter(e, setDisplayName)}/>
          <Input placeholder="Đường dẫn" style={InputStyle} className={InputClassName + ' mt-4'} value={href} onChange={(e) => setter(e, setHref)}/>
          <div className="flex justify-end mt-4">
            <Button className="w-20" type="primary" htmlType="submit" disabled={!href || !displayName}>
              Lưu
            </Button>
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default NewTab;
