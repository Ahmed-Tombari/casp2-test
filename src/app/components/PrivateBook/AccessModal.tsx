'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface AccessModalProps {
  isOpen: boolean;
  closeModal: () => void;
  locale: string;
}

export default function AccessModal({ isOpen, closeModal, locale }: AccessModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useTranslations('PrivateBook'); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('emailSent'));
        closeModal();
        setEmail('');
      } else {
        toast.error(data.error || t('errorGeneric'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t('errorNetwork'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-9999" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-brand-navy-dark p-0 text-left align-middle shadow-2xl transition-all border border-brand-sky/10 dark:border-white/10">
                
                {/* Decorative Header Background */}
                <div className="relative h-32 bg-brand-navy overflow-hidden">
                    <div className="absolute inset-0 bg-brand-gold/10"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 bg-brand-sky/20 rounded-full blur-2xl"></div>
                    
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white dark:from-brand-navy-dark to-transparent"></div>
                    
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm rtl:right-auto rtl:left-4"
                    >
                        <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                    </button>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                            <Icon icon="solar:shield-keyhole-bold-duotone" className="text-3xl text-brand-gold" />
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-center text-brand-navy dark:text-white mb-2"
                  >
                    {t('title')}
                  </Dialog.Title>
                  
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-sm">
                    {t('description')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 rtl:mr-1 rtl:ml-0">
                        {t('emailLabel')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3 rtl:pl-0 text-gray-400">
                            <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          required
                          className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-brand-navy-black/50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all outline-none dark:text-white rtl:pl-4 rtl:pr-10"
                          placeholder={t('emailPlaceholder')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Info Badges */}
                    <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
                            <Icon icon="solar:clock-circle-bold" className="text-brand-gold" />
                            <span>{t('expiryNote')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
                            <Icon icon="solar:forbidden-circle-bold" className="text-red-400" />
                            <span>{t('noDownloads')}</span>
                        </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden group bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-brand-navy/30 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-brand-navy disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                         {loading ? (
                          <>
                            <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
                            {t('sending')}
                          </>
                        ) : (
                          <>
                            {t('getLink')} 
                            <Icon icon="solar:arrow-right-bold" className="rtl:rotate-180" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
