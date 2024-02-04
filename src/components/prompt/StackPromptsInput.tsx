import React from "react";

type StackPromptsInputProps = {
  prompt: any;
  onSubmit(subprompts: any): void;
};

export default function StackPromptsInput({ prompt, onSubmit }: StackPromptsInputProps) {
  const [subprompts, setSubPrompts] = React.useState<any[]>([]);
  const [chat, setChat] = React.useState<any>(null);

  const removeDuplicates = (items: any) => {
    return [...new Set(items)];
  };

  React.useEffect(() => {
    let items = prompt.subprompts;
    setChat(chat);
    items.splice(0, 0, prompt);
    const uniqueArray = items.filter(
      (item: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.id === item.id),
    );
    setSubPrompts(uniqueArray);
    if (chat) {
      console.log("Stacked Index To Show ", chat.stackedPromptIndexToShow);
    }
    console.log("Subprompts Stack Input ", subprompts);
  }, [chat]);

  console.log("Chat changed Stack", chat);

  return (
    <div className="flex items-center justify-start overflow-x-auto space-x-1 p-4 ">
      {subprompts.map((item: any, index: number) => (
        <div
          key={item.id}
          className="flex justify-center items-center"
          onClick={() => {
            if (chat.stackedPromptIndexToShow >= index) {
              console.log("Already submitted");
            } else {
              console.log("Submit here");
              onSubmit(subprompts);
            }
          }}
        >
          <div
            className={`flex  border-0 ${chat && chat.stackedPromptIndexToShow >= index ? "bg-appgreen " : "bg-appgreenlight cursor-pointer"}  justify-center items-center align-self-center p-2`}
            style={{ minWidth: "164px", height: "50px", borderRadius: "16px", borderWidth: 0 }}
          >
            <p
              className={`text-center text-sm ${chat && chat.stackedPromptIndexToShow >= index ? "text-gray-500" : "text-white"}`}
            >
              {item.title}
            </p>
          </div>
          <div
            className={`bg-white w-10 ${index == subprompts.length - 1 ? "hidden" : ""}`}
            style={{ height: "3px" }}
          >
            {" "}
          </div>
          <div
            className={`bg-white w-3 h-3 ${index == subprompts.length - 1 ? "hidden" : ""}`}
            style={{ borderRadius: "50%" }}
          >
            {" "}
          </div>
        </div>
      ))}
    </div>
  );
}
