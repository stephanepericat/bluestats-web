import Link from 'next/link'
import useBluesky from '@/lib/useBluesky'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { getSession } = useBluesky()
  const session = getSession()

  return (
    <main>
      {session ? (
        <h1 className='text-2xl font-bold uppercase tracking-widest mb-3'>Blue Stats</h1>
      ) : (
        <Link href='/api/auth/signout'>Sign Out</Link>
      )}
    </main>
  )
}
