"use client";



import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import FormField from "./FormField";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { auth } from "@/firebase/client";





const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
 async function onSubmit  (values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {

      const {name, email, password} = values;

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      const result = await signUp({
        uid: userCredentials.user.uid,
        name: name!,
        email,
        password,
      });


      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

        toast.success("Account created successfully, Please sign in.");
        router.push('/sign-in');
      } else {

        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });











        toast.success("Sign in successfully.");
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-[#cbb8a9] tracking-[0.15em]">PrepTalk</h2>
        </div>

        <h3 className="text-[#f0e9e4] tracking-[0.10em]" >Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password (min 3 char.)"
                type={showPassword ? "text" : "password"}
              />
              <div
                className="absolute top-9 right-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create  an  Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No Account Yet?" : "Already have an Account?"}

          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;