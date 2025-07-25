"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { post } from '@/lib/api';
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
        const dataRequest = {
            userName: data.userName,
            password: data.password,
            rememberMe: false,
            company: 0,
            language: "EN",
        }
        const response: any = await post('https://sol2dev.sucafinaviet.com:44318/api/Admin/Authentication/Login', dataRequest);
        // Handle form submission here
        console.log(response);
        if (response.status === 200) {
            console.log("Login successful");
            // Redirect or show success message
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="user">User Name</Label>
                                <Input
                                    id="user"
                                    type="text"
                                    placeholder="m@example.com"
                                    {...register("userName", { required: true })}
                                />
                                {errors.userName && <span className="text-red-500 text-sm">Please enter a valid user name</span>}
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className="text-red-500 text-sm">Password is required (min 6 characters)</span>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button> */}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
