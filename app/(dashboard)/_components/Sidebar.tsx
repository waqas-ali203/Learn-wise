import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

export default function Sidebar() {
  return (
    <div className='h-full border-r flex flex-col overflow-y-hidden bg-white shadow-sm'>
        <Logo />
        <div className="flex flex-col w-full">
            <SidebarRoutes />
        </div>
        </div>
  )
}
