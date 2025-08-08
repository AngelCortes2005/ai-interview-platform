import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">InterLab</h2>
        </Link>


      </nav>
        {children}
    </div>
  )
}

export default RootLayout