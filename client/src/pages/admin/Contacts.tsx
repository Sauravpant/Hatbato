import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useDeleteContact, useGetContacts } from "@/hooks/admin/useContacts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WarningButton } from "@/components/admin/modals/WarningButton";
import { Mail, User, Phone, MessageSquare, Eye } from "lucide-react";
import type { Contact } from "@/types/admin/types";

const Contacts = () => {
  const { data, isLoading, error, refetch } = useGetContacts();

  if (error) {
    return <ErrorMessage title="Failed to fetch user contact details" refetch={refetch} />;
  }

  const contacts = data?.data;
  const { mutate } = useDeleteContact();

  const handleDelete = (id: string) => {
    mutate({ id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Contact Messages</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage user inquiries</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : !contacts || contacts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No contact messages</h3>
            <p className="text-sm text-gray-500 mt-1">All user inquiries will appear here</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">#</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Contact</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Details</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Message</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact, index) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-500 font-medium">{index + 1}</td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <div className="flex items-center font-medium text-gray-900">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            {contact.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="truncate max-w-[120px] md:max-w-[180px]">{contact.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 text-gray-500 mr-1" />
                          {contact.contact}
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 hidden md:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {contact.category.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3">
                        <ContactDetails contact={contact} />
                      </td>
                      <td className="p-3">
                        <WarningButton
                          id={contact.id}
                          buttonText="Delete"
                          button1="Cancel"
                          button2="Confirm"
                          question="Are you sure you want to delete this contact details?"
                          description="This action will permanently delete the contact details from the system."
                          onAction={handleDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

export const ContactDetails = ({ contact }: { contact: Contact }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center text-xs">
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
            Message from {contact.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 whitespace-pre-line">{contact.message}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600">{contact.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600">{contact.contact}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600 capitalize">{contact.category.replace("_", " ")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
