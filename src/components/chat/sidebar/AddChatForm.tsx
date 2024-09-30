import { Switch } from '@radix-ui/react-switch'
import React, { useState } from 'react'

const AddChatForm = () => {
  const [isGroup, setIsgroup] = useState(false)

  return (
    <>
      <Switch></Switch>
    </>
  )
}

export default AddChatForm

// onst ChatForm = ({ setIsOpen }) => {
//   const [enabled, setEnabled] = useState(false);
//   const [selected, setSelected] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [groupName, setGroupName] = useState("");

//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!enabled) {
//       const userId = selected?._id;
//       if (!userId) {
//         toast.error("please select user to create chat!");
//         return;
//       }

//       requestHandler(
//         async () => await createOneToOneChat(userId),
//         setLoading,
//         (res) => {
//           const { data } = res;
//           if (res.stausCode == 201) {
//             console.log("hello");
//             dispatch(addChat({ chat: data }));
//           }
//           setIsOpen(false);
//           if (data) {
//             toast.success(res.message);
//           }
//         },
//         (err) => {
//           toast.error(err);
//         }
//       );
//     } else {
//       if (groupName.trim() == "") {
//         toast.error("group name is required!");
//         return;
//       }
//       if (selectedUser.length < 2) {
//         toast.error("There should be 2 minimum mebers to create a group!");
//         return;
//       }
//       const members = selectedUser.map((iteam) => iteam._id);
//       const data = {
//         name: groupName,
//         members,
//       };
//       requestHandler(
//         async () => await createGroup(data),
//         setLoading,
//         (res) => {
//           const { data } = res;
//           toast.success(res.message);
//           dispatch(addChat({ chat: data }));
//           setIsOpen(false);
//         },
//         (err) => {
//           toast.error(err);
//         }
//       );
//     }
//   };

//   return (
//     <div className="mt-8">
//       <div className="flex items-center mb-6 justify-start">
//         <Toggle enabled={enabled} setEnabled={setEnabled} />
//         <p className="text-black text-lg ml-2">is group chat ?</p>
//       </div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             {enabled && (
//               <Input
//                 title="group name"
//                 classNameInput="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0 focus:outline-none "
//                 classNameLabel="text-black text-xl"
//                 onchange={(e) => setGroupName(e.target.value)}
//               />
//             )}
//           </div>
//           <div className="mt-2">
//             <p className="text-xl text-black "> users</p>
//             {!enabled ? (
//               <ComboBox selected={selected} setSelected={setSelected} />
//             ) : (
//               <MultipleSelectComboBox
//                 selected={selectedUser}
//                 setSelected={setSelectedUser}
//               />
//             )}
//           </div>

//           <Button className="py-2 px-4 mt-4 flex  items-center bg-violet-700">
//             <p className="mr-2 text-xl">{loading ? "Creating..." : "Create"}</p>
//             {loading ? <LoadingSpinner height={32} width={32} /> : null}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatForm;
