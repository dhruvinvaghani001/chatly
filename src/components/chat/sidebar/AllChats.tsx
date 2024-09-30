import Chat from './Chat'

const AllChats = ({ chats }) => {
  return (
    <>
      {chats.map(chat => (
        <Chat chat={chat}></Chat>
      ))}
    </>
  )
}

export default AllChats
