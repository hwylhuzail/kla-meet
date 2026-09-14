import ChatClient from './ChatClient'
export function generateStaticParams(){ return [{id:'1'}] }
export const dynamicParams = true
export default function Page(){ return <ChatClient /> }
