import { headers } from "next/headers";
import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent/userAgent";

export default function UserAgentPage() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  return (
    <UserAgentProvider userAgent={userAgent ?? undefined}>
      <UserAgent />
    </UserAgentProvider>
  );
}
