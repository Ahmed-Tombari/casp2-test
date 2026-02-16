'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialSignUp from '../SocialSignUp'
import Logo from '@/app/components/Layout/Header/Logo'
import { Button, Input } from '@/app/components/UI'
import { useTranslations } from 'next-intl'

const SignUp = () => {
  const router = useRouter()
  const tAuth = useTranslations('auth')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = tAuth('nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = tAuth('nameLength')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      toast.success(tAuth('registerSuccess'))
      setLoading(false)
      router.push('/platform/login')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      toast.error(errorMessage)
      setLoading(false)
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

  return (
    <div className="w-full">
      <SocialSignUp />

      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-brand-sky/20"></div>
        <span className='relative z-10 px-4 text-xs font-bold uppercase tracking-widest text-brand-navy/40 bg-white dark:bg-brand-navy-dark'>
          {tAuth('or')}
        </span>
        <div className="flex-1 border-t border-brand-sky/20"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type='text'
          label={tAuth('nameLabel')}
          placeholder={tAuth('namePlaceholder')}
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          leftIcon="solar:user-bold-duotone"
          fullWidth
          required
          autoComplete="name"
        />
        
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
        />
        
        <div className='py-2'>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 rounded border-brand-sky/30 text-brand-orange focus:ring-brand-orange focus:ring-offset-0 cursor-pointer shrink-0"
            />
            <span className="text-xs text-brand-navy/60 dark:text-white/60 group-hover:text-brand-navy dark:group-hover:text-white transition-colors leading-relaxed">
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

        <Button
          type='submit'
          variant='primary'
          size='lg'
          fullWidth
          isLoading={loading}
          className="mt-4 font-bold text-lg h-14"
        >
          {tAuth('signUpButton')}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className='text-brand-navy/60 dark:text-white/60 text-sm font-medium'>
          {tAuth('alreadyAccount')}{' '}
          <Link 
            href='/platform/login' 
            className='text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange'
          >
            {tAuth('signInButton')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
