import { useState, useCallback } from "react";

interface FormFields {
  name: string;
  subject: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export interface UseContactFormReturn {
  fields: FormFields;
  status: FormStatus;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  resetStatus: () => void;
}

const EMPTY_FIELDS: FormFields = { name: "", subject: "", email: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_TIMEOUT_MS = 15_000;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Required";
  if (!fields.subject.trim()) errors.subject = "Required";
  if (!fields.email.trim()) errors.email = "Required";
  else if (!EMAIL_REGEX.test(fields.email)) errors.email = "Invalid email";
  if (!fields.message.trim()) errors.message = "Required";
  return errors;
}

export function useContactForm(): UseContactFormReturn {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFields((prev) => ({ ...prev, [id]: value }));
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validate(fields);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("submitting");
      setErrors({});

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Request failed");

        setStatus("success");
        setFields(EMPTY_FIELDS);
      } catch {
        setStatus("error");
      } finally {
        clearTimeout(timeoutId);
      }
    },
    [fields],
  );

  const resetStatus = useCallback(() => setStatus("idle"), []);

  return { fields, status, errors, handleChange, handleSubmit, resetStatus };
}
