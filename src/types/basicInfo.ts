// 基础信息类型定义

export interface ContactInfo {
  email?: string;
  phone?: string;
  github?: string;
  wechat?: string;
}

export interface BasicInfo {
  id: string;                 // 唯一标识（固定值）
  name: string;               // 姓名
  gender: string;             // 性别
  age: number;                // 年龄
  education: string;          // 学历
  graduationSchool: string;   // 毕业院校
  avatar: string;             // 头像 URL（base64/本地路径）
  infoOrder: string[];        // 信息展示顺序 ["name", "gender", ...]
  contact?: ContactInfo;      // 联系方式（可选）
}
