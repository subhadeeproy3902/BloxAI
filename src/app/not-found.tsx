import Link from 'next/link'
import { Button } from '@/components/ui/button';
export default function NotFound() {
  return (
  <div className="flex h-[100dvh] flex-col items-center justify-center gap-6 px-4 md:px-6">
  <div className="animate-fade-in">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="h-32 w-32 text-gray-400 dark:text-gray-600"
    >
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path>
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"></path>
      <path d="m11 7-3 5h4l-3 5"></path>
      <line x1="22" x2="22" y1="11" y2="13"></line>
    </svg>
  </div>
  <div className="space-y-2 text-center animate-fade-in-up">
    
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Oops! Page not found.</h1>
    
    <div className="flex justify-center items-center">
    <p className="max-w-md text-gray-500 dark:text-gray-400 text-center md:text-lg">
      The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
    </p>
    </div>
    <Button>
      <Link href="/">Go Home</Link>
    </Button>
  </div>
</div>
  )
}
