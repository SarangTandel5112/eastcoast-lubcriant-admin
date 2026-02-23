'use client';

import type { LoginFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginValidationSchema } from '../validations';

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
  remember: false,
};

type FormApi = ReturnType<typeof useForm<LoginFormValues>>;

export type UseLoginFormResult = {
  formError?: string;
  isSubmitting: boolean;
  register: FormApi['register'];
  errors: FormApi['formState']['errors'];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const useLoginForm = (): UseLoginFormResult => {
  const [formError, setFormError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit: submitWithValidation, register, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const onSubmit = useCallback(async (_values: LoginFormValues) => {
    setFormError(undefined);
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 350));

    setIsSubmitting(false);
  }, []);

  const onInvalid = useCallback(() => {
    setFormError('Please correct the highlighted fields before continuing.');
  }, []);

  const handleSubmit = useMemo(
    () => submitWithValidation(onSubmit, onInvalid),
    [onInvalid, onSubmit, submitWithValidation],
  );

  return {
    formError,
    isSubmitting,
    register,
    errors: formState.errors,
    handleSubmit,
  };
};
