import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="px-6 md:px-8 lg:px-12 py-16 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-fg-secondary text-sm mt-2">
          Have a question or want to work together? Drop me a message.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
