'use client'

import { ReactNode, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

import useKeyboardShortcut from '@/hooks/use-keyboard-shortcut'
import { useMediaQuery } from '@/hooks/use-media-query'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

export type DeleteSheetProps = {
  children?: ReactNode
  trigger: ReactNode
  content?: {
    title: string
    description?: string
  }
  // eslint-disable-next-line no-unused-vars
  handleClick: (closeFunction: () => void) => void
}

export default function DeleteSheet({ content, trigger, children, handleClick }: DeleteSheetProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 968px)')

  const title = content?.title ?? 'Are you absolutely sure?'
  const description = content?.description ?? `This action cannot be undone. This will permanently delete your account and remove your data from our servers.`

  // If we Press Alt/Meta + N then it opens the sheet/drawer
  useKeyboardShortcut(() => setOpen(true), 'd', { altKey: true, metaKey: true })

  function handleClose() {
    // Disable closing if loading
    if (!isPending) {
      setOpen(false)
    }
  }

  function handleContinue() {
    startTransition(() => {
      handleClick(handleClose)
    })
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="w-full">{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>

          {children}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose} disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            {/* <AlertDialogAction onClick={handleContinue} disabled={loading} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting
                </>
              ) : (
                'Continue'
              )}
            </AlertDialogAction> */}
            <Button variant="destructive" onClick={handleContinue} disabled={isPending} className="gap-2">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>

      <DrawerContent>
        <div className="vs-container vs-paddingX w-full overflow-y-auto">
          <DrawerHeader className="p-0 pt-4">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          {children}

          <DrawerFooter>
            <Button onClick={handleContinue} disabled={isPending} className="gap-2">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting
                </>
              ) : (
                'Continue'
              )}
            </Button>
            <Button variant="outline" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
