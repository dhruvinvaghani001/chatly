import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'

const ImagePreview = ({ files, onChange }) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {files.map((file, index) => (
        <div key={index} className='relative'>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className='w-32 h-32 object-cover rounded-md'
          />
          <Button
            type='button'
            variant='destructive'
            size='icon'
            className='absolute -top-2 -right-2 h-6 w-6 rounded-full'
            onClick={() => {
              const newFiles = files?.filter((_, i) => i !== index) || []
              onChange(newFiles)
            }}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ImagePreview
