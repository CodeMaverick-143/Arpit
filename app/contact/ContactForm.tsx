"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { CheckIcon } from "../components/Icons";
import { useToast } from "../components/Toast";
import { fireConfetti } from "@/lib/confetti";
import { ease } from "@/lib/motion";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters)."),
  email: z.string().trim().email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters."),
});

type FormValues = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = { name: "", email: "", message: "" };

/**
 * Contact form with inline zod validation, loading state, toast feedback
 * and a confetti burst on success. Submission is still mocked — wire the
 * `submit()` call to an API route or form service to go live.
 */
export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const { toast } = useToast();

  const validateField = (field: keyof FormValues, next: FormValues) => {
    const result = schema.shape[field].safeParse(next[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const onChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (touched[field]) validateField(field, next);
    };

  const onBlur = (field: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    validateField(field, values);
  };

  const submit = async (data: FormValues) => {
    // Mocked network call — replace with a real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setTouched({ name: true, email: true, message: true });
      toast({ kind: "error", title: "Please fix the highlighted fields." });
      const firstInvalid = Object.keys(next)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submit(result.data);
      setStatus("success");
      toast({
        kind: "success",
        title: "Message sent",
        description: "I'll reply within 24 hours.",
      });
      const rect = (e.currentTarget as HTMLFormElement).getBoundingClientRect();
      fireConfetti({ x: rect.left + rect.width / 2, y: rect.top + 80 });
    } catch {
      setStatus("idle");
      toast({
        kind: "error",
        title: "Something went wrong",
        description: "Please try again or email me directly.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 max-w-md"
      aria-busy={status === "submitting"}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: ease.expo }}
            role="status"
            className="p-10 rounded-2xl text-center gradient-border"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.1,
              }}
              className="flex items-center justify-center mb-6"
              style={{ color: "var(--brand)" }}
            >
              <CheckIcon size={40} />
            </motion.span>
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Message Sent
            </h3>
            <p className="text-sm text-body leading-relaxed mb-6">
              Thanks for reaching out. I&apos;ll get back to you within 24
              hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(initial);
                setErrors({});
                setTouched({});
                setStatus("idle");
              }}
              className="btn-secondary cursor-pointer"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <Field
              id="name"
              label="Name"
              error={touched.name ? errors.name : undefined}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={onChange("name")}
                onBlur={onBlur("name")}
                placeholder="Your name"
                aria-invalid={!!(touched.name && errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
                style={inputStyle(touched.name && !!errors.name)}
              />
            </Field>
            <Field
              id="email"
              label="Email"
              error={touched.email ? errors.email : undefined}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={onChange("email")}
                onBlur={onBlur("email")}
                placeholder="you@email.com"
                aria-invalid={!!(touched.email && errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
                style={inputStyle(touched.email && !!errors.email)}
              />
            </Field>
            <Field
              id="message"
              label="Message"
              error={touched.message ? errors.message : undefined}
              hint={`${values.message.trim().length} chars`}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={onChange("message")}
                onBlur={onBlur("message")}
                placeholder="Tell me about your project or idea..."
                aria-invalid={!!(touched.message && errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-none`}
                style={inputStyle(touched.message && !!errors.message)}
              />
            </Field>
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary gradient-border w-full justify-center cursor-pointer disabled:opacity-60 disabled:cursor-wait py-4 min-h-12"
              >
                {status === "submitting" ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                      aria-hidden
                    />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

const inputClass =
  "w-full px-5 py-4 text-sm rounded-xl outline-none transition-all duration-300 focus:ring-1 focus:ring-[var(--brand)] placeholder:text-[var(--text-muted)]";

const inputStyle = (invalid: boolean | undefined): React.CSSProperties => ({
  background: "var(--surface-1)",
  color: "var(--text-primary)",
  border: `1px solid ${invalid ? "var(--text-primary)" : "var(--border)"}`,
});

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block brand-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </label>
        {hint && (
          <span
            className="brand-mono text-[10px]"
            style={{ color: "var(--text-muted)" }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-[12px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
