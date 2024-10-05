import { sendMessageInChat } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/context/chatSlice";
import useMessages from "@/context/zustand";
import { requestHandler } from "@/lib/requestHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, SendHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const messageFormSchema = z
  .object({
    files: z
      .array(z.instanceof(File))
      .min(0)
      .max(5, { message: "You can upload up to 5 files." }),
    message: z.string(),
  })
  .refine((data) => data.files.length > 0 || data.message.length > 0);

const ChatInput = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      files: [],
      message: "",
    },
  });

  const { selectedChat } = useChatContext();
  const { setMessages, messages } = useMessages();

  const onSubmit = (values: z.infer<typeof messageFormSchema>) => {
    const formData = new FormData();
    formData.append("content", values.message);

    values.files.forEach((file) => {
      formData.append("attachmentFiles", file);
    });

    requestHandler(
      async () =>
        await sendMessageInChat({
          data: formData,
          chatId: selectedChat?._id,
        }),
      setLoading,
      (res) => {
        const { data } = res;
        // console.log(data);
        setMessages([...messages, data]);
      },
      (err) => {
        toast.error(err);
      }
    );

    form.reset();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <div className="py-0 px-4 md:p-4 border-t border-gray-700 ">
        <div className="flex items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-center"
            >
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="">
                        <Input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const newFiles = [...(field.value || []), ...files];
                            field.onChange(newFiles);
                            e.target.value = "";
                          }}
                          className="hidden"
                        />
                        <PlusCircle
                          className="mr-4"
                          onClick={() => fileInputRef?.current.click()}
                        />
                        {field.value.length > 0 && (
                          <div className="w-3/4 rounded-md p-4 justify-center bg-popover-foreground fixed bottom-28 left-30 flex flex-wrap  gap-6  md:bg-transparent md:p-4 md:fixed md:bottom-36 md:left-30 md:flex md:flex-wrap md:gap-4">
                            {field.value?.map((file, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="w-32 h-32 object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                  onClick={() => {
                                    const newFiles =
                                      field.value?.filter(
                                        (_, i) => i !== index
                                      ) || [];
                                    field.onChange(newFiles);
                                    form.trigger("message");
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel />
                    <FormControl>
                      <Input
                        className="flex-1 bg-muted px-6 outline-none border-1 border-white rounded-full text-md"
                        placeholder="Type a message..."
                        {...field}
                        onKeyDown={(event) => handleKeyDown(event)}
                        autocomplete="off"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="ml-2 md:ml-3 p-3 md:p-6 bg-primary rounded-full  hover:bg-primary"
                variant="ghost"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="aninmate-spin" />
                ) : (
                  <SendHorizontal className="w-4 md:w-6" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
