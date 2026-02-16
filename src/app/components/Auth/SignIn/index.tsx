'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SocialSignIn from '../SocialSignIn'
import Logo from '@/app/components/Layout/Header/Logo'
import { Button, Input } from '@/app/components/UI'
import { useTranslations } from 'next-intl'

const Signin = () => {
  const router = useRouter()
  const tAuth = useTranslations('auth')

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!loginData.email) {
      newErrors.email = tAuth('emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = tAuth('invalidEmail')
    }
    
    if (!loginData.password) {
      newErrors.password = tAuth('passwordRequired')
    } else if (loginData.password.length < 6) {
      newErrors.password = tAuth('passwordLength')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const callback = await signIn('credentials', { ...loginData, redirect: false })
      
      if (callback?.error) {
        toast.error(callback.error)
        setLoading(false)
        return
      }

      if (callback?.ok && !callback?.error) {
        toast.success(tAuth('loginSuccess'))
        setLoading(false)
        router.push('/')
      }
    } catch (err: unknown) {
      setLoading(false)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      toast.error(errorMessage)
    }
  }

  return (
    <div className="w-full">
      <SocialSignIn />

      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-brand-sky/20"></div>
        <span className='relative z-10 px-4 text-xs font-bold uppercase tracking-widest text-brand-navy/40 bg-white dark:bg-brand-navy-dark'>
          {tAuth('or')}
        </span>
        <div className="flex-1 border-t border-brand-sky/20"></div>
      </div>

      <form onSubmit={loginUser} className="space-y-5">
        <Input
          type='email'
          label={tAuth('emailLabel')}
          placeholder={tAuth('emailPlaceholder')}
          value={loginData.email}
          onChange={(e) => {
            setLoginData({ ...loginData, email: e.target.value })
            if (errors.email) setErrors({ ...errors, email: undefined })
          }}
          error={errors.email}
          leftIcon="solar:letter-linear"
          fullWidth
          required
          autoComplete="email"
        />
        
        <div className="space-y-1">
          <Input
            type='password'
            label={tAuth('passwordLabel')}
            placeholder={tAuth('passwordPlaceholder')}
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value })
              if (errors.password) setErrors({ ...errors, password: undefined })
            }}
            error={errors.password}
            leftIcon="solar:lock-password-linear"
            fullWidth
            required
            autoComplete="current-password"
          />
          <div className='flex justify-end'>
            <Link
              href='/forgot-password'
              className='text-brand-orange hover:text-brand-orange-dark text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded'
            >
              {tAuth('forgotPassword')}
            </Link>
          </div>
        </div>
        
        <div className='flex items-center text-sm'>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-brand-sky/30 text-brand-orange focus:ring-brand-orange focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-brand-navy/70 dark:text-white/70 group-hover:text-brand-navy dark:group-hover:text-white transition-colors font-medium">
              {tAuth('rememberMe')}
            </span>
          </label>
        </div>

        <Button
          type='submit'
          variant='primary'
          size='lg'
          fullWidth
          isLoading={loading}
          className="mt-6 font-bold text-lg h-14"
        >
          {tAuth('signInButton')}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className='text-brand-navy/60 dark:text-white/60 text-sm font-medium'>
          {tAuth('noAccount')}{' '}
          <Link 
            href='/platform/register' 
            className='text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange'
          >
            {tAuth('signUpButton')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
