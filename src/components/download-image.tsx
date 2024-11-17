import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'
import { fromPromise } from 'neverthrow'
import { ComponentProps } from 'react'
import { GenericLoader } from './generic-loader'

class FetchImageError extends Error {}

export function DownloadImage({
  src,
  loaderClassName,
  ...props
}: Omit<ComponentProps<'img'>, 'srcset'> & {
  loaderClassName?: string
}) {
  const enabled = !!src && src.startsWith('http') && (src.includes('dofusdb.fr') || src.includes('ganymede-dofus.com'))
  const image = useQuery({
    queryKey: ['image', src],
    queryFn: async () => {
      // should not happen with enabled: !!src
      if (!src) throw new Error('No image source provided')

      const data = await fromPromise(
        invoke<number[]>('fetch_image', { url: src }),
        (err) => new FetchImageError('Failed to load image', { cause: err }),
      )

      if (data.isErr()) throw data.error

      const binary = String.fromCharCode(...new Uint8Array(data.value))

      return btoa(binary)
    },
    enabled,
    staleTime: Infinity,
  })

  if (!enabled) return <img src={src} {...props} />

  if (image.isLoading)
    return (
      <GenericLoader className={cn('-translate-y-0.5 mr-[0.2em] inline size-5', props.className, loaderClassName)} />
    )

  if (image.isError) {
    console.error(image.error)

    return <img src={src} referrerPolicy="same-origin" {...props} />
  }

  return <img src={`data:image/png;base64,${image.data}`} referrerPolicy="same-origin" {...props} />
}