'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import AccessModal from '@/app/components/PrivateBook/AccessModal';
export default function BookAccessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
       {/* Hero Section */}
       <section className="relative overflow-hidden bg-brand-navy pt-32 pb-20 text-center rounded-b-[3rem] shadow-lg z-10 transition-colors duration-300 dark:bg-brand-navy/80">
         <div className="container mx-auto max-w-4xl px-4">
             <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md animate-fade-in-up">
                <Icon icon="solar:shield-check-bold-duotone" className="text-brand-gold w-5 h-5" />
                <span>Secure Content Access</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up delay-100">
                Private Book Collection
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
                Access our exclusive collection of educational resources securely. 
                Request a temporary access link sent directly to your email.
            </p>

            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-brand-gold/20 text-lg animate-fade-in-up delay-300"
            >
               <Icon icon="solar:key-square-bold-duotone" className="w-6 h-6" />
               Request Access
            </button>
         </div>
       </section>

       {/* Features / Explanation */}
       <section className="py-20 px-4 bg-gray-50 dark:bg-brand-navy-black grow transition-colors duration-300">
           <div className="container mx-auto max-w-5xl">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Feature 1 */}
                   <div className="bg-white dark:bg-brand-navy-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300">
                       <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-6 text-2xl">
                           <Icon icon="solar:lock-password-bold-duotone" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Access</h3>
                       <p className="text-gray-500 dark:text-gray-400">
                           Content is protected and requires a unique, one-time access token attached to your email.
                       </p>
                   </div>

                   {/* Feature 2 */}
                   <div className="bg-white dark:bg-brand-navy-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300">
                       <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center mb-6 text-2xl">
                           <Icon icon="solar:clock-circle-bold-duotone" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">24-Hour Expiry</h3>
                       <p className="text-gray-500 dark:text-gray-400">
                           For security designated links expire automatically after 24 hours. Request a new one anytime.
                       </p>
                   </div>

                   {/* Feature 3 */}
                   <div className="bg-white dark:bg-brand-navy-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300">
                       <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-6 text-2xl">
                           <Icon icon="solar:documents-minimalistic-bold-duotone" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Downloads</h3>
                       <p className="text-gray-500 dark:text-gray-400">
                           View documents directly in your browser with our secure streaming viewer.
                       </p>
                   </div>
               </div>
           </div>
       </section>
      
      <AccessModal isOpen={isModalOpen} closeModal={closeModal} />
    </main>
  );
}
