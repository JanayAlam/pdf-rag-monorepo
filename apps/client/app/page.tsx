import { ChatContainer } from "@/components/chat";
import { Container } from "@/components/ui/container";
import { FileListAndUploadContainer } from "./_components/file-list-and-upload-container";

export default function Home() {
  return (
    <Container className="w-full flex flex-col gap-6">
      <FileListAndUploadContainer />
      <ChatContainer />
    </Container>
  );
}
