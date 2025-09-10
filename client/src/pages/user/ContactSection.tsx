import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ContactForm } from "@/types/admin/types";
import { useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { submitForm } from "@/services/userServices";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

const category: string[] = ["general_enquiry", "report_an_issue", "partnership"];
const ContactSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    contact: "",
    category: "general_enquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await submitForm(formData);
      setLoading(false);
      toast.success(response?.message || "Form submitted successfully");
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data?.message || "Failed to submit form. Try again");
    }
    setFormData({
      name: "",
      email: "",
      contact: "",
      category: "general_enquiry",
      message: "",
    });
  };

  return (
    <section className="py-2 bg-gradient-to-b from-blue-50 to-indigo-50 mb-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-3">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you! Reach out directly or send us a message.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-7 hover:shadow-xl transition-shadow duration-300">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600">Have questions, feedback, or issues? Contact us below.</p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-medium text-gray-800">+977-0123456789</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">support@admin.com.np</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <p>We typically respond within 24 hours</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Eg. Saurav Pant"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </Label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="Eg. 123456789"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Eg. saurav@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {category.map((ctg) => (
                  <option key={ctg} value={ctg}>
                    {ctg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Write your message..."
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? <Spinner /> : "Send Message"}{" "}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
