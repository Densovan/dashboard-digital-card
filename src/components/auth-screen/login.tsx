import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { authRequest } from "@/lib/api/auth-api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import type { AuthLoginForm } from "@/types/auth-type";
import { useAuthStore } from "@/store/auth-store";

const LoginForm = () => {
  const setTokens = useAuthStore((s) => s.setTokens);

  const { AUTH_LOGIN } = authRequest();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters",
    }),
    password: z.string(),
  });

  const {
    isSuccess,
    isPending,
    data,
    mutate: mutateLogin,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: AuthLoginForm) => AUTH_LOGIN(payload),
    onSuccess: async (data) => {
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken); // ✅ Store in Zustand + Cookies
      }
      window.location.href = "/";
    },
  });

  function onSubmitHandler(data: z.infer<typeof formSchema>) {
    mutateLogin(data);
    console.log(data);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="mx-auto w-xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Please sign in to your account
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 text-left">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmitHandler)}
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Sign up here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
