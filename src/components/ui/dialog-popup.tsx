import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const DialogPopUp = ({ TriggerComponent, ContentCompnent }) => {
  const [open, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
        <DialogContent className='sm:max-w-[425px] shadow-sm shadow-card-background'>
          <ContentCompnent
            open={open}
            setIsOpen={handleClose}
          ></ContentCompnent>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogPopUp
