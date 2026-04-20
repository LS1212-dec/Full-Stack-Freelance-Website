import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Mock implementation)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-light-text dark:text-dark-text mb-4">Get in touch</h1>
        <p className="text-xl text-light-textMuted dark:text-dark-textMuted">
          Have a question about the platform, need billing help, or want to report an issue? Our team is available 24/7.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-light-card dark:bg-dark-card rounded-2xl overflow-hidden shadow-xl border border-light-border dark:border-dark-border">
        
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-2/5 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 opacity-80" />
                <div>
                  <h4 className="font-bold text-lg">Main Headquarters</h4>
                  <p className="opacity-90 leading-relaxed">123 Freelance Blvd, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="opacity-80" />
                <p className="font-medium text-lg">+1 (800) 555-0199</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="opacity-80" />
                <p className="font-medium text-lg">support@gighive.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-3/5 p-12 lg:p-16">
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">Send us a message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">First Name</label>
                <input type="text" className="input-field bg-gray-50 focus:bg-white" placeholder="Jane" required/>
              </div>
              <div>
                <label className="label-text">Last Name</label>
                <input type="text" className="input-field bg-gray-50 focus:bg-white" placeholder="Doe" required/>
              </div>
            </div>

            <div>
              <label className="label-text">Email Address</label>
              <input type="email" className="input-field bg-gray-50 focus:bg-white" placeholder="jane@example.com" required/>
            </div>

            <div>
              <label className="label-text">How can we help?</label>
              <textarea className="input-field bg-gray-50 focus:bg-white min-h-[150px] resize-y" placeholder="Briefly describe your issue or question..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 mt-4 shadow-primary/30">
              <Send size={20} /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
