import { useState, useEffect } from "react";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    name: "Trade",
    email: "trade@tradetechnology.com.br",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData({
          name: parsedUserData.name,
          email: parsedUserData.email,
          avatar: "/avatars/shadcn.jpg",
        });
      }
    } catch (error) {
      console.error("Erro carregando dados:", error);
    }
  }, []);

  return userData;
}