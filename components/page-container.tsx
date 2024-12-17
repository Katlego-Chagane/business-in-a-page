interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="container mx-auto h-full px-4 py-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

