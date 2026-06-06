interface UpdateProfilePayload {
  name: string;
  password?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const response = await fetch("/api/users/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  
  return response.json();
};
