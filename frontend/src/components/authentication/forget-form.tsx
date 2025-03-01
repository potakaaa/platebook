import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { LabelInputContainer } from "../ui/label-input-container";
import { Label } from "../ui/label";
import { InputAnimated } from "../ui/input-animated";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { ResetPasswordInputData } from "@/lib/types/authTypes";
import { forgotPasswordRequest, forgotPasswordVerify, verifiedPasswordReset } from "@/lib/services/api/accountServices";
import { useRouter } from "next/navigation";

// step 1
const emailForget_Schema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

// step 2
const OTP_ForgetSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
});

// step 3
const newPassword_ForgetSchema = z
  .object({
    password1: z.string().min(8, "Password must be at least 8 characters"),
    password2: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

const ForgetForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);


  const onSubmit = async (data: ResetPasswordInputData) => {
    if (step === 1) {
      console.log("Sending email for OTP:", data.email);
      try {
        const response = await forgotPasswordRequest(data.email);
        setStep(2);
      } catch (err: any) {
        console.error("Error sending email: ", err);
        if (err?.email[0]) {
          forgetPassForm.setError("email", {
            type: "manual",
            message: err?.email[0],
          });
        } else {
          forgetPassForm.setError("email", {
            type: "manual",
            message: "An unknown error occurred.",
          });
        }
      }
    } else if (step === 2) {
      console.log("Verifying OTP:", data.otp);
      try {
        const response = await forgotPasswordVerify(data.otp);
        setStep(3);
      } catch (err: any) {
        console.error("Error verifying OTP: ", err);
        if (err?.error) {
          forgetPassForm.setError("otp", {
            type: "manual",
            message: err?.error,
          });
        } else {
          forgetPassForm.setError("otp", {
            type: "manual",
            message: "An unknown error occurred.",
          });
        }
      }
    } else if (step === 3) {
      console.log("Resetting password with:", data.password1);
      try {
        const response = await verifiedPasswordReset({
          password1: data.password1,
          password2: data.password2,
        });

        window.location.reload()


      } catch (err: any) {
        console.error("Error resetting password: ", err);
        if (err?.error) {
          forgetPassForm.setError("password1", {
            type: "manual",
            message: err?.error,
          });
        } else {
          forgetPassForm.setError("password1", {
            type: "manual",
            message: "An unknown error occurred.",
          });
        }
      }
    }
  };
 


  const forgetPassForm = useForm({
    resolver: zodResolver(
      (step === 1
        ? emailForget_Schema
        : step === 2
        ? OTP_ForgetSchema
        : newPassword_ForgetSchema) as any
    ),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    } as any,
  });

  return (
  <Form {...forgetPassForm}>
    <form
      noValidate
      onSubmit={forgetPassForm.handleSubmit(onSubmit)}
      className="p-6 md:p-8 z-30"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">
          Reset Password
        </h1>
        {step === 1 && (
          <FormField
            control={forgetPassForm.control}
            name="email"
            render={({ field }) => (
              <LabelInputContainer>
                <Label htmlFor="email">Enter your Email</Label>
                <FormControl>
                  <InputAnimated
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </LabelInputContainer>
            )}
          />
        )}
        {step === 2 && (
          <FormField
            control={forgetPassForm.control}
            name="otp"
            render={({ field }) => (
              <LabelInputContainer className="px-10">
                <Label htmlFor="otp" className="text-left">
                  Enter OTP
                </Label>
                <FormControl className="">
                  <InputOTP maxLength={6} className="" {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </LabelInputContainer>
            )}
          />
        )}
        {step === 3 && (
          <>
            <FormField
              control={forgetPassForm.control}
              name="password1"
              render={({ field }) => (
                <LabelInputContainer>
                  <Label htmlFor="password1">New Password</Label>
                  <FormControl>
                    <InputAnimated
                      id="password1"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              )}
            />
            <FormField
              control={forgetPassForm.control}
              name="password2"
              render={({ field }) => (
                <LabelInputContainer>
                  <Label htmlFor="password2">
                    Confirm Password
                  </Label>
                  <FormControl>
                    <InputAnimated
                      id="password2"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full">
          {step === 3 ? "Reset Password" : "Next"}
        </Button>
      </div>
    </form>
</Form>);
};

export default ForgetForm;
