import React, { useState } from 'react'
import { X } from 'lucide-react' // Import the cross icon
import { z } from 'zod'

// Zod validation schema for files
const fileSchema = z
  .array(z.instanceof(File))
  .max(5, { message: 'You can upload up to 5 files.' })

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])

    // Validate files
    const validationResult = fileSchema.safeParse(selectedFiles)
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message)
      return
    }

    setError(null)
    setFiles(prevFiles => [...prevFiles, ...selectedFiles])
    event.target.value = '' // Clear the input value
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove))
  }

  return (
    <div className='p-4'>
      <label className='block mb-2'>
        <span className='text-gray-700'>Upload Files</span>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleFileChange}
          className='mt-2 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700'
        />
      </label>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex flex-wrap mt-4'>
        {files.map((file, index) => (
          <div key={index} className='relative mr-4 mb-4'>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className='w-32 h-32 object-cover rounded-md'
            />
            <button
              onClick={() => removeFile(file)}
              className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
              title='Remove file'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload
