export const BASE_URL = "http://178.16.143.212:5002/api/";
// NOTE: Do we still need this Salman?
// const baseUrl = "https://5d38-103-150-238-203.ngrok-free.app/api/";

export const API_PATH = {
  LoginRoute: BASE_URL + "users/login",
  RegisterRoute: BASE_URL + "users/register",
  GetPromptsList: BASE_URL + "prompts/get_prompts",
  GetDashboardPrompts: BASE_URL + "prompts/get_prompts_categories",
  CreatePrompt: BASE_URL + "prompts/create_prompt",
  GetSubcategories: BASE_URL + "prompts/subcategories",
  GetCategories: BASE_URL + "prompts/categories",
  GetPromptsInCategory: BASE_URL + "prompts/prompts_in_category",
  GetPromptsInSubCategory: BASE_URL + "prompts/prompts_in_subcategory",
  CreateChat: BASE_URL + "chats/create_chat",
  SendMessage: BASE_URL + "chats/send_message",
  GetMessages: BASE_URL + "chats/get_messages",
  GetChats: BASE_URL + "chats/chats_list",
  GetUserPrompts: BASE_URL + "prompts/user_prompts",
  UpdateMessage: BASE_URL + "chats/update",
  VotePrompt: BASE_URL + "prompts/vote_prompt",
  FollowUser: BASE_URL + "users/follow_user",
  Profile: BASE_URL + "users/profile",
  GPTCompletions: "https://api.openai.com/v1/chat/completions",
};

export const CATEGORIES = [
  {
    name: "Lifestyle",
    id: 2,
    subcategories: [
      { name: "Beauty", id: 21 },
      { name: "Fashion", id: 22 },
      { name: "Travel", id: 23 },
      { name: "Life Hacks/Productivity", id: 2 },
    ],
  },

  {
    name: "Health & Wellness",
    id: 3,
    subcategories: [
      { name: "Fitness", id: 31 },
      { name: "Meditation", id: 32 },
      { name: "Diet/Nutrition", id: 33 },
      { name: "Dating / Relationship", id: 34 },
      { name: "Life coaching", id: 35 },
      { name: "Mental health", id: 36 },
    ],
  },

  {
    name: "Techonology",
    id: 4,
    subcategories: [
      { name: "Software Development", id: 41 },
      { name: "UI/UX", id: 42 },
      { name: "Dev ops", id: 43 },
      { name: "Generative AI", id: 44 },
      { name: "Product(Web, apps, Web3, SaaS", id: 45 },
      { name: "Support", id: 46 },
    ],
  },

  {
    name: "Marketing & Content writing",
    id: 5,
    subcategories: [
      { name: "SEO / Copywriting", id: 51 },
      { name: "SEM", id: 52 },
      { name: "Growth Strategy", id: 53 },
      { name: "Social Media", id: 54 },
      { name: "Brading / Design", id: 55 },
      { name: "Email Marketing", id: 56 },
      { name: "PR", id: 57 },
      { name: "Advertising", id: 58 },
    ],
  },

  {
    name: "Business/Enterpreneurship",
    id: 6,
    subcategories: [
      { name: "Career Development", id: 61 },
      { name: "Ecommerce", id: 62 },
      { name: "Sales / Biz dev", id: 63 },
      { name: "Finance", id: 64 },
      { name: "Leadership/Management", id: 65 },
      { name: "Scaling / Growth", id: 66 },
      { name: "Strategy", id: 67 },
      { name: "Product", id: 68 },
      { name: "Career Coaching", id: 69 },
      { name: "Personal Development", id: 70 },
      { name: "HR / Culture", id: 71 },
    ],
  },
];

export const HOME_SLIDES = [
  {
    id: "1",
    heading: "Prompt",
    description:
      "Empowering creators and users to harness the power of AI through our AI prompt marketplace.",
  },
  {
    id: "2",
    heading: "Prompt 2",
    description:
      "Empowering creators and users to harness the power of AI through our AI prompt marketplace.",
  },
  {
    id: "3",
    heading: "Prompt 3",
    description:
      "Empowering creators and users to harness the power of AI through our AI prompt marketplace.",
  },
];

export const PLANS = [
  { card: "************7685", expiry: "10/2024", cardType: "master", isCurrent: true },
  { card: "************9732", expiry: "06/2026", cardType: "visa", isCurrent: false },
];
