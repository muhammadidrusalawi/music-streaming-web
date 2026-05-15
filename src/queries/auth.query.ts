import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthForm } from '@/request/auth.ts';
import { loginApi, logoutApi } from '@/api/auth.ts';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useAppLayout } from '@/hooks/use-layout.ts';

export const AuthQuery = {
  useLogin() {
    const { login } = useAppLayout();

    return useMutation({
      mutationFn: (payload: AuthForm) => loginApi(payload),

      onSuccess: (res) => {
        login(res.data.user, res.data.token);
        toast.success(res.message);
      },

      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(err.response!.data.message);
      },
    });
  },

  useLogout() {
    const { logout } = useAppLayout();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => logoutApi(),
      onSuccess: (res) => {
        queryClient.clear();
        logout();
        toast.success(res.message);
      },

      onError: (err: AxiosError<{ message: string }>) => {
        queryClient.clear();
        logout();

        toast.error(err.response!.data.message);
      },
    });
  },
};
