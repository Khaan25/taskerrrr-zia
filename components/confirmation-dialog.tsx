'use client'

import { ReactNode, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ConfirmationDialogProps<T> {
  children: ReactNode
  title?: string
  description?: string
  params: T
  // eslint-disable-next-line no-unused-vars
  deleteFunction: (params: T) => Promise<
    | {
        error: string
        success?: undefined
      }
    | {
        success: string
        error?: undefined
      }
  >
}

export function ConfirmationDialog<T>({
  children,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete this item and remove it from our servers.',
  params,
  deleteFunction,
}: ConfirmationDialogProps<T>) {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()

              startTransition(async () => {
                const { error, success } = await deleteFunction(params)

                if (error) {
                  toast.error(error)
                }

                if (success) {
                  toast.success(success)
                }
              })
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
