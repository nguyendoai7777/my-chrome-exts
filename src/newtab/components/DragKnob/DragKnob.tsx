import { DragOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { HTMLAttributes, forwardRef, useState } from 'react';

export default forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>((props, ref) => {
	const [cursor, setCursor] = useState(false);
	return (
		<Tooltip title="Kéo để sắp xếp">
			<button
				ref={ref}
				onMouseDown={() => setCursor(true)}
				onMouseUp={() => setCursor(false)}
				onMouseLeave={() => setCursor(false)}
				{...props}
				className={`absolute top-0 right-0 z-20 flex w-8 h-8 items-center justify-center dragKnob ${!cursor ? 'cursor-grab' : 'cursor-grabbing'}`}
			>
				<DragOutlined className='text-2xl' />
			</button>
		</Tooltip>
	);
});
