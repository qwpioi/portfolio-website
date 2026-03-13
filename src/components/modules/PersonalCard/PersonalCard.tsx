import React from 'react';
import type { PersonalCardProps } from './PersonalCard.types';

export const PersonalCard: React.FC<PersonalCardProps> = ({
  name,
  title,
  avatar,
  description,
  tags = [],
  socialLinks = [],
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
      {/* 头像和基本信息 */}
      <div className="flex items-start gap-5 mb-6">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover shadow-md"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>

      {/* 标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 描述 */}
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* 社交链接 */}
      {socialLinks.length > 0 && (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-900 hover:text-white transition-all duration-300"
              aria-label={link.platform}
            >
              <span className="text-lg">{link.icon}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
