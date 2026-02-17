'use client'
import { createPortal } from 'react-dom'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialSignUp from './SocialSignUp'
import { Input } from '@/app/components/UI'
import PremiumButton from '@/app/components/UI/PremiumButton'
import { useTranslations } from 'next-intl'
import { register } from '@/actions/auth'

export function RegisterModal({ onClose, onSwitchToLogin }: { onClose: () => void, onSwitchToLogin: () => void }) {
  const router = useRouter()
  const tAuth = useTranslations('auth')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phone?: string; country?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { firstName?: string; lastName?: string; email?: string; phone?: string; country?: string; password?: string } = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = tAuth('nameRequired')
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = tAuth('nameRequired')
    }
    
    if (!formData.email) {
      newErrors.email = tAuth('emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tAuth('invalidEmail')
    }
    
    if (!formData.password) {
      newErrors.password = tAuth('passwordRequired')
    } else if (formData.password.length < 8) {
      newErrors.password = tAuth('passwordLength')
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = tAuth('passwordRegEx')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    const submitData = new FormData()
    submitData.append('firstName', formData.firstName)
    submitData.append('lastName', formData.lastName)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('country', formData.country)
    submitData.append('password', formData.password)
    // Adding optional fields as empty strings if backend expects them, though we verified it's safe to omit if not required by action (which they are not strictly checked in snippet, but `auth.ts` uses `formData.get('phone') as string` which might result in "null" string if not present? No, `get` returns null, `as string` just casts it.
    // Wait, `auth.ts` does:
    // const phone = formData.get('phone') as string
    // const country = formData.get('country') as string
    // And then passes them to prisma.user.create.
    // If they are null, prisma might complain if the DB column is non-nullable and no default.
    // Usually prisma schema defines optional fields.
    // Let's assume safely that we should send empty strings if we don't have them, or rely on them being optional in DB.
    // The original `RegisterModal` had inputs for them.
    // I will append empty strings to be safe or just not append them.
    // If I look at `auth.ts`, it accesses them. `prisma.user.create` will receive `null` cast to `string` (which is still `null` at runtime) if I don't append.
    // I'll append empty to be safe against `null` constraint if any (though likely optional).
    // Actually, `formData.get` returns `FormDataEntryValue | null`.
    // If I append nothing, it gets null.
    // Let's check `auth.ts` snippet again.
    // It creates user with phone, country.
    // I will verify `RegisterModal` previously had them.
    // I will NOT include them in the form for design reasons (as per plan), but I should probably send empty strings or sensible defaults.
    
    try {
      const res = await register(submitData)
      
      if (res?.error) {
         toast.error(res.error)
         setLoading(false)
      } else {
         toast.success(tAuth('registerSuccess'))
         setLoading(false)
         onClose()
         router.refresh()
      }
    } catch (err: unknown) {
      setLoading(false)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 relative animate-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-brand-navy dark:text-white text-center">{tAuth('signUpButton')}</h2>

        {/* <SocialSignUp />

        <div className="relative my-6 flex items-center">
          <div className="flex-1 border-t border-brand-sky/20"></div>
          <span className='relative z-10 px-4 text-xs font-bold uppercase tracking-widest text-brand-navy/40 dark:text-white/40'>
            {tAuth('or')}
          </span>
          <div className="flex-1 border-t border-brand-sky/20"></div>
        </div> */
        }

        <div className="flex-1 border-t mt-5 mb-5 border-brand-sky/20"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
              <Input
                type='text'
                label={tAuth('firstNameLabel')}
                placeholder={tAuth('firstNamePlaceholder')}
                value={formData.firstName}
                onChange={handleChange('firstName')}
                error={errors.firstName}
                leftIcon="solar:user-bold-duotone"
                fullWidth
                required
                autoComplete="given-name"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
              <Input
                type='text'
                label={tAuth('lastNameLabel')}
                placeholder={tAuth('lastNamePlaceholder')}
                value={formData.lastName}
                onChange={handleChange('lastName')}
                error={errors.lastName}
                leftIcon="solar:user-bold-duotone"
                fullWidth
                required
                autoComplete="family-name"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
          </div>

          <div className="grid grid-cols-2 gap-4">
              <Input
                type='tel'
                label={tAuth('phoneLabel')}
                placeholder={tAuth('phonePlaceholder')}
                value={formData.phone}
                onChange={handleChange('phone')}
                // error={errors.phone} // Optional
                leftIcon="solar:phone-bold-duotone"
                fullWidth
                autoComplete="tel"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
              <Input
                type='text'
                label={tAuth('countryLabel')}
                placeholder={tAuth('countryPlaceholder')}
                value={formData.country}
                onChange={handleChange('country')}
                // error={errors.country} // Optional
                leftIcon="solar:globe-bold-duotone"
                fullWidth
                autoComplete="country-name"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
          </div>
          
          <Input
            type='email'
            label={tAuth('emailLabel')}
            placeholder={tAuth('emailPlaceholder')}
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            leftIcon="solar:letter-linear"
            fullWidth
            required
            autoComplete="email"
            className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
          />
          
          <Input
            type='password'
            label={tAuth('passwordLabel')}
            placeholder={tAuth('passwordPlaceholder')}
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            leftIcon="solar:lock-password-linear"
            fullWidth
            required
            autoComplete="new-password"
            className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
          />
          
          <div className='py-1'>
            <label className="flex items-start gap-3 cursor-pointer group select-none">
               <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  required
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-brand-sky/40 rounded-md peer-checked:bg-brand-orange peer-checked:border-brand-orange transition-all duration-200 shrink-0"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-brand-navy/70 dark:text-white/70 group-hover:text-brand-navy dark:group-hover:text-white transition-colors leading-relaxed">
                {tAuth('agreeTerms')}{' '}
                <Link href='/privacy' className='text-brand-orange hover:text-brand-orange-dark font-bold underline decoration-brand-orange/20 underline-offset-4 transition-all'>
                  {tAuth('privacyPolicy')}
                </Link>{' '}
                &{' '}
                <Link href='/terms' className='text-brand-orange hover:text-brand-orange-dark font-bold underline decoration-brand-orange/20 underline-offset-4 transition-all'>
                  {tAuth('termsOfService')}
                </Link>
              </span>
            </label>
          </div>

          <PremiumButton
            type='submit'
            variant='primary'
            size='lg'
            className="w-full mt-4 font-bold text-lg h-12 shadow-soft-hover"
            disabled={loading}
          >
            {loading ? (
               <span className="flex items-center gap-2">
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Processing...
               </span>
            ) : tAuth('signUpButton')}
          </PremiumButton>
        </form>

        <div className="mt-6 text-center">
          <p className='text-brand-navy/60 dark:text-white/60 text-sm font-medium'>
            {tAuth('alreadyAccount')}{' '}
            <button 
              onClick={onSwitchToLogin}
              className='text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange'
            >
              {tAuth('signInButton')}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
