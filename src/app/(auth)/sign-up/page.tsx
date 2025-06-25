"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schemas/SignInSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const page = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: undefined,
      coverImage: null,
    },
  });
  
  const onSubmit = () => {console.log("Hello World!")};

  return (
    <>
      <div className="h-screen w-screen justify-center flex items-center">
        <div className="md:w-[50vw] md:mx-auto mx-4 h-fit flex flex-col gap-8 dark:bg-[#161616] rounded-md px-6 justify-center py-6">
          <div className="flex flex-col justify-center space-y-0.5 items-center">
            <h2 className="text-2xl">Create an Account</h2>
            <p>
              Already have an account?{" "}
              <span className="duration-200 cursor-pointer hover:text-blue-500">
                Login
              </span>
            </p>
          </div>
          <div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col md:flex-row gap-6"
                >
                  {/* Left Side (Form Fields) */}
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="placeholder:text-[#A1A1A1]"
                              placeholder="Enter your fullname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="placeholder:text-[#A1A1A1]"
                              placeholder="Enter your Username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="placeholder:text-[#A1A1A1]"
                              placeholder="Enter your Email ID"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="placeholder:text-[#A1A1A1]"
                              placeholder="Enter the Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Right Side (Avatar & Cover Image) */}
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Avatar Image</FormLabel>
                          <FormControl>
                            <Input className="placeholder:text-[#A1A1A1]"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              field.onChange(file) // send file to react-hook-form
                            }}
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Cover Image</FormLabel>
                          <FormControl>
                            <Input type="file" className="placeholder:text-[#A1A1A1]"
                              accept="image/*"
                              onChange={(e) => {
                              const file = e.target.files?.[0];
                              field.onChange(file) // send file to react-hook-form
                            }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="mt-4 w-full">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
