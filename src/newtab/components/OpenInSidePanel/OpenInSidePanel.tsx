import { Button, Drawer, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import React from 'react';
import { ExportOutlined } from '@ant-design/icons';

export interface OpenInSidePanelProps {
  href: string;
}

export default function (props: DrawerProps & OpenInSidePanelProps) {
  return <Drawer
    {...props}
    width={innerWidth / 100 * 75}
    styles={{
      body: {
        padding: 0
      }
    }}
    extra={
      <Space>
        <a target="_blank" href={props.href}><Button onClick={() => {}} icon={  <ExportOutlined />}></Button></a>
      </Space>
    }
  >
    <iframe src={props.href} width="100%" height="100%"></iframe>
  </Drawer>;
}