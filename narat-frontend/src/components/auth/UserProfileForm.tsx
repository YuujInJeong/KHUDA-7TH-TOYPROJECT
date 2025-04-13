// src/components/auth/UserProfileForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { User } from '../../types/auth';

interface UserProfileFormProps {
  user: User;
  onSubmit: (user: Partial<User>) => void;
  loading?: boolean;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const StudyLevelSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    display_name: user.display_name,
    email: user.email,
    study_level: user.study_level
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.display_name || formData.display_name.trim() === '') {
      newErrors.display_name = '사용자 이름은 필수입니다';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 필드 변경 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="display_name">사용자 이름</Label>
        <Input
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={handleChange}
          placeholder="사용자 이름을 입력하세요"
          error={!!errors.display_name}
        />
        {errors.display_name && <ErrorMessage>{errors.display_name}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          error={!!errors.email}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="study_level">학습 레벨</Label>
        <StudyLevelSelect
          id="study_level"
          name="study_level"
          value={formData.study_level}
          onChange={handleChange}
        >
          <option value="S">S (최상위 레벨)</option>
          <option value="A">A (중상위 레벨)</option>
          <option value="B">B (기본 레벨)</option>
        </StudyLevelSelect>
      </FormGroup>
      
      <Button type="submit" disabled={loading}>
        {loading ? '저장 중...' : '저장'}
      </Button>
    </Form>
  );
};