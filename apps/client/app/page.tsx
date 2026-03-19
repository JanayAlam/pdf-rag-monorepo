import { ChatContainer } from "@/components/chat";
import { Container } from "@/components/ui/container";
import { UploadFileAside } from "@/components/upload-file-aside";

export default function Home() {
  return (
    <Container className="w-full">
      <section className="h-[calc(100vh-65px)] w-full grid grid-rows-3 grid-cols-1 sm:grid-rows-1 sm:grid-cols-3">
        <UploadFileAside />
        <ChatContainer />
      </section>
    </Container>
  );
}
