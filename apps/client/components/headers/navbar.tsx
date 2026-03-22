import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { ThemeToggleButton } from "../ui/theme-toggle-button";

export function Navbar() {
  return (
    <header className="w-full border-b">
      <Container>
        <nav className="flex justify-between items-center gap-2 h-16">
          <h3 className="text-lg font-bold">PDF RAG</h3>
          <div className="flex justify-end items-center gap-2">
            <Show when="signed-out">
              <SignInButton>
                <Button>Signin</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Signup</Button>
              </SignUpButton>
              <ThemeToggleButton />
            </Show>
            <Show when="signed-in">
              <ThemeToggleButton />
              <UserButton />
            </Show>
          </div>
        </nav>
      </Container>
    </header>
  );
}
