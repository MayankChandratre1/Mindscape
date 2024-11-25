import zod from "zod"

export const signinInputSchema = zod.object({
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(1, "Invalid password")
})

export const registerInputSchema = zod.object({
    email: zod.string().email("Invalid email address"),
    name: zod.string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must not exceed 20 characters"),
    password: zod.string()
      .min(6, "Password must be at least 6 characters long")
      .max(10, "Password must not exceed 10 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one digit"),
      role: zod.enum(["INSTRUCTOR", "STUDENT"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either INSTRUCTOR or STUDENT",
      }),
});