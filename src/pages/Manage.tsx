import React, { useState } from 'react';
import { Tabs, Form, Input, InputNumber, Button, Space, Card, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useData } from '../context/DataContext';
import { useEdit } from '../context/EditContext';
import type { BasicInfo, TechStackItem, Project, Article, WorkItem, ToolIcon } from '../types';

/**
 * 本地内容管理页面
 * 提供表单编辑所有内容数据
 */
export function Manage() {
  const { data, updateData } = useData();
  const { isEditMode } = useEdit();
  const [form] = Form.useForm();

  if (!isEditMode) {
    return null;
  }

  // 更新基础信息
  const handleBasicInfoChange = (values: Partial<BasicInfo>) => {
    updateData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...values },
    }));
  };

  // 添加技术栈
  const handleAddTechStack = () => {
    const newItem: TechStackItem = {
      id: `tech-${Date.now()}`,
      name: '新技术',
      description: '技术描述',
      proficiency: 'intermediate',
    };
    updateData((prev) => ({
      ...prev,
      techStack: [...prev.techStack, newItem],
    }));
  };

  // 删除技术栈
  const handleDeleteTechStack = (id: string) => {
    updateData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((item) => item.id !== id),
    }));
  };

  // 更新技术栈
  const handleUpdateTechStack = (id: string, values: Partial<TechStackItem>) => {
    updateData((prev) => ({
      ...prev,
      techStack: prev.techStack.map((item) =>
        item.id === id ? { ...item, ...values } : item
      ),
    }));
  };

  // 添加项目
  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: '新项目',
      cover: '',
      description: '项目描述',
      publishTime: new Date().toISOString(),
      details: '项目详情',
    };
    updateData((prev) => ({
      ...prev,
      featuredProjects: [...prev.featuredProjects, newProject],
    }));
  };

  // 删除项目
  const handleDeleteProject = (id: string) => {
    updateData((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.filter((p) => p.id !== id),
    }));
  };

  // 更新项目
  const handleUpdateProject = (id: string, values: Partial<Project>) => {
    updateData((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.map((p) =>
        p.id === id ? { ...p, ...values } : p
      ),
    }));
  };

  // 添加文章
  const handleAddArticle = () => {
    const newArticle: Article = {
      id: `article-${Date.now()}`,
      title: '新文章',
      cover: '',
      author: data.basicInfo.name,
      publishTime: new Date().toISOString(),
      summary: '文章摘要',
      content: '文章内容',
    };
    updateData((prev) => ({
      ...prev,
      latestArticles: [...prev.latestArticles, newArticle],
    }));
  };

  // 删除文章
  const handleDeleteArticle = (id: string) => {
    updateData((prev) => ({
      ...prev,
      latestArticles: prev.latestArticles.filter((a) => a.id !== id),
    }));
  };

  // 更新文章
  const handleUpdateArticle = (id: string, values: Partial<Article>) => {
    updateData((prev) => ({
      ...prev,
      latestArticles: prev.latestArticles.map((a) =>
        a.id === id ? { ...a, ...values } : a
      ),
    }));
  };

  // 添加作品
  const handleAddWork = () => {
    const newWork: WorkItem = {
      id: `work-${Date.now()}`,
      image: '',
      description: '作品描述',
    };
    updateData((prev) => ({
      ...prev,
      works: [...prev.works, newWork],
    }));
  };

  // 删除作品
  const handleDeleteWork = (id: string) => {
    updateData((prev) => ({
      ...prev,
      works: prev.works.filter((w) => w.id !== id),
    }));
  };

  // 更新作品
  const handleUpdateWork = (id: string, values: Partial<WorkItem>) => {
    updateData((prev) => ({
      ...prev,
      works: prev.works.map((w) =>
        w.id === id ? { ...w, ...values } : w
      ),
    }));
  };

  // 图片上传处理（简化版，实际应上传到图床）
  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // 检查 LocalStorage 容量
      try {
        localStorage.setItem('test', result);
        localStorage.removeItem('test');
        callback(result);
        message.success('图片上传成功');
      } catch (error) {
        message.error('图片太大，建议使用外部图床 URL');
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  const tabs = [
    {
      key: 'basic',
      label: '基础信息',
      children: (
        <Card title="个人基础信息" className="mb-4">
          <Form
            layout="vertical"
            initialValues={data.basicInfo}
            onValuesChange={handleBasicInfoChange}
          >
            <Form.Item label="姓名" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="性别" name="gender">
              <Input />
            </Form.Item>
            <Form.Item label="年龄" name="age">
              <InputNumber min={1} max={150} />
            </Form.Item>
            <Form.Item label="学历" name="education">
              <Input />
            </Form.Item>
            <Form.Item label="毕业院校" name="graduationSchool">
              <Input />
            </Form.Item>
            <Form.Item label="头像 URL" name="avatar">
              <Input placeholder="输入图片 URL 或 base64" />
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'tech',
      label: '技术栈',
      children: (
        <Card
          title="技术栈列表"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTechStack}>
              添加技术
            </Button>
          }
        >
          <Space direction="vertical" className="w-full">
            {data.techStack.map((tech) => (
              <Card key={tech.id} size="small">
                <Space className="w-full">
                  <Input
                    placeholder="技术名称"
                    value={tech.name}
                    onChange={(e) => handleUpdateTechStack(tech.id, { name: e.target.value })}
                    style={{ width: 150 }}
                  />
                  <Input
                    placeholder="描述"
                    value={tech.description}
                    onChange={(e) => handleUpdateTechStack(tech.id, { description: e.target.value })}
                    style={{ width: 200 }}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteTechStack(tech.id)}
                  />
                </Space>
              </Card>
            ))}
          </Space>
        </Card>
      ),
    },
    {
      key: 'projects',
      label: '项目',
      children: (
        <Card
          title="精选项目"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject}>
              添加项目
            </Button>
          }
        >
          <Space direction="vertical" className="w-full">
            {data.featuredProjects.map((project) => (
              <Card key={project.id} size="small" title={project.title}>
                <Space direction="vertical" className="w-full">
                  <Input
                    placeholder="项目标题"
                    value={project.title}
                    onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                  />
                  <Input
                    placeholder="封面图 URL"
                    value={project.cover}
                    onChange={(e) => handleUpdateProject(project.id, { cover: e.target.value })}
                  />
                  <Input.TextArea
                    placeholder="项目描述"
                    value={project.description}
                    onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    删除项目
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </Card>
      ),
    },
    {
      key: 'articles',
      label: '文章',
      children: (
        <Card
          title="最新文章"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddArticle}>
              添加文章
            </Button>
          }
        >
          <Space direction="vertical" className="w-full">
            {data.latestArticles.map((article) => (
              <Card key={article.id} size="small" title={article.title}>
                <Space direction="vertical" className="w-full">
                  <Input
                    placeholder="文章标题"
                    value={article.title}
                    onChange={(e) => handleUpdateArticle(article.id, { title: e.target.value })}
                  />
                  <Input
                    placeholder="封面图 URL"
                    value={article.cover}
                    onChange={(e) => handleUpdateArticle(article.id, { cover: e.target.value })}
                  />
                  <Input
                    placeholder="作者"
                    value={article.author}
                    onChange={(e) => handleUpdateArticle(article.id, { author: e.target.value })}
                  />
                  <Input.TextArea
                    placeholder="摘要"
                    value={article.summary}
                    onChange={(e) => handleUpdateArticle(article.id, { summary: e.target.value })}
                  />
                  <Input.TextArea
                    placeholder="内容"
                    value={article.content}
                    onChange={(e) => handleUpdateArticle(article.id, { content: e.target.value })}
                    rows={4}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    删除文章
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </Card>
      ),
    },
    {
      key: 'works',
      label: '作品',
      children: (
        <Card
          title="作品展示"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddWork}>
              添加作品
            </Button>
          }
        >
          <Space direction="vertical" className="w-full">
            {data.works.map((work) => (
              <Card key={work.id} size="small">
                <Space direction="vertical" className="w-full">
                  <Input
                    placeholder="作品图片 URL"
                    value={work.image}
                    onChange={(e) => handleUpdateWork(work.id, { image: e.target.value })}
                  />
                  <Input.TextArea
                    placeholder="作品描述"
                    value={work.description}
                    onChange={(e) => handleUpdateWork(work.id, { description: e.target.value })}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteWork(work.id)}
                  >
                    删除作品
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          内容管理
        </h1>
        <Tabs items={tabs} defaultActiveKey="basic" />
      </div>
    </div>
  );
}
