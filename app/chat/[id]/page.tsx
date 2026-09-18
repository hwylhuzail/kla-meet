export function generateStaticParams(){ return [{ id: '1' }] }
export const dynamicParams = true
export const dynamic = 'force-dynamic'

import ChatClient from './ChatClient'
export default function Page(){ return <ChatClient /> }