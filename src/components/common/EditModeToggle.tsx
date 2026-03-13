import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Modal } from 'antd';
import { EditOutlined, EyeOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { useEdit } from '../../context/EditContext';
import { useData } from '../../context/DataContext';
import { config } from '../../config';
import type { PortfolioData } from '../../types';

/**
 * 编辑模式切换按钮
 * 隐藏式入口：点击头像 3 次 或 按 Ctrl+E 触发
 */
export function EditModeToggle() {
  const { isEditMode, toggleEditMode, disableEditMode } = useEdit();
  const { data, updateData } = useData();
  const [clickCount, setClickCount] = useState(0);
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);
  const [resetModalVisible, setResetModalVisible] = useState(false);

  // 监听键盘快捷键 Ctrl+E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        toggleEditMode();
      }
      // ESC 退出编辑模式
      if (e.key === 'Escape' && isEditMode) {
        e.preventDefault();
        disableEditMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditMode, disableEditMode, isEditMode]);

  // 头像点击计数（3 次触发编辑模式）
  const handleAvatarClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      toggleEditMode();
      setClickCount(0);
    }

    // 2 秒后重置计数
    setTimeout(() => setClickCount(0), 2000);
  };

  // 进入编辑模式时保存草稿
  useEffect(() => {
    if (isEditMode && !draftData) {
      setDraftData(JSON.parse(JSON.stringify(data)));
      // 保存到 LocalStorage 草稿箱
      localStorage.setItem(config.storageKeys.draftData, JSON.stringify(data));
    }
  }, [isEditMode, data, draftData]);

  // 撤销修改（恢复到草稿）
  const handleUndo = () => {
    if (draftData) {
      updateData(() => draftData);
      setDraftData(null);
      localStorage.removeItem(config.storageKeys.draftData);
    }
  };

  // 保存修改
  const handleSave = () => {
    // 数据已自动保存到 LocalStorage，这里只需退出编辑模式
    disableEditMode();
    setDraftData(null);
    localStorage.removeItem(config.storageKeys.draftData);
    
    // 显示保存成功提示
    Modal.success({
      title: '保存成功',
      content: '修改已保存到本地浏览器',
      centered: true,
    });
  };

  // 重置所有数据
  const handleReset = () => {
    localStorage.removeItem(config.storageKeys.portfolioData);
    window.location.reload();
  };

  // 导出备份
  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 导入备份
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        updateData(() => importedData);
        Modal.success({
          title: '导入成功',
          content: '数据已成功导入并保存',
          centered: true,
        });
      } catch (error) {
        Modal.error({
          title: '导入失败',
          content: '文件格式不正确',
          centered: true,
        });
      }
    };
    reader.readAsText(file);
    // 重置 input
    event.target.value = '';
  };

  return (
    <>
      {/* 隐藏式触发器（头像位置） */}
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
        onClick={handleAvatarClick}
        title="点击 3 次进入编辑模式"
      >
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
          {isEditMode ? <EditOutlined /> : <EyeOutlined />}
        </div>
      </div>

      {/* 编辑模式工具栏 */}
      {isEditMode && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Tooltip title="撤销修改 (ESC)">
            <Button
              icon={<UndoOutlined />}
              onClick={handleUndo}
              disabled={!draftData}
            >
              撤销
            </Button>
          </Tooltip>

          <Tooltip title="保存修改 (Ctrl+S)">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              保存
            </Button>
          </Tooltip>

          <Tooltip title="导出备份">
            <Button onClick={handleExport}>
              导出
            </Button>
          </Tooltip>

          <Tooltip title="导入备份">
            <Button onClick={() => document.getElementById('import-file')?.click()}>
              导入
            </Button>
          </Tooltip>
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />

          <Tooltip title="重置所有数据">
            <Button
              danger
              onClick={() => setResetModalVisible(true)}
            >
              重置
            </Button>
          </Tooltip>

          <Tooltip title="退出编辑模式">
            <Button onClick={disableEditMode}>
              退出
            </Button>
          </Tooltip>
        </div>
      )}

      {/* 重置确认弹窗 */}
      <Modal
        title="确认重置"
        open={resetModalVisible}
        onOk={() => {
          handleReset();
          setResetModalVisible(false);
        }}
        onCancel={() => setResetModalVisible(false)}
        okText="确认重置"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>此操作将清空所有本地数据且无法恢复，确定要继续吗？</p>
      </Modal>
    </>
  );
}
