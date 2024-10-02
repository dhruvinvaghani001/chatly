import Chat from './Chat'

const AllChats = ({ chats }) => {
  return (
    <>
      {chats.map(chat => (
        <Chat chat={chat} key={chat._id}></Chat>
      ))}
    </>
  )
}

export default AllChats
