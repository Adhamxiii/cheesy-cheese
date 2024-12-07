"use client";

import React, { FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { ContactFormData } from "@/app/contact/page";
import { contactSchema } from "@/utils/validation";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validData = contactSchema.parse(formData);
      onSubmit(validData);
    } catch (error: any) {
      const formErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          formErrors[err.path[0]] = err.message;
        }
      });
      setErrors(formErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? "border-red-300" : "border-gray-300"
          } focus:border-orange-500 focus:ring-orange-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email ? "border-red-300" : "border-gray-300"
          } focus:border-orange-500 focus:ring-orange-500`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.subject ? "border-red-300" : "border-gray-300"
          } focus:border-orange-500 focus:ring-orange-500`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.message ? "border-red-300" : "border-gray-300"
          } focus:border-orange-500 focus:ring-orange-500`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
        />
        <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
          I consent to having this website store my submitted information so
          they can respond to my inquiry. See our privacy policy to learn more
          about how we protect and manage your data.
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Send className="w-5 h-5 mr-2" />
        Send Message
      </button>
    </form>
  );
}
