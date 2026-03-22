import { Container } from "@/components/ui/container";
import { ChatContainer } from "./_components/chat-container";
import { FileListAndUploadContainer } from "./_components/file-list-and-upload-container";

export default function Home() {
  return (
    <Container className="w-full h-full">
      <div className="flex flex-col gap-4 py-4 md:py-6 h-full">
        <FileListAndUploadContainer />
        <ChatContainer />
      </div>
    </Container>
  );
}
