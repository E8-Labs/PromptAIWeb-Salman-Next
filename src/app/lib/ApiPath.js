const baseUrl = "http://178.16.143.212:5002/api/";
// const baseUrl = "https://5d38-103-150-238-203.ngrok-free.app/api/";
 
const ApiPath = {
   LoginRoute: baseUrl + "users/login",
   RegisterRoute: baseUrl + "users/register",
   GetPromptsList: baseUrl + "prompts/get_prompts",
   GetDashboardPrompts: baseUrl + "prompts/get_prompts_categories",
   CreatePrompt: baseUrl + "prompts/create_prompt",
   GetSubcategories: baseUrl + "prompts/subcategories",
   GetCategories: baseUrl + "prompts/categories",
   GetPromptsInCategory: baseUrl + "prompts/prompts_in_category",
   GetPromptsInSubCategory: baseUrl + "prompts/prompts_in_subcategory",
   CreateChat: baseUrl + "chats/create_chat",
   SendMessage: baseUrl + "chats/send_message",
   GetMessages: baseUrl + "chats/get_messages",
   GetChats: baseUrl + "chats/chats_list",
   GetUserPrompts: baseUrl + "prompts/user_prompts",
   UpdateMessage: baseUrl + "chats/update",
   VotePrompt: baseUrl + "prompts/vote_prompt",
   FollowUser: baseUrl + "users/follow_user",
   Profile: baseUrl + "users/profile",
   GPTCompletions: "https://api.openai.com/v1/chat/completions"


}

export default ApiPath;