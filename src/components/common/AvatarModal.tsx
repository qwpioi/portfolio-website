import React, { useState } from 'react';
import { Modal } from 'antd';
import { useData } from '../../context/DataContext';
import { LazyImage } from './LazyImage';

/**
 * 头像放大弹窗
 * 只负责弹窗逻辑，不渲染头像本身
 */
interface AvatarModalProps {
  triggerElement: React.ReactNode;
}

export function AvatarModal({ triggerElement }: AvatarModalProps) {
  const { data } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 触发器（由外部传入，通常是头像） */}
      <div onClick={showModal} className="cursor-pointer inline-block">
        {triggerElement}
      </div>

      {/* 放大弹窗 */}
      <Modal
        title={data.basicInfo.name}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={400}
      >
        <div className="flex justify-center py-8">
          <LazyImage
            src={data.basicInfo.avatar || ''}
            alt={data.basicInfo.name}
            className="w-64 h-64 rounded-full mx-auto"
            placeholder="blur"
            circular
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.basicInfo.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.basicInfo.gender} · {data.basicInfo.age}岁
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.basicInfo.education} · {data.basicInfo.graduationSchool}
          </p>
        </div>
      </Modal>
    </>
  );
}
