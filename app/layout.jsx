import React,{Suspense}from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'

import Provider from '@components/Provider'

export const metadata = {
    title :"EZ Promptor",
    description : "Ready to go AI prompts for everyone"
    
}
const RootLayout = ({children }) => {
  return (
    <html lang='en'>
        <body>
        <Suspense>
        <Provider>
            <div className='main '>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
            </Provider>
            </Suspense>
        </body>
    </html>
  )
}

export default RootLayout