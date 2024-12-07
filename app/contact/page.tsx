"use client";

import { BusinessInfo } from "@/components/contact/BusinessInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { GoogleMap } from "@/components/contact/GoogleMap";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

const page = () => {
  const handleSubmit = (data: ContactFormData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our food or services? We&apos;d love to hear
            from you. Send us a message and we&apos;ll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <ContactForm onSubmit={handleSubmit} />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <BusinessInfo />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Our Location
              </h3>
              <GoogleMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
