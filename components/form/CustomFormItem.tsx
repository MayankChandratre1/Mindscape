"use client";
import React from "react";
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
import { ControllerRenderProps } from "react-hook-form";

const CustomFormItem = ({field, label}:{
    label:"email" | "password" | "name",
    field: ControllerRenderProps<{
        name: string;
        email: string;
        password: string;
        role: "INSTRUCTOR" | "STUDENT";
    }, typeof label>,
}) => {
  return (
    <FormItem className="mt-4">
      <FormLabel>{label.toUpperCase()}</FormLabel>
      <FormControl>
        <Input type={label} placeholder={label} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomFormItem;
