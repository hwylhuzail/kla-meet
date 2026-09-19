export const dynamic = 'force-dynamic';



export function generateStaticParams(){ return [{ id: '1' }] }
export const dynamicParams = true

import ChatClient from './ChatClient'
export default function Page(){ return <ChatClient /> }