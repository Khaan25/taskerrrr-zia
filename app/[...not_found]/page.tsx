'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Description from '@/components/common/description'
import { Heading } from '@/components/common/heading'

export default function NotFound() {
  const router = useRouter()

  const handleBack = () => router.back()
  const handleClick = () => router.push('/')

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center text-center">
      <Heading level={1}>Don&apos;t know where you are?</Heading>
      <Description className="s-360:mt-4">We really have no idea either...</Description>

      <div className="mt-6 flex w-full shrink-0 items-center justify-center gap-x-3 sm:w-auto">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft />
          Go back
        </Button>

        <Button onClick={handleClick}>Take me home</Button>
      </div>
    </div>
  )
}
